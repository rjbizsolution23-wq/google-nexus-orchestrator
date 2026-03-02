'use client';

import { useState, useEffect, useCallback } from 'react';

// ── Types ──────────────────────────────────────────────────────────
interface OrchestratorJob {
  id: string;
  name: string;
  agentId: string;
  agentName: string;
  status: 'running' | 'paused' | 'queued' | 'completed' | 'failed';
  priority: 'critical' | 'high' | 'normal' | 'low';
  progress: number;
  startedAt: string;
  task: string;
  model: string;
  tokensUsed: number;
}

interface OrchestratorAgent {
  id: string;
  name: string;
  model: string;
  status: 'active' | 'idle' | 'paused' | 'error';
  tasks: number;
  lastSeen: string;
  department: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8787';

const PRIORITY_COLORS: Record<string, string> = {
  critical: 'bg-red-500/20 text-red-300 border-red-500/40',
  high: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
  normal: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
  low: 'bg-gray-500/20 text-gray-300 border-gray-500/40',
};

const STATUS_COLORS: Record<string, string> = {
  running: 'text-green-400',
  paused: 'text-yellow-400',
  queued: 'text-blue-400',
  completed: 'text-gray-400',
  failed: 'text-red-400',
  active: 'text-green-400',
  idle: 'text-gray-400',
  error: 'text-red-400',
};

const STATUS_DOT: Record<string, string> = {
  running: 'bg-green-400 animate-pulse',
  paused: 'bg-yellow-400',
  queued: 'bg-blue-400 animate-pulse',
  completed: 'bg-gray-500',
  failed: 'bg-red-400',
  active: 'bg-green-400 animate-pulse',
  idle: 'bg-gray-500',
  error: 'bg-red-400 animate-pulse',
};

// ── Seed data for local-first UX ───────────────────────────────────
const SEED_JOBS: OrchestratorJob[] = [
  { id: 'job-001', name: 'Credit Report Analysis Pipeline', agentId: 'gno-001', agentName: 'Gemini Brain Pro', status: 'running', priority: 'critical', progress: 67, startedAt: new Date(Date.now() - 420000).toISOString(), task: 'Analyze 3-bureau credit report and generate dispute letters', model: 'gemini-2.5-pro', tokensUsed: 18420 },
  { id: 'job-002', name: 'SEO Content Generation — Blog Series', agentId: 'gno-002', agentName: 'Vertex Orchestrator', status: 'running', priority: 'high', progress: 34, startedAt: new Date(Date.now() - 180000).toISOString(), task: 'Generate 10-article blog series on credit repair', model: 'vertex-ai-agent', tokensUsed: 9340 },
  { id: 'job-003', name: 'Lead Scoring Automation', agentId: 'gno-005', agentName: 'BigQuery Analyst', status: 'paused', priority: 'normal', progress: 22, startedAt: new Date(Date.now() - 960000).toISOString(), task: 'Score and rank 2,400 incoming leads by conversion probability', model: 'bq-ml-v2', tokensUsed: 4120 },
  { id: 'job-004', name: 'Gmail Outreach Sequence — MFSN Affiliates', agentId: 'gno-003', agentName: 'Gmail Automator', status: 'queued', priority: 'high', progress: 0, startedAt: new Date(Date.now() - 60000).toISOString(), task: 'Send personalized affiliate onboarding emails to 180 prospects', model: 'gmail-api-v3', tokensUsed: 0 },
  { id: 'job-005', name: 'Drive File Reorganization', agentId: 'gno-004', agentName: 'Drive Manager', status: 'completed', priority: 'low', progress: 100, startedAt: new Date(Date.now() - 7200000).toISOString(), task: 'Reorganize 1,800+ Drive files into structured folders', model: 'drive-api-v3', tokensUsed: 1200 },
  { id: 'job-006', name: 'Firebase Real-Time Sync Audit', agentId: 'gno-006', agentName: 'Firebase Sync', status: 'failed', priority: 'critical', progress: 45, startedAt: new Date(Date.now() - 3600000).toISOString(), task: 'Verify real-time data sync between GNO and Firebase', model: 'firebase-rtdb', tokensUsed: 840 },
];

const SEED_AGENTS: OrchestratorAgent[] = [
  { id: 'gno-001', name: 'Gemini Brain Pro', model: 'gemini-2.5-pro', status: 'active', tasks: 342, lastSeen: 'now', department: 'AI / ML' },
  { id: 'gno-002', name: 'Vertex Orchestrator', model: 'vertex-ai-agent', status: 'active', tasks: 218, lastSeen: '2m ago', department: 'Orchestration' },
  { id: 'gno-003', name: 'Gmail Automator', model: 'gmail-api-v3', status: 'active', tasks: 156, lastSeen: '5m ago', department: 'Communications' },
  { id: 'gno-004', name: 'Drive Manager', model: 'drive-api-v3', status: 'idle', tasks: 89, lastSeen: '12m ago', department: 'Storage' },
  { id: 'gno-005', name: 'BigQuery Analyst', model: 'bq-ml-v2', status: 'active', tasks: 201, lastSeen: '1m ago', department: 'Analytics' },
  { id: 'gno-006', name: 'Firebase Sync', model: 'firebase-rtdb', status: 'error', tasks: 134, lastSeen: '1h ago', department: 'Database' },
];

// ── Helpers ────────────────────────────────────────────────────────
function elapsed(iso: string): string {
  const secs = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (secs < 60) return `${secs}s`;
  if (secs < 3600) return `${Math.floor(secs / 60)}m`;
  return `${Math.floor(secs / 3600)}h`;
}

// ── Job Row ────────────────────────────────────────────────────────
function JobRow({
  job,
  onPlay,
  onPause,
  onDelete,
  onSettings,
}: {
  job: OrchestratorJob;
  onPlay: (id: string) => void;
  onPause: (id: string) => void;
  onDelete: (id: string) => void;
  onSettings: (job: OrchestratorJob) => void;
}) {
  const canPlay = job.status === 'paused' || job.status === 'failed' || job.status === 'queued';
  const canPause = job.status === 'running';

  return (
    <div className="glass-card border border-white/10 rounded-xl p-4 flex flex-col gap-3 hover:border-blue-500/20 transition-all">
      {/* Top row */}
      <div className="flex items-start gap-3">
        {/* Status dot + name */}
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${STATUS_DOT[job.status]}`} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-white text-sm truncate">{job.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full border ${PRIORITY_COLORS[job.priority]}`}>{job.priority}</span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 truncate">{job.task}</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Play */}
          <button
            onClick={() => onPlay(job.id)}
            disabled={!canPlay}
            title="Resume / Start"
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all ${canPlay ? 'bg-green-600/40 hover:bg-green-600/70 text-green-300' : 'bg-white/5 text-gray-600 cursor-not-allowed opacity-40'}`}
          >▶</button>

          {/* Pause */}
          <button
            onClick={() => onPause(job.id)}
            disabled={!canPause}
            title="Pause"
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all ${canPause ? 'bg-yellow-600/40 hover:bg-yellow-600/70 text-yellow-300' : 'bg-white/5 text-gray-600 cursor-not-allowed opacity-40'}`}
          >⏸</button>

