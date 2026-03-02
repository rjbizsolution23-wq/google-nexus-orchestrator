'use client';

import { useState } from 'react';
import { SEO_AGENTS } from '@/data/seo-agents';

const PHASE_COLORS: Record<number, string> = {
  1: 'bg-blue-500',
  2: 'bg-purple-500',
  3: 'bg-green-500',
  4: 'bg-yellow-500',
};

const COLOR_BORDER: Record<string, string> = {
  blue: 'border-blue-500/40 from-blue-500/10',
  purple: 'border-purple-500/40 from-purple-500/10',
  green: 'border-green-500/40 from-green-500/10',
  yellow: 'border-yellow-500/40 from-yellow-500/10',
  orange: 'border-orange-500/40 from-orange-500/10',
  cyan: 'border-cyan-500/40 from-cyan-500/10',
  red: 'border-red-500/40 from-red-500/10',
};

export default function SeoPage() {
  const [running, setRunning] = useState<string | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const runAgent = (id: string) => {
    setRunning(id);
    setTimeout(() => {
      setRunning(null);
      setCompleted(prev => new Set([...prev, id]));
    }, 3000);
  };

  const phases = [1, 2, 3, 4];
  const phaseAgents = SEO_AGENTS.filter(a => a.phase !== null);
  const standaloneAgents = SEO_AGENTS.filter(a => a.phase === null);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🔍</span>
          <h1 className="text-3xl font-black gradient-text">SEO Command Center</h1>
        </div>
        <p className="text-gray-400">7 autonomous TypeScript SEO agents — from E-E-A-T authority to real-time rank monitoring</p>
        <div className="flex gap-6 mt-4">
          {[['Total Agents', '7'], ['Phases', '4'], ['Status', 'All Active']].map(([label, val]) => (
            <div key={label}>
              <p className="text-2xl font-black text-white">{val}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Phase progress tracker */}
      <div className="glass-card p-5 rounded-2xl border border-white/10">
        <h2 className="text-sm font-semibold text-gray-300 mb-4">SEO Domination Phases</h2>
        <div className="flex items-center gap-0">
          {phases.map((phase, i) => {
            const agent = phaseAgents.find(a => a.phase === phase);
            const done = agent && completed.has(agent.id);
            return (
              <div key={phase} className="flex items-center flex-1">
                <div className={`flex flex-col items-center flex-1`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${done ? 'bg-green-500 border-green-400 text-white' : PHASE_COLORS[phase] ? `${PHASE_COLORS[phase]}/20 border-current text-white` : 'bg-white/5 border-white/20 text-gray-400'}`}>
                    {done ? '✓' : phase}
                  </div>
                  <span className="text-xs text-gray-500 mt-1 text-center leading-tight max-w-[70px]">Phase {phase}</span>
                </div>
                {i < phases.length - 1 && <div className={`h-0.5 flex-1 mx-1 ${done ? 'bg-green-500' : 'bg-white/10'}`} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Phase-based agents */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Phased SEO Rollout</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {phaseAgents.map(agent => {
            const colors = COLOR_BORDER[agent.color] ?? COLOR_BORDER.blue;
            const isRunning = running === agent.id;
            const isDone = completed.has(agent.id);
            return (
              <div key={agent.id} className={`glass-card border bg-gradient-to-br ${colors} to-transparent p-5 rounded-2xl flex flex-col gap-4`}>
                {/* Badge row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{agent.icon}</span>
                    {agent.phase && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold text-white ${PHASE_COLORS[agent.phase]}`}>
                        Phase {agent.phase}
                      </span>
                    )}
                  </div>
                  <div className={`w-2 h-2 rounded-full ${isDone ? 'bg-green-400 animate-pulse' : isRunning ? 'bg-yellow-400 animate-pulse' : 'bg-gray-600'}`} />
                </div>

                <div>
                  <h3 className="font-bold text-white mb-1">{agent.name}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{agent.description}</p>
                </div>

                {/* Capabilities list */}
                <ul className="space-y-1">
                  {agent.capabilities.map(cap => (
                    <li key={cap} className="text-xs text-gray-400 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-blue-400 shrink-0" />
                      {cap}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => runAgent(agent.id)}
                  disabled={isRunning}
                  className={`mt-auto py-2 px-4 rounded-xl text-sm font-semibold transition-all ${
                    isDone ? 'bg-green-600/60 text-green-100 cursor-default' : isRunning ? 'bg-yellow-600/60 text-yellow-100 cursor-wait' : 'bg-blue-600/70 hover:bg-blue-600 text-white'
                  }`}
                >
                  {isDone ? '✓ Complete' : isRunning ? '⚙️ Running…' : `▶ Run Agent`}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Standalone agents */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Standalone SEO Engines</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {standaloneAgents.map(agent => {
            const colors = COLOR_BORDER[agent.color] ?? COLOR_BORDER.blue;
            const isRunning = running === agent.id;
            const isDone = completed.has(agent.id);
            return (
              <div key={agent.id} className={`glass-card border bg-gradient-to-br ${colors} to-transparent p-5 rounded-2xl flex flex-col gap-3`}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{agent.icon}</span>
                  <div className={`w-1.5 h-1.5 rounded-full ml-auto ${isDone ? 'bg-green-400' : isRunning ? 'bg-yellow-400 animate-pulse' : 'bg-gray-600'}`} />
                </div>
                <h3 className="font-bold text-white text-sm">{agent.name}</h3>
                <p className="text-xs text-gray-300 leading-relaxed">{agent.description}</p>
                <div className="flex flex-wrap gap-1 mt-auto">
                  {agent.capabilities.slice(0, 3).map(cap => (
                    <span key={cap} className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-gray-500">{cap}</span>
                  ))}
                </div>
                <button onClick={() => runAgent(agent.id)} disabled={isRunning} className={`py-2 rounded-xl text-sm font-semibold transition-all ${isDone ? 'bg-green-600/60 text-green-100' : isRunning ? 'bg-yellow-600/60 text-yellow-100' : 'bg-blue-600/70 hover:bg-blue-600 text-white'}`}>
                  {isDone ? '✓ Complete' : isRunning ? '⚙️ Running…' : '▶ Run'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
