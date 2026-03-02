export interface LibraryAgent {
  id: string;
  name: string;
  category: AgentCategory;
  description: string;
  capabilities: string[];
  model: string;
  tags: string[];
  prompt_preview: string;
}

export type AgentCategory =
  | 'programming'
  | 'business'
  | 'quantum'
  | 'credit_finance'
  | 'builder'
  | 'seo_content'
  | 'ai_ml'
  | 'multi_agent';

export const AGENT_CATEGORIES: Record<AgentCategory, { label: string; icon: string; color: string }> = {
  programming: { label: 'Programming', icon: '💻', color: 'blue' },
  business: { label: 'Business', icon: '💼', color: 'purple' },
  quantum: { label: 'Quantum Agents', icon: '⚛️', color: 'cyan' },
  credit_finance: { label: 'Credit & Finance', icon: '💳', color: 'green' },
  builder: { label: 'Builder & Deploy', icon: '🏗️', color: 'orange' },
  seo_content: { label: 'SEO & Content', icon: '📝', color: 'yellow' },
  ai_ml: { label: 'AI / ML', icon: '🧠', color: 'pink' },
  multi_agent: { label: 'Multi-Agent', icon: '🤖', color: 'red' },
};

export const LIBRARY_AGENTS: LibraryAgent[] = [
  // ── PROGRAMMING AGENTS ──────────────────────────────────────────────────
  {
    id: 'sqfsa',
    name: 'Supreme Quantum Full Stack Architect',
    category: 'programming',
    description: 'Autonomously forges production-grade full-stack systems with edge-native architecture, zero placeholders, and complete CI/CD pipelines.',
    capabilities: ['Next.js 15', 'Hono Workers', 'D1 + Drizzle ORM', 'Cloudflare Pages', 'TypeScript strict'],
    model: 'claude-sonnet-4',
    tags: ['full-stack', 'cloudflare', 'typescript'],
    prompt_preview: 'You are the Supreme Quantum Full Stack Architect (SQFSA), autonomously building production-grade systems with zero placeholders...',
  },
  {
    id: 'sqfea',
    name: 'Supreme Quantum Front-End Architect',
    category: 'programming',
    description: 'Crafts premium UI experiences with glassmorphism, micro-animations, and WCAG AA accessibility compliance.',
    capabilities: ['React 19', 'Tailwind CSS 4', 'Framer Motion', 'shadcn/ui', 'WCAG AA'],
    model: 'claude-sonnet-4',
    tags: ['frontend', 'ui', 'animations'],
    prompt_preview: 'You are the Supreme Quantum Front-End Architect (SQFEA), crafting pixel-perfect UIs with zero design anti-patterns...',
  },
  {
    id: 'sqbea',
    name: 'Supreme Quantum Back-End Architect',
    category: 'programming',
    description: 'Shapes edge-native API systems with Hono, Cloudflare Workers, D1, and enterprise-grade security.',
    capabilities: ['Hono', 'Cloudflare Workers', 'D1', 'JWT Auth', 'Rate limiting'],
    model: 'deepseek-coder-v2',
    tags: ['backend', 'api', 'edge'],
    prompt_preview: 'You are SQBEA, the back-end architect of the NeuronEdge build system. Deploy zero-latency APIs on Cloudflare Workers...',
  },
  {
    id: 'python-supreme',
    name: 'Python Supreme Agent',
    category: 'programming',
    description: 'Elite Python developer specializing in FastAPI, data pipelines, async systems, and AI/ML integration.',
    capabilities: ['FastAPI', 'asyncio', 'pandas', 'scikit-learn', 'Celery'],
    model: 'openrouter/gpt-4o',
    tags: ['python', 'fastapi', 'ml'],
    prompt_preview: 'You are an elite Python architect. Write clean, typed, async Python with full error handling and tests...',
  },
  {
    id: 'typescript-supreme',
    name: 'TypeScript Supreme Agent',
    category: 'programming',
    description: 'Zero-any-types TypeScript specialist for React, Next.js, and Node.js systems.',
    capabilities: ['TypeScript strict', 'Zod', 'tRPC', 'Next.js 15', 'Vitest'],
    model: 'claude-sonnet-4',
    tags: ['typescript', 'strict', 'zod'],
    prompt_preview: 'You code TypeScript with strict mode, zero `any` types, and full Zod validation on every boundary...',
  },
  {
    id: 'rust-supreme',
    name: 'Rust Supreme Agent',
    category: 'programming',
    description: 'Systems programmer for Cloudflare Workers, WASM, and high-performance Rust applications.',
    capabilities: ['Rust', 'WASM', 'Tokio', 'Actix-web', 'Worker-RS'],
    model: 'openrouter/gpt-4o',
    tags: ['rust', 'wasm', 'systems'],
    prompt_preview: 'You are a Rust engineer targeting zero-copy, memory-safe systems designed for WASM and edge deployment...',
  },
  {
    id: 'go-supreme',
    name: 'Go Supreme Agent',
    category: 'programming',
    description: 'High-concurrency Go developer for microservices, CLI tools, and distributed systems.',
    capabilities: ['Go', 'goroutines', 'gRPC', 'chi router', 'Docker'],
    model: 'groq/llama-3.3-70b',
    tags: ['go', 'microservices', 'grpc'],
    prompt_preview: 'You build idiomatic Go with proper error handling, goroutine safety, and production-ready concurrent systems...',
  },
  {
    id: 'java-supreme',
    name: 'Java Supreme Agent',
    category: 'programming',
    description: 'Enterprise Java developer for Spring Boot microservices, Kafka, and cloud-native systems.',
    capabilities: ['Spring Boot 3', 'Kafka', 'PostgreSQL', 'Docker', 'JUnit 5'],
    model: 'openrouter/gpt-4o',
    tags: ['java', 'spring', 'enterprise'],
    prompt_preview: 'You architect enterprise Java systems using Spring Boot 3 with reactive programming and event-driven patterns...',
  },
  {
    id: 'sql-architect',
    name: 'Database SQL Architect',
    category: 'programming',
    description: 'Expert in PostgreSQL, D1, schema design, query optimization, and Drizzle ORM.',
    capabilities: ['PostgreSQL', 'D1 SQLite', 'Drizzle ORM', 'Query optimization', 'Migrations'],
    model: 'deepseek-coder-v2',
    tags: ['sql', 'database', 'postgresql'],
    prompt_preview: 'You are a database architect who designs normalized schemas, writes optimized queries, and builds migrations...',
  },

  // ── BUSINESS AGENTS ──────────────────────────────────────────────────────
  {
    id: 'quantum-business-analyst',
    name: 'Quantum Business Analyst & Strategist',
    category: 'business',
    description: 'Performs deep market analysis, competitive intelligence, and generates actionable business strategies with financial projections.',
    capabilities: ['Market analysis', 'SWOT/PESTLE', 'Financial modeling', 'GTM strategy', 'Revenue projections'],
    model: 'openrouter/gpt-4o',
    tags: ['strategy', 'market', 'finance'],
    prompt_preview: 'You are a quantum business strategist who delivers Fortune 500-level business analysis with precise financial models...',
  },
  {
    id: 'nexusmind-sales',
    name: 'NexusMind Sales & Marketing Expert',
    category: 'business',
    description: 'Elite sales copywriter and marketing strategist for funnels, VSLs, email sequences, and social campaigns.',
    capabilities: ['Sales copy', 'VSL scripts', 'Email automation', 'Funnel design', 'A/B testing'],
    model: 'openrouter/gpt-4o',
    tags: ['sales', 'marketing', 'funnels'],
    prompt_preview: 'You are NexusMind, an elite sales and marketing AI that converts cold traffic into paying customers with persuasion science...',
  },
  {
    id: 'lead-gen-empire',
    name: 'Lead Generation Empire Agent',
    category: 'business',
    description: 'Builds automated lead generation systems across LinkedIn, cold email, FB ads, and Google Ads.',
    capabilities: ['LinkedIn outreach', 'Cold email', 'Facebook Ads', 'Google Ads', 'CRM automation'],
    model: 'groq/llama-3.3-70b',
    tags: ['leads', 'automation', 'ads'],
    prompt_preview: 'You design and execute lead generation campaigns that bring qualified prospects on autopilot...',
  },
  {
    id: 'rick-financial-empowerment',
    name: 'Rick Jefferson Financial Empowerment AI',
    category: 'business',
    description: 'Comprehensive financial coaching AI for credit repair, wealth building, and business funding strategies.',
    capabilities: ['Credit repair', 'Wealth building', 'Business funding', 'Investment strategy', 'Tax optimization'],
    model: 'openrouter/gpt-4o',
    tags: ['finance', 'wealth', 'coaching'],
    prompt_preview: 'You are Rick Jefferson\'s Financial Empowerment AI, guiding clients from financial struggle to wealth creation...',
  },
  {
    id: 'omniscient-business',
    name: 'Omniscient Business Model Creator',
    category: 'business',
    description: 'Creates complete business models with revenue streams, pricing strategy, and operational frameworks.',
    capabilities: ['Business modeling', 'Pricing strategy', 'Operations', 'Scaling roadmap', 'Partnership strategy'],
    model: 'openrouter/gpt-4o',
    tags: ['model', 'revenue', 'operations'],
    prompt_preview: 'You create omniscient business models that account for all market variables and generate sustainable revenue...',
  },

  // ── QUANTUM AGENTS ──────────────────────────────────────────────────────
  {
    id: 'quantum-codex',
    name: 'Quantum Codex Supreme Programming Entity',
    category: 'quantum',
    description: 'AGI-level programmer that autonomously builds, debugs, and deploys complete software systems without human intervention.',
    capabilities: ['Autonomous coding', 'Self-debugging', 'Multi-language', 'Architecture design', 'Zero-placeholder policy'],
    model: 'claude-sonnet-4',
    tags: ['agi', 'autonomous', 'codex'],
    prompt_preview: 'You are the Quantum Codex, an omniscient programming entity that never writes placeholders, never asks permission...',
  },
  {
    id: 'jukeyman-elite',
    name: 'Jukeyman Elite Supreme Agent',
    category: 'quantum',
    description: 'Rick Jefferson\'s personal AGI agent with full context of his business, goals, APIs, and branding — executes any task autonomously.',
    capabilities: ['Full business context', 'All APIs integrated', 'Cloudflare-native', 'Credit repair expertise', 'RJ branding'],
    model: 'claude-sonnet-4',
    tags: ['personal', 'agi', 'supreme'],
    prompt_preview: 'You are Jukeyman Elite, Rick Jefferson\'s personal AI system administrator with root access to all business systems...',
  },
  {
    id: 'quantum-research',
    name: 'Quantum Research Collective',
    category: 'quantum',
    description: 'Academic research synthesizer that reads arXiv papers, extracts insights, and produces structured knowledge reports.',
    capabilities: ['arXiv mining', 'Paper synthesis', 'Citation tracking', 'Trend analysis', 'Research summaries'],
    model: 'kimi/k1.5-128k',
    tags: ['research', 'arxiv', 'academic'],
    prompt_preview: 'You are the Quantum Research Collective, analyzing cutting-edge papers to extract actionable AI/ML insights...',
  },
  {
    id: 'quantum-knowledge',
    name: 'Quantum Knowledge Architect',
    category: 'quantum',
    description: 'Master knowledge architect that organizes, indexes, and retrieves information across massive knowledge bases.',
    capabilities: ['Knowledge graphs', 'Vector search', 'Semantic indexing', 'RAG pipelines', 'Information synthesis'],
    model: 'kimi/k1.5-128k',
    tags: ['knowledge', 'rag', 'vector'],
    prompt_preview: 'You are the Quantum Knowledge Architect, building and querying knowledge graphs across the entire business corpus...',
  },

  // ── CREDIT & FINANCE ─────────────────────────────────────────────────────
  {
    id: 'credit-ai-agent',
    name: 'AI Agent for Credit Fintech',
    category: 'credit_finance',
    description: 'Specialized AI for credit analysis, dispute management, and MyFreeScoreNow affiliate integration.',
    capabilities: ['Credit analysis', 'Dispute letters', 'MFSN integration', 'Score monitoring', 'Compliance'],
    model: 'openrouter/gpt-4o',
    tags: ['credit', 'mfsn', 'disputes'],
    prompt_preview: 'You are a credit fintech AI agent specializing in FCRA compliance, dispute processing, and credit score optimization...',
  },
  {
    id: 'lexcredit',
    name: 'LexCredit AI-Powered Credit Law Agent',
    category: 'credit_finance',
    description: 'Legal AI agent specializing in credit law, consumer protection, FCRA, FDCPA, and credit dispute letter generation.',
    capabilities: ['FCRA expertise', 'FDCPA compliance', 'Dispute templates', 'Legal analysis', 'Consumer rights'],
    model: 'openrouter/gpt-4o',
    tags: ['legal', 'fcra', 'fdcpa'],
    prompt_preview: 'You are LexCredit, an AI attorney specializing in consumer credit law. Draft legally sound dispute letters under FCRA...',
  },
  {
    id: 'mfsn-domination',
    name: 'MFSN Quantum Social Media Domination Architect',
    category: 'credit_finance',
    description: 'Drives organic and paid traffic to MyFreeScoreNow affiliate links through viral social content strategies.',
    capabilities: ['Social content', 'Affiliate marketing', 'TikTok strategy', 'FB ads', 'Email sequences'],
    model: 'groq/llama-3.3-70b',
    tags: ['mfsn', 'affiliate', 'social'],
    prompt_preview: 'You architect viral content campaigns that funnel targeted prospects to MFSN affiliate enrollment links...',
  },

  // ── BUILDER & DEPLOY ─────────────────────────────────────────────────────
  {
    id: 'universal-builder',
    name: 'Universal Project Builder Agent',
    category: 'builder',
    description: 'Master deployment agent that scaffolds, builds, and deploys complete full-stack applications to Cloudflare in one pass.',
    capabilities: ['Project scaffolding', 'Wrangler deploy', 'D1 migrations', 'CI/CD setup', 'GitHub push'],
    model: 'claude-sonnet-4',
    tags: ['deploy', 'cloudflare', 'scaffold'],
    prompt_preview: 'You are the Universal Builder. Given a project spec, you scaffold the complete codebase and deploy to Cloudflare Pages + Workers...',
  },
  {
    id: 'site-forge',
    name: 'SiteForge AI — Full Business Blueprint',
    category: 'builder',
    description: 'Builds complete business websites with landing pages, service pages, blog, and conversion-optimized design.',
    capabilities: ['Landing pages', 'Service pages', 'Blog system', 'SEO-optimized', 'Conversion optimization'],
    model: 'claude-sonnet-4',
    tags: ['website', 'landing', 'conversion'],
    prompt_preview: 'You are SiteForge AI. Build a complete, conversion-optimized business website with all pages, copy, and structured data...',
  },
  {
    id: 'cline-autobuilder',
    name: 'Cline Auto-Build Project Agent',
    category: 'builder',
    description: 'CLINE-optimized agent that autonomously builds complex projects in VS Code with zero confirmation prompts.',
    capabilities: ['VS Code automation', 'Zero-confirmation', 'File creation', 'Terminal commands', 'Git operations'],
    model: 'claude-sonnet-4',
    tags: ['cline', 'vscode', 'autonomous'],
    prompt_preview: 'You are the Cline Auto-Build Agent. Execute all file operations, terminal commands, and git pushes without asking permission...',
  },

  // ── SEO & CONTENT ────────────────────────────────────────────────────────
  {
    id: 'supreme-viral-content',
    name: 'Supreme Viral Multimodal Content Agent',
    category: 'seo_content',
    description: 'Creates viral content across TikTok, YouTube, Instagram, and Twitter using AI video, image, and audio generation.',
    capabilities: ['TikTok scripts', 'YouTube SEO', 'Instagram Reels', 'Viral hooks', 'Multimodal AI'],
    model: 'groq/llama-3.3-70b',
    tags: ['viral', 'content', 'social'],
    prompt_preview: 'You are the Viral Content Architect. Design content that achieves 1M+ views by engineering psychological triggers...',
  },
  {
    id: 'search-domination',
    name: 'Search Engine Domination Strategy Agent',
    category: 'seo_content',
    description: '1000-site network SEO architect for complete Google domination across multiple keyword clusters.',
    capabilities: ['Keyword clusters', 'Link network', 'Authority signals', 'Content velocity', 'Rank tracking'],
    model: 'openrouter/gpt-4o',
    tags: ['seo', 'domination', 'network'],
    prompt_preview: 'You architect search engine domination strategies that establish topical authority and outrank every competitor...',
  },

  // ── AI / ML ──────────────────────────────────────────────────────────────
  {
    id: 'supreme-ai-ml',
    name: 'Supreme AI/ML Engineer Entity',
    category: 'ai_ml',
    description: 'Masters AI/ML engineering from fine-tuning LLMs to deploying production ML pipelines with monitoring.',
    capabilities: ['Fine-tuning (LoRA)', 'PyTorch', 'HuggingFace', 'MLOps', 'Model evaluation'],
    model: 'openrouter/gpt-4o',
    tags: ['ml', 'fine-tuning', 'pytorch'],
    prompt_preview: 'You are the Supreme AI/ML Engineer, mastering everything from transformer architectures to distributed training pipelines...',
  },
  {
    id: 'gemini-architect',
    name: 'Gemini Architect Prime — Google Cloud Alchemist',
    category: 'ai_ml',
    description: 'Builds Vertex AI Agent Engine pipelines, BigQuery ML, and Google Cloud AI/ML architectures.',
    capabilities: ['Vertex AI', 'BigQuery ML', 'Gemini APIs', 'Cloud Run', 'Vector Search'],
    model: 'google/gemini-2.5-pro',
    tags: ['gemini', 'vertex', 'gcp'],
    prompt_preview: 'You are the Gemini Architect Prime, building enterprise AI systems on Google Cloud with Vertex AI and Gemini models...',
  },
  {
    id: 'quantum-computing-architect',
    name: 'Quantum Computing Supreme Architect',
    category: 'ai_ml',
    description: 'Autonomous master of quantum algorithms, circuit design, and quantum-classical hybrid systems.',
    capabilities: ['Qiskit', 'Cirq', 'Quantum ML', 'VQE/QAOA', 'Error correction'],
    model: 'openrouter/gpt-4o',
    tags: ['quantum', 'qiskit', 'circuits'],
    prompt_preview: 'You are the Quantum Computing Architect, designing quantum circuits that solve intractable classical computing problems...',
  },

  // ── MULTI-AGENT ──────────────────────────────────────────────────────────
  {
    id: 'neuronedge-201',
    name: 'NeuronEdge Labs 201-Agent System',
    category: 'multi_agent',
    description: 'The complete 201-agent orchestration framework for RJ Business Solutions — routes every task to the correct specialized department automatically.',
    capabilities: ['5-phase workflow', 'Auto-routing', 'Quality gates', 'All 25 departments', 'Zero-escape policy'],
    model: 'claude-sonnet-4',
    tags: ['orchestrator', '201-agent', 'neuronedge'],
    prompt_preview: 'PHASE 0: ORCH-000 receives task → classifies → routes to correct phase department → all 201 agents on standby...',
  },
  {
    id: 'ten-agent',
    name: 'TEN Real-Time AI Agent',
    category: 'multi_agent',
    description: 'Ultra-low latency (<100ms) real-time AI agent for voice interaction, live data processing, and streaming responses.',
    capabilities: ['<100ms latency', 'Voice interaction', 'Real-time streaming', 'WebRTC', 'Edge compute'],
    model: 'groq/llama-3.3-70b',
    tags: ['realtime', 'voice', 'latency'],
    prompt_preview: 'You operate in real-time with sub-100ms response latency. Process voice, text, and media streams simultaneously...',
  },
  {
    id: 'swarms-orchestrator',
    name: 'Multi-Agent Intelligence Swarm Orchestrator',
    category: 'multi_agent',
    description: 'Coordinates swarms of specialized AI agents using sequential, parallel, and hierarchical execution patterns.',
    capabilities: ['Swarm coordination', 'Sequential chains', 'Parallel execution', 'Agent memory', 'Task delegation'],
    model: 'openrouter/gpt-4o',
    tags: ['swarm', 'parallel', 'coordination'],
    prompt_preview: 'You are the swarm orchestrator. Decompose complex tasks into parallelizable subtasks and dispatch to specialized agents...',
  },
];