          {/* Settings */}
          <button
            onClick={() => onSettings(job)}
            title="Job Settings"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 transition-all"
          >⚙</button>

          {/* Delete */}
          <button
            onClick={() => onDelete(job.id)}
            title="Delete Job"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm bg-red-600/20 hover:bg-red-600/50 text-red-300 transition-all"
          >🗑</button>
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span className={`font-medium ${STATUS_COLORS[job.status]}`}>{job.status.toUpperCase()}</span>
          <span>{job.progress}%</span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${job.status === 'failed' ? 'bg-red-500' : job.status === 'completed' ? 'bg-green-500' : job.status === 'paused' ? 'bg-yellow-500' : 'bg-blue-500'}`}
            style={{ width: `${job.progress}%` }}
          />
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
        <span>🤖 {job.agentName}</span>
        <span>⏱ {elapsed(job.startedAt)}</span>
        <span>🔑 {job.model}</span>
        <span>📊 {job.tokensUsed.toLocaleString()} tokens</span>
      </div>
    </div>
  );
}

// ── Settings Modal ─────────────────────────────────────────────────
function SettingsModal({
  job,
  onClose,
  onSave,
}: {
  job: OrchestratorJob;
  onClose: () => void;
  onSave: (id: string, updates: Partial<OrchestratorJob>) => void;
}) {
  const [priority, setPriority] = useState(job.priority);
  const [model, setModel] = useState(job.model);
  const [task, setTask] = useState(job.task);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card border border-blue-500/30 rounded-2xl p-6 w-full max-w-md space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Job Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors text-xl">✕</button>
        </div>
        <p className="text-sm text-gray-400">{job.name}</p>

        <div className="space-y-3">
          <label className="block">
            <span className="text-xs text-gray-500 mb-1 block">Priority</span>
            <select value={priority} onChange={e => setPriority(e.target.value as OrchestratorJob['priority'])}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500/50">
              <option value="critical">🔴 Critical</option>
              <option value="high">🟠 High</option>
              <option value="normal">🔵 Normal</option>
              <option value="low">⚫ Low</option>
            </select>
          </label>

          <label className="block">
            <span className="text-xs text-gray-500 mb-1 block">Model</span>
            <select value={model} onChange={e => setModel(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500/50">
              <option value="gemini-2.5-pro">Gemini 2.5 Pro</option>
              <option value="gemini-flash-1.5">Gemini Flash 1.5</option>
              <option value="claude-sonnet-4">Claude Sonnet 4</option>
              <option value="gpt-4o">GPT-4o</option>
              <option value="llama-3.3-70b">Llama 3.3 70B (Groq)</option>
            </select>
          </label>

          <label className="block">
            <span className="text-xs text-gray-500 mb-1 block">Task Description</span>
            <textarea value={task} onChange={e => setTask(e.target.value)} rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500/50 resize-none" />
          </label>
        </div>

        <div className="flex gap-2 pt-2">
          <button onClick={onClose} className="flex-1 py-2 rounded-xl bg-white/5 text-gray-300 text-sm hover:bg-white/10 transition-colors">Cancel</button>
          <button onClick={() => { onSave(job.id, { priority, model, task }); onClose(); }}
            className="flex-1 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ── New Job Modal ──────────────────────────────────────────────────
function NewJobModal({
  agents,
  onClose,
  onCreate,
}: {
  agents: OrchestratorAgent[];
  onClose: () => void;
  onCreate: (job: Partial<OrchestratorJob>) => void;
}) {
  const [name, setName] = useState('');
  const [task, setTask] = useState('');
  const [agentId, setAgentId] = useState(agents[0]?.id ?? '');
  const [priority, setPriority] = useState<OrchestratorJob['priority']>('normal');

  const handleCreate = () => {
    if (!name.trim() || !task.trim()) return;
    const agent = agents.find(a => a.id === agentId);
    onCreate({ name, task, agentId, agentName: agent?.name ?? '', priority, model: agent?.model ?? '', status: 'queued', progress: 0, tokensUsed: 0, startedAt: new Date().toISOString() });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card border border-green-500/30 rounded-2xl p-6 w-full max-w-md space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">New Orchestration Job</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">✕</button>
        </div>

        <div className="space-y-3">
          <label className="block">
            <span className="text-xs text-gray-500 mb-1 block">Job Name</span>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Credit Report Pipeline"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-green-500/50" />
          </label>
          <label className="block">
            <span className="text-xs text-gray-500 mb-1 block">Task</span>
            <textarea value={task} onChange={e => setTask(e.target.value)} rows={3} placeholder="Describe what this job should do…"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-green-500/50 resize-none" />
          </label>
          <label className="block">
            <span className="text-xs text-gray-500 mb-1 block">Assign Agent</span>
            <select value={agentId} onChange={e => setAgentId(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-green-500/50">
              {agents.map(a => <option key={a.id} value={a.id}>{a.name} ({a.department})</option>)}
            </select>
          </label>
          <label className="block">
            <span className="text-xs text-gray-500 mb-1 block">Priority</span>
            <select value={priority} onChange={e => setPriority(e.target.value as OrchestratorJob['priority'])}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-green-500/50">
              <option value="critical">🔴 Critical</option>
              <option value="high">🟠 High</option>
              <option value="normal">🔵 Normal</option>
              <option value="low">⚫ Low</option>
            </select>
          </label>
        </div>

        <div className="flex gap-2 pt-2">
          <button onClick={onClose} className="flex-1 py-2 rounded-xl bg-white/5 text-gray-300 text-sm hover:bg-white/10 transition-colors">Cancel</button>
          <button onClick={handleCreate} className="flex-1 py-2 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors">
            🚀 Create & Queue
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────
export default function OrchestratorPage() {
  const [jobs, setJobs] = useState<OrchestratorJob[]>(SEED_JOBS);
  const [agents, setAgents] = useState<OrchestratorAgent[]>(SEED_AGENTS);
  const [filter, setFilter] = useState<'all' | OrchestratorJob['status']>('all');
  const [settingsJob, setSettingsJob] = useState<OrchestratorJob | null>(null);
  const [showNewJob, setShowNewJob] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  // Load from API if available
  useEffect(() => {
    fetch(`${API_BASE}/api/agents`)
      .then(r => r.json())
      .then((data: { agents: OrchestratorAgent[] }) => { if (data.agents?.length) setAgents(data.agents); })
      .catch(() => {/* use seed */});

    fetch(`${API_BASE}/api/orchestrator/jobs`)
      .then(r => r.json())
      .then((data: { jobs: OrchestratorJob[] }) => { if (data.jobs?.length) setJobs(data.jobs); })
      .catch(() => {/* use seed */});
  }, []);

  const handlePlay = useCallback(async (id: string) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, status: 'running' as const } : j));
    showToast(`▶ Job ${id} resumed`);
    try {
      await fetch(`${API_BASE}/api/orchestrator/jobs/${id}/resume`, { method: 'POST' });
    } catch { /* Offline — state already updated */ }
  }, []);

  const handlePause = useCallback(async (id: string) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, status: 'paused' as const } : j));
    showToast(`⏸ Job ${id} paused`);
    try {
      await fetch(`${API_BASE}/api/orchestrator/jobs/${id}/pause`, { method: 'POST' });
    } catch { /* Offline — state already updated */ }
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    setJobs(prev => prev.filter(j => j.id !== id));
    showToast(`🗑 Job deleted`);
    try {
      await fetch(`${API_BASE}/api/orchestrator/jobs/${id}`, { method: 'DELETE' });
    } catch { /* Offline — state already updated */ }
  }, []);

  const handleSaveSettings = useCallback(async (id: string, updates: Partial<OrchestratorJob>) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, ...updates } : j));
    showToast('✅ Job settings saved');
    try {
      await fetch(`${API_BASE}/api/orchestrator/jobs/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
    } catch { /* Offline — state already updated */ }
  }, []);

  const handleCreate = useCallback(async (job: Partial<OrchestratorJob>) => {
    const newJob: OrchestratorJob = { id: `job-${Date.now()}`, ...job } as OrchestratorJob;
    setJobs(prev => [newJob, ...prev]);
    showToast('🚀 Job queued!');
    setLoading(true);
    try {
      await fetch(`${API_BASE}/api/orchestrator/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJob),
      });
    } catch { /* Offline — state already updated */ }
    setLoading(false);
  }, []);

  const filtered = filter === 'all' ? jobs : jobs.filter(j => j.status === filter);

  const counts = {
    all: jobs.length,
    running: jobs.filter(j => j.status === 'running').length,
    paused: jobs.filter(j => j.status === 'paused').length,
    queued: jobs.filter(j => j.status === 'queued').length,
    completed: jobs.filter(j => j.status === 'completed').length,
    failed: jobs.filter(j => j.status === 'failed').length,
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm shadow-2xl animate-fade-in">
          {toast}
        </div>
      )}

      {/* Modals */}
      {settingsJob && <SettingsModal job={settingsJob} onClose={() => setSettingsJob(null)} onSave={handleSaveSettings} />}
      {showNewJob && <NewJobModal agents={agents} onClose={() => setShowNewJob(false)} onCreate={handleCreate} />}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-3xl">⚡</span>
            <h1 className="text-3xl font-black gradient-text">Orchestrator</h1>
          </div>
          <p className="text-gray-400">Manage, schedule, and control all AI agent jobs in real-time</p>
        </div>
        <button
          onClick={() => setShowNewJob(true)}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all flex items-center gap-2 shadow-lg shadow-blue-600/30"
        >
          + New Job
        </button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {([['Running', counts.running, 'text-green-400'], ['Paused', counts.paused, 'text-yellow-400'], ['Queued', counts.queued, 'text-blue-400'], ['Completed', counts.completed, 'text-gray-400'], ['Failed', counts.failed, 'text-red-400']] as const).map(([label, count, color]) => (
          <div key={label} className="glass-card border border-white/10 rounded-xl p-3 text-center">
            <p className={`text-2xl font-black ${color}`}>{count}</p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Active agents bar */}
      <div className="glass-card border border-white/10 rounded-xl p-4">
        <p className="text-xs text-gray-500 mb-3 font-semibold uppercase tracking-wider">Active Agents</p>
        <div className="flex flex-wrap gap-2">
          {agents.map(agent => (
            <div key={agent.id} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <div className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[agent.status]}`} />
              <span className="text-xs text-white font-medium">{agent.name}</span>
              <span className="text-xs text-gray-500">{agent.tasks} tasks</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {(['all', 'running', 'paused', 'queued', 'completed', 'failed'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize ${filter === f ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
            {f} ({counts[f as keyof typeof counts] ?? jobs.length})
          </button>
        ))}
      </div>

      {/* Job list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500 glass-card border border-white/10 rounded-2xl">
            No jobs in this state. Click <strong>+ New Job</strong> to get started.
          </div>
        ) : (
          filtered.map(job => (
            <JobRow
              key={job.id}
              job={job}
              onPlay={handlePlay}
              onPause={handlePause}
              onDelete={handleDelete}
              onSettings={setSettingsJob}
            />
          ))
        )}
      </div>

      {/* D1 init hint */}
      <div className="glass-card border border-white/5 rounded-xl px-4 py-3 flex items-center gap-3 opacity-60">
        <span className="text-gray-500 text-xs">💾 All job state persists to Cloudflare D1. Run <code className="text-blue-400 bg-blue-900/20 px-1 rounded">POST /api/init-db</code> if tables are not yet created.</span>
      </div>
    </div>
  );
}
