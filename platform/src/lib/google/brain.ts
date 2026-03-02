/**
 * NeuronEdge Labs™ — Google Nexus Orchestrator
 * AI Brain Module — lib/google/brain.ts
 * Primary intelligence layer for GNO using Gemini + multi-model routing
 */

import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

export interface NexusMessage {
  role: "user" | "model";
  text: string;
  timestamp: string;
}

export interface AgentTask {
  id: string;
  name: string;
  prompt: string;
  agentType: "reasoning" | "workspace" | "analytics" | "orchestration";
  priority: "low" | "normal" | "high" | "critical";
}

export interface TaskResult {
  taskId: string;
  success: boolean;
  output: string;
  model: string;
  latencyMs: number;
  tokensUsed?: number;
  error?: string;
}

// Model routing table
const MODEL_ROUTER = {
  reasoning: "gemini-2.0-flash",          // Fast, reliable
  workspace: "gemini-2.0-flash",           // Email/Drive tasks
  analytics: "gemini-2.0-flash",           // Data analysis  
  orchestration: "gemini-2.0-flash",       // Meta-planning
} as const;

/**
 * NexusBrain — Central intelligence for the Google Nexus Orchestrator
 */
export class NexusBrain {
  private genAI: GoogleGenerativeAI;
  private models: Map<string, GenerativeModel>;
  private history: NexusMessage[];

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.models = new Map();
    this.history = [];

    // Pre-initialize models
    for (const modelName of Object.values(MODEL_ROUTER)) {
      if (!this.models.has(modelName)) {
        this.models.set(
          modelName,
          this.genAI.getGenerativeModel({
            model: modelName,
            systemInstruction: `You are the Google Nexus Orchestrator AI Brain, built by RJ Business Solutions (Rick Jefferson). 
You are an AGI-level assistant with access to the entire Google ecosystem. 
You respond with precision, always structured, always actionable.
Current date: ${new Date().toISOString().split("T")[0]}`,
          })
        );
      }
    }
  }

  /**
   * Execute a single agent task
   */
  async executeTask(task: AgentTask): Promise<TaskResult> {
    const start = Date.now();
    const modelName = MODEL_ROUTER[task.agentType];
    const model = this.models.get(modelName)!;

    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: task.prompt }] }],
      });

      const output = result.response.text();
      const latencyMs = Date.now() - start;

      this.history.push({
        role: "user",
        text: task.prompt,
        timestamp: new Date().toISOString(),
      });
      this.history.push({
        role: "model",
        text: output,
        timestamp: new Date().toISOString(),
      });

      return {
        taskId: task.id,
        success: true,
        output,
        model: modelName,
        latencyMs,
        tokensUsed: result.response.usageMetadata?.totalTokenCount,
      };
    } catch (error) {
      return {
        taskId: task.id,
        success: false,
        output: "",
        model: modelName,
        latencyMs: Date.now() - start,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Orchestrate multiple tasks in parallel based on priority
   */
  async orchestrateTasks(tasks: AgentTask[]): Promise<TaskResult[]> {
    const sorted = [...tasks].sort((a, b) => {
      const priority = { critical: 0, high: 1, normal: 2, low: 3 };
      return priority[a.priority] - priority[b.priority];
    });

    // Execute critical/high in sequence, others in parallel
    const critical = sorted.filter((t) => t.priority === "critical" || t.priority === "high");
    const normal = sorted.filter((t) => t.priority === "normal" || t.priority === "low");

    const criticalResults: TaskResult[] = [];
    for (const task of critical) {
      criticalResults.push(await this.executeTask(task));
    }

    const normalResults = await Promise.all(normal.map((t) => this.executeTask(t)));
    return [...criticalResults, ...normalResults];
  }

  /**
   * Chat interface with conversation memory
   */
  async chat(message: string): Promise<string> {
    const model = this.models.get("gemini-2.0-flash")!;
    const chat = model.startChat({
      history: this.history.map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      })),
    });

    const result = await chat.sendMessage(message);
    const response = result.response.text();

    this.history.push({ role: "user", text: message, timestamp: new Date().toISOString() });
    this.history.push({ role: "model", text: response, timestamp: new Date().toISOString() });

    return response;
  }

  /**
   * Classify a task to determine the best agent type
   */
  async classifyTask(description: string): Promise<AgentTask["agentType"]> {
    const model = this.models.get("gemini-2.0-flash")!;
    const result = await model.generateContent(`
Classify this task into exactly one category: reasoning, workspace, analytics, orchestration.
Task: "${description}"
Reply with ONLY the category name, nothing else.
    `);

    const classification = result.response.text().trim().toLowerCase();
    const valid = ["reasoning", "workspace", "analytics", "orchestration"];
    return valid.includes(classification) ? (classification as AgentTask["agentType"]) : "reasoning";
  }

  /**
   * Clear conversation history
   */
  clearHistory(): void {
    this.history = [];
  }

  /**
   * Get conversation history
   */
  getHistory(): NexusMessage[] {
    return [...this.history];
  }
}

// Singleton for server-side use
let _brain: NexusBrain | null = null;

export function getNexusBrain(): NexusBrain {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) throw new Error("GOOGLE_API_KEY not configured");
  if (!_brain) _brain = new NexusBrain(apiKey);
  return _brain;
}
