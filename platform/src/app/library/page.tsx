'use client';

import { useState, useMemo } from 'react';
import { LIBRARY_AGENTS, AGENT_CATEGORIES, type AgentCategory, type LibraryAgent } from '@/data/agents-library';

const COLOR_MAP: Record<string, string> = {
  blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400',
  purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400',
  cyan: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-400',
  green: 'from-green-500/20 to-green-600/10 border-green-500/30 text-green-400',
  orange: 'from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-400',
  yellow: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30 text-yellow-400',
  pink: 'from-pink-500/20 to-pink-600/10 border-pink-500/30 text-pink-400',
  red: 'from-red-500/20 to-red-600/10 border-red-500/30 text-red-400',
};

function AgentCard({ agent }: { agent: LibraryAgent }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const cat = AGENT_CATEGORIES[agent.category];
  const colors = COLOR_MAP[cat.color] ?? COLOR_MAP.blue;

  const copyPrompt = () => {
    navigator.clipboard.writeText(agent.prompt_preview + '\n\n[Full prompt available — load into GNO Terminal]');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`glass-card border bg-gradient-to-br ${colors} p-5 rounded-2xl flex flex-col gap-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{cat.icon}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-300 font-medium">{cat.label}</span>
          </div>
          <h3 className="font-bold text-white text-sm leading-tight">{agent.name}</h3>
        </div>
        <div className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400 shrink-0">{agent.model.split('/').pop()}</div>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-xs leading-relaxed">{agent.description}</p>

      {/* Capabilities */}
      <div className="flex flex-wrap gap-1">
        {agent.capabilities.slice(0, 4).map(cap => (
          <span key={cap} className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-gray-400 border border-white/10">{cap}</span>
        ))}
        {agent.capabilities.length > 4 && (
          <span className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-gray-500">+{agent.capabilities.length - 4}</span>
        )}
      </div>

      {/* Prompt preview */}
      {expanded && (
        <div className="bg-black/40 rounded-xl p-3 border border-white/10">
          <p className="text-xs text-gray-400 font-mono leading-relaxed">{agent.prompt_preview}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 mt-auto pt-2 border-t border-white/10">
        <button onClick={() => setExpanded(!expanded)} className="flex-1 text-xs py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors">
          {expanded ? 'Hide Prompt' : 'Preview Prompt'}
        </button>
        <button onClick={copyPrompt} className="flex-1 text-xs py-1.5 px-3 rounded-lg bg-blue-600/60 hover:bg-blue-600/80 text-white transition-colors font-medium">
          {copied ? '✓ Copied!' : 'Copy Prompt'}
        </button>
      </div>
    </div>
  );
}

export default function LibraryPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | AgentCategory>('all');

  const filtered = useMemo(() => {
    return LIBRARY_AGENTS.filter(a => {
      const matchCat = activeCategory === 'all' || a.category === activeCategory;
      const matchSearch = !search || a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.description.toLowerCase().includes(search.toLowerCase()) ||
        a.tags.some(t => t.includes(search.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🤖</span>
          <h1 className="text-3xl font-black gradient-text">Supreme Agent Library</h1>
        </div>
        <p className="text-gray-400">40+ curated AI agents from aGENTYS26SUPER — programming, business, quantum, and multi-agent systems</p>
        <div className="flex gap-6 mt-4">
          {[['Total Agents', LIBRARY_AGENTS.length], ['Categories', Object.keys(AGENT_CATEGORIES).length], ['Models', '8+']].map(([label, val]) => (
            <div key={label as string}>
              <p className="text-2xl font-black text-white">{val}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search agents by name, skill, or tag…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
        />
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setActiveCategory('all')} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
          All ({LIBRARY_AGENTS.length})
        </button>
        {(Object.entries(AGENT_CATEGORIES) as [AgentCategory, typeof AGENT_CATEGORIES[AgentCategory]][]).map(([key, cat]) => {
          const count = LIBRARY_AGENTS.filter(a => a.category === key).length;
          return (
            <button key={key} onClick={() => setActiveCategory(key)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeCategory === key ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
              {cat.icon} {cat.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No agents match your search</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(agent => <AgentCard key={agent.id} agent={agent} />)}
        </div>
      )}
    </div>
  );
}
