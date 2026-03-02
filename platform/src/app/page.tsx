'use client';

import { useState, useEffect } from 'react';
import {
  Activity, Bot, Cpu, Database, Globe, TrendingUp,
  Zap, CheckCircle, AlertTriangle, Clock, RefreshCcw, Play
} from 'lucide-react';

const stats = [
  { label: 'Active Agents', value: '14', sub: '+3 this week', color: 'var(--accent-blue)', icon: Bot },
  { label: 'Tasks Completed', value: '1,284', sub: '98.7% success rate', color: 'var(--accent-green)', icon: CheckCircle },
  { label: 'API Calls Today', value: '48.2K', sub: '↑ 12% from yesterday', color: 'var(--accent-purple)', icon: Activity },
  { label: 'GCP Services', value: '9', sub: 'All systems operational', color: 'var(--accent-cyan)', icon: Globe },
];

const agents = [
  { name: 'Gemini Brain Pro', model: 'gemini-2.5-pro', status: 'active', tasks: 342, type: 'Reasoning' },
  { name: 'Vertex Orchestrator', model: 'vertex-ai-agent', status: 'active', tasks: 218, type: 'Orchestration' },
  { name: 'Gmail Automator', model: 'gmail-api-v3', status: 'active', tasks: 156, type: 'Workspace' },
  { name: 'Drive Manager', model: 'drive-api-v3', status: 'idle', tasks: 89, type: 'Storage' },
  { name: 'BigQuery Analyst', model: 'bq-ml-v2', status: 'active', tasks: 201, type: 'Analytics' },
  { name: 'Firebase Sync', model: 'firebase-rtdb', status: 'active', tasks: 134, type: 'Realtime' },
];

const recentTasks = [
  { name: 'Process Academic Dataset', status: 'complete', time: '2m ago', agent: 'BigQuery Analyst', duration: '14s' },
  { name: 'Summarize 47 Emails', status: 'complete', time: '5m ago', agent: 'Gmail Automator', duration: '8s' },
  { name: 'Generate Market Report', status: 'running', time: '8m ago', agent: 'Gemini Brain Pro', duration: '...' },
  { name: 'Sync Drive Documents', status: 'complete', time: '12m ago', agent: 'Drive Manager', duration: '3s' },
  { name: 'Deploy Cloud Function', status: 'failed', time: '18m ago', agent: 'Vertex Orchestrator', duration: '45s' },
  { name: 'Retrain Vertex Model', status: 'complete', time: '1h ago', agent: 'Vertex Orchestrator', duration: '4m' },
];

