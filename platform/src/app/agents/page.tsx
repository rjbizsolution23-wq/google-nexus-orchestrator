'use client';

import { useState } from 'react';
import { Bot, Plus, Play, Pause, Settings, Trash2, Activity, Zap, Brain, Globe, Database } from 'lucide-react';

const allAgents = [
  {
    id: 'gno-001', name: 'Gemini Brain Pro', model: 'gemini-2.5-pro', type: 'Reasoning',
    status: 'active', tasks: 342, successRate: 99.1, latency: '142ms',
    description: 'Primary reasoning agent for complex multi-step tasks.',
    color: 'var(--accent-blue)', icon: Brain
  },
  {
    id: 'gno-002', name: 'Vertex Orchestrator', model: 'vertex-ai-agent', type: 'Orchestration',
    status: 'active', tasks: 218, successRate: 97.8, latency: '210ms',
    description: 'Routes sub-tasks to specialized agents via Google ADK.',
    color: 'var(--accent-purple)', icon: Zap
  },
  {
    id: 'gno-003', name: 'Gmail Automator', model: 'gmail-api-v3', type: 'Workspace',
    status: 'active', tasks: 156, successRate: 100, latency: '85ms',
    description: 'Reads, categorizes, and responds to emails autonomously.',
    color: 'var(--accent-cyan)', icon: Globe
  },
  {
    id: 'gno-004', name: 'Drive Manager', model: 'drive-api-v3', type: 'Storage',
    status: 'idle', tasks: 89, successRate: 98.0, latency: '95ms',
    description: 'Manages Google Drive files, folders, and permissions.',
    color: 'var(--accent-gold)', icon: Database
  },
  {
    id: 'gno-005', name: 'BigQuery Analyst', model: 'bq-ml-v2', type: 'Analytics',
    status: 'active', tasks: 201, successRate: 95.5, latency: '320ms',
    description: 'Runs SQL queries and ML inference on BigQuery datasets.',
    color: 'var(--accent-green)', icon: Activity
  },
  {
    id: 'gno-006', name: 'Firebase Sync', model: 'firebase-rtdb', type: 'Realtime',
    status: 'active', tasks: 134, successRate: 99.9, latency: '28ms',
    description: 'Syncs real-time data between Firebase and Cloudflare D1.',
    color: 'var(--accent-red)', icon: Zap
  },
];

export default function AgentsPage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'idle'>('all');

  const filtered = allAgents.filter(a => filter === 'all' || a.status === filter);

  return (
    <div>
      {/* Header */}
      <div className="topbar">
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-primary)' }}>AI Agents</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
            {allAgents.filter(a => a.status === 'active').length} active · {allAgents.length} total
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {(['all', 'active', 'idle'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={filter === f ? 'btn-primary' : 'btn-ghost'}
              style={{ fontSize: '13px', padding: '8px 14px', textTransform: 'capitalize' }}
            >
              {f}
            </button>
          ))}
          <button className="btn-primary" style={{ fontSize: '13px', padding: '8px 16px' }}>
            <Plus size={14} /> New Agent
          </button>
        </div>
      </div>

      {/* Agent Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {filtered.map(({ id, name, model, type, status, tasks, successRate, latency, description, color, icon: Icon }) => (
          <div key={id} className="agent-card fade-in-up">
            {/* Card Top */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{
                width: '52px', height: '52px', borderRadius: '14px',
                background: `${color}1a`, border: `1px solid ${color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Icon size={24} color={color} />
              </div>
              <span className={`badge ${status === 'active' ? 'badge-green' : 'badge-blue'}`}>
                <div className="pulse-dot" style={{ background: status === 'active' ? 'var(--accent-green)' : 'var(--text-muted)', width: '6px', height: '6px' }} />
                {status}
              </span>
            </div>

            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>{name}</h3>
            <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: color, marginBottom: '8px' }}>{model}</div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>{description}</p>

            {/* Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
              {[
                { label: 'Tasks', val: tasks.toLocaleString() },
                { label: 'Success', val: `${successRate}%` },
                { label: 'Latency', val: latency },
              ].map(({ label, val }) => (
                <div key={label} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>{val}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Type badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="badge badge-purple">{type}</span>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button className="btn-ghost" style={{ padding: '5px', borderRadius: '7px' }} title="Settings">
                  <Settings size={13} />
                </button>
                <button className="btn-ghost" style={{ padding: '5px', borderRadius: '7px' }} title={status === 'active' ? 'Pause' : 'Run'}>
                  {status === 'active' ? <Pause size={13} /> : <Play size={13} />}
                </button>
                <button className="btn-ghost" style={{ padding: '5px', borderRadius: '7px', borderColor: 'rgba(239,68,68,0.25)', color: 'var(--accent-red)' }} title="Delete">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
