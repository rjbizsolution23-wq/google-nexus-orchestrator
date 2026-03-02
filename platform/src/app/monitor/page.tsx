'use client';

import { useState } from 'react';
import { Activity, AlertTriangle, CheckCircle, Clock, Cpu, RefreshCcw, Terminal, Wifi } from 'lucide-react';

const logs = [
  { ts: '22:08:01', level: 'info',  msg: 'Gemini Brain Pro completed reasoning chain in 142ms', agent: 'gno-001' },
  { ts: '22:07:55', level: 'warn',  msg: 'Cloud Function deploy failed — retrying (attempt 2/3)', agent: 'gno-002' },
  { ts: '22:07:42', level: 'info',  msg: 'Firebase Sync: 1,240 records replicated to D1', agent: 'gno-006' },
  { ts: '22:07:30', level: 'info',  msg: 'Gmail Automator: 12 emails categorized, 3 responses drafted', agent: 'gno-003' },
  { ts: '22:07:18', level: 'error', msg: 'BigQuery job timeout after 30s — dataset too large', agent: 'gno-005' },
  { ts: '22:07:05', level: 'info',  msg: 'Vertex Orchestrator: delegated 4 sub-tasks to specialized agents', agent: 'gno-002' },
  { ts: '22:06:58', level: 'info',  msg: 'Drive Manager: uploaded report_q1_2026.pdf to /reports/', agent: 'gno-004' },
  { ts: '22:06:40', level: 'info',  msg: 'Cloudflare Worker heartbeat OK — latency 12ms', agent: 'system' },
  { ts: '22:06:22', level: 'info',  msg: 'D1 database backup completed successfully', agent: 'system' },
  { ts: '22:06:10', level: 'warn',  msg: 'API rate limit at 87% — throttling non-critical requests', agent: 'system' },
];

const services = [
  { name: 'Cloudflare Workers', status: 'operational', uptime: '99.98%', requests: '48.2K', icon: Wifi },
  { name: 'Gemini API', status: 'operational', uptime: '99.95%', requests: '12.1K', icon: Cpu },
  { name: 'Vertex AI', status: 'operational', uptime: '99.90%', requests: '3.4K', icon: Activity },
  { name: 'Firebase RTDB', status: 'operational', uptime: '100%', requests: '89.5K', icon: CheckCircle },
  { name: 'Google Drive API', status: 'degraded', uptime: '97.20%', requests: '1.2K', icon: AlertTriangle },
  { name: 'Cloudflare D1', status: 'operational', uptime: '100%', requests: '24.8K', icon: CheckCircle },
];

const levelColor: Record<string, string> = {
  info: 'var(--accent-cyan)',
  warn: 'var(--accent-gold)',
  error: 'var(--accent-red)',
};

export default function MonitorPage() {
  const [logFilter, setLogFilter] = useState<'all' | 'info' | 'warn' | 'error'>('all');
  const filtered = logs.filter(l => logFilter === 'all' || l.level === logFilter);

  return (
    <div>
      {/* Header */}
      <div className="topbar">
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-primary)' }}>Monitor</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>Real-time system health & logs</p>
        </div>
        <button className="btn-ghost" style={{ fontSize: '13px', padding: '8px 14px' }}>
          <RefreshCcw size={13} /> Refresh
        </button>
      </div>

      {/* Service Status Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {services.map(({ name, status, uptime, requests, icon: Icon }) => (
          <div key={name} className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <Icon size={18} color={status === 'operational' ? 'var(--accent-green)' : 'var(--accent-gold)'} />
              <span className={`badge ${status === 'operational' ? 'badge-green' : 'badge-gold'}`}>
                {status}
              </span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>{name}</div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-primary)' }}>{uptime}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Uptime</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-primary)' }}>{requests}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Requests</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Log Terminal */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Terminal size={16} color="var(--accent-cyan)" />
            <h2 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>Live System Logs</h2>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {(['all', 'info', 'warn', 'error'] as const).map(f => (
              <button
                key={f}
                onClick={() => setLogFilter(f)}
                className={logFilter === f ? 'btn-primary' : 'btn-ghost'}
                style={{ fontSize: '11px', padding: '5px 10px', textTransform: 'capitalize' }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="terminal">
          {filtered.map((log, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '4px', flexWrap: 'wrap' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>{log.ts}</span>
              <span style={{ color: levelColor[log.level], fontWeight: '600', fontSize: '11px', textTransform: 'uppercase', width: '40px' }}>{log.level}</span>
              <span style={{ color: '#fff', fontSize: '12px', flex: 1 }}>{log.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