const chartData = [65, 80, 55, 90, 72, 88, 95, 70, 85, 92, 78, 96];
const chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      {/* Topbar */}
      <div className="topbar">
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-primary)' }}>
            Command Center
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
            {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} &nbsp;·&nbsp;
            <span style={{ fontFamily: 'var(--font-mono)' }}>
              {time.toLocaleTimeString('en-US', { hour12: false })} MST
            </span>
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="badge badge-green">
            <div className="pulse-dot" style={{ background: 'var(--accent-green)', width: '6px', height: '6px' }} />
            All Systems Live
          </span>
          <button className="btn-primary" style={{ fontSize: '13px', padding: '8px 16px' }}>
            <Play size={14} /> Run Agent
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {stats.map(({ label, value, sub, color, icon: Icon }, i) => (
          <div key={label} className={`stat-card fade-in-up fade-in-up-delay-${i + 1}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: `${color}1a`, border: `1px solid ${color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Icon size={20} color={color} />
              </div>
              <TrendingUp size={14} color="var(--accent-green)" />
            </div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-1px' }}>{value}</div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0' }}>{label}</div>
            <div style={{ fontSize: '11px', color: 'var(--accent-green)' }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px', marginBottom: '24px' }}>

        {/* Chart */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>Task Throughput</h2>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>Monthly agent task completions</p>
            </div>
            <select style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
              borderRadius: '8px', padding: '6px 12px', color: 'var(--text-secondary)',
              fontSize: '12px', cursor: 'pointer', outline: 'none'
            }}>
              <option>Last 12 Months</option>
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
            </select>
          </div>

          {/* Chart */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '140px', marginBottom: '8px' }}>
            {chartData.map((val, i) => (
              <div key={i} style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <div
                  className="chart-bar"
                  style={{ height: `${val}%` }}
                  title={`${chartLabels[i]}: ${val}%`}
                />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {chartLabels.map((l) => (
              <div key={l} style={{ fontSize: '10px', color: 'var(--text-muted)', textAlign: 'center', flex: 1 }}>{l}</div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '20px' }}>
            System Health
          </h2>
          {[
            { name: 'Gemini API', val: 98, color: 'var(--accent-green)' },
            { name: 'Vertex AI', val: 95, color: 'var(--accent-blue)' },
            { name: 'Cloudflare Workers', val: 99, color: 'var(--accent-cyan)' },
            { name: 'D1 Database', val: 100, color: 'var(--accent-purple)' },
            { name: 'Firebase RTDB', val: 97, color: 'var(--accent-gold)' },
            { name: 'Google Workspace', val: 92, color: 'var(--accent-green)' },
          ].map(({ name, val, color }) => (
            <div key={name} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{name}</span>
                <span style={{ fontSize: '12px', fontWeight: '600', color }}>{val}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${val}%`, background: color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

        {/* Active Agents */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>Active Agents</h2>
            <button className="btn-ghost" style={{ fontSize: '12px', padding: '6px 12px' }}>
              <RefreshCcw size={12} /> Refresh
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {agents.map(({ name, model, status, tasks, type }) => (
              <div key={name} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '10px 12px', background: 'var(--bg-card)', borderRadius: '10px',
                border: '1px solid var(--border-subtle)', transition: 'all 0.2s'
              }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  background: status === 'active' ? 'rgba(16, 217, 140, 0.12)' : 'rgba(79, 142, 247, 0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <Bot size={16} color={status === 'active' ? 'var(--accent-green)' : 'var(--text-muted)'} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{model}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <span className={`badge ${status === 'active' ? 'badge-green' : 'badge-blue'}`} style={{ fontSize: '9px' }}>
                    {status}
                  </span>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{tasks} tasks</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>Recent Tasks</h2>
            <span className="badge badge-blue">{recentTasks.length} total</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {recentTasks.map(({ name, status, time, agent, duration }) => (
              <div key={name} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '10px 12px', background: 'var(--bg-card)', borderRadius: '10px',
                border: '1px solid var(--border-subtle)'
              }}>
                <div style={{ flexShrink: 0 }}>
                  {status === 'complete' && <CheckCircle size={16} color="var(--accent-green)" />}
                  {status === 'running' && <Clock size={16} color="var(--accent-blue)" />}
                  {status === 'failed' && <AlertTriangle size={16} color="var(--accent-red)" />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{agent} · {time}</div>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{duration}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Query Terminal */}
      <div className="glass-card" style={{ marginTop: '24px', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <Cpu size={18} color="var(--accent-cyan)" />
          <h2 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>Nexus AI Terminal</h2>
          <span className="badge badge-blue">Gemini 2.5 Pro</span>
        </div>
        <div className="terminal" style={{ marginBottom: '12px', minHeight: '80px' }}>
          <div style={{ color: 'var(--accent-muted)', marginBottom: '8px' }}>
            <span style={{ color: 'var(--accent-green)' }}>gno@nexus</span>
            <span style={{ color: 'var(--text-muted)' }}> ~ </span>
            <span style={{ color: 'var(--accent-cyan)' }}>$ </span>
            <span style={{ color: '#fff' }}>status --all</span>
          </div>
          <div style={{ color: 'var(--accent-green)' }}>✓ 14 agents active | 6 GCP services connected | D1 synced</div>
          <div style={{ color: 'var(--accent-cyan)' }}>✓ Gemini 2.5 Pro endpoint responding (latency: 142ms)</div>
          <div style={{ color: '#f5a623' }}>⚠ Cloud Function deploy failed — retrying in 3m...</div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <input className="input-field" placeholder="Ask the Nexus AI anything…" style={{ flex: 1 }} />
          <button className="btn-primary">
            <Zap size={14} /> Execute
          </button>
        </div>
      </div>
    </div>
  );
}
