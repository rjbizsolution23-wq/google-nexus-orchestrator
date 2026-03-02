'use client';

import { useState, useMemo } from 'react';
import { NLP_PAPERS, CV_PAPERS } from '@/data/research-papers';

type Tab = 'nlp' | 'cv';

function PaperCard({ arxivId, url, pdfUrl }: { arxivId: string; url: string; pdfUrl: string }) {
  const baseId = arxivId.replace('v1', '');
  return (
    <div className="glass-card border border-white/10 bg-white/2 rounded-xl p-3 flex flex-col gap-2 hover:border-blue-500/30 hover:bg-white/5 transition-all">
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-blue-400 text-xs font-bold">{arxivId}</span>
        <div className="flex gap-1">
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-xs px-2 py-0.5 rounded bg-blue-600/30 text-blue-300 hover:bg-blue-600/50 transition-colors">
            Abstract
          </a>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-xs px-2 py-0.5 rounded bg-purple-600/30 text-purple-300 hover:bg-purple-600/50 transition-colors">
            PDF
          </a>
        </div>
      </div>
      <p className="text-xs text-gray-500">arXiv:{baseId} [October 2025]</p>
    </div>
  );
}

export default function KnowledgePage() {
  const [tab, setTab] = useState<Tab>('nlp');
  const [search, setSearch] = useState('');

  const papers = tab === 'nlp' ? NLP_PAPERS : CV_PAPERS;

  const filtered = useMemo(() => {
    if (!search) return papers;
    return papers.filter(p => p.arxivId.includes(search));
  }, [papers, search]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🔬</span>
          <h1 className="text-3xl font-black gradient-text">Research Knowledge Base</h1>
        </div>
        <p className="text-gray-400">139 arXiv research papers (October 2025) — NLP and Computer Vision cutting-edge research</p>
        <div className="flex gap-6 mt-4">
          {[['Total Papers', '139'], ['NLP Papers', '69'], ['CV Papers', '70'], ['Source', 'arXiv Oct 2025']].map(([label, val]) => (
            <div key={label}>
              <p className={`text-2xl font-black ${val === 'arXiv Oct 2025' ? 'text-blue-400 text-base' : 'text-white'}`}>{val}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {([['nlp', '🧠 Natural Language Processing', NLP_PAPERS.length], ['cv', '👁️ Computer Vision', CV_PAPERS.length]] as const).map(([t, label, count]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === t ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
          >
            {label} ({count})
          </button>
        ))}
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by arXiv ID (e.g. 2510.14885)…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full max-w-md bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
      />

      {/* Info banner */}
      <div className="glass-card border border-blue-500/20 bg-blue-500/5 rounded-xl p-4 flex gap-3 items-start">
        <span className="text-blue-400 text-lg shrink-0">ℹ️</span>
        <div>
          <p className="text-sm text-blue-300 font-semibold mb-1">
            {tab === 'nlp' ? 'Natural Language Processing Papers' : 'Computer Vision Papers'} — October 2025
          </p>
          <p className="text-xs text-gray-400">
            These papers were collected from arXiv in October 2025 and stored locally at{' '}
            <code className="text-blue-300 bg-blue-900/20 px-1 rounded">
              {tab === 'nlp' ? 'Natural_Language_Processing/pdfs/' : 'Computer_Vision/pdfs/'}
            </code>.
            Click <strong>Abstract</strong> to view on arXiv or <strong>PDF</strong> for direct download.
          </p>
        </div>
      </div>

      {/* Paper grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-400">Showing {filtered.length} of {papers.length} papers</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map(paper => (
            <PaperCard key={paper.id} arxivId={paper.arxivId} url={paper.url} pdfUrl={paper.pdfUrl} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center py-12 text-gray-500">No papers match that ID</p>
        )}
      </div>

      {/* Explore more */}
      <div className="glass-card border border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">Explore More Research</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            ['arXiv NLP', 'https://arxiv.org/list/cs.CL/recent', '🧠'],
            ['arXiv CV', 'https://arxiv.org/list/cs.CV/recent', '👁️'],
            ['Papers w/ Code NLP', 'https://paperswithcode.com/area/natural-language-processing', '💻'],
            ['Papers w/ Code CV', 'https://paperswithcode.com/area/computer-vision', '🖼️'],
          ].map(([label, url, icon]) => (
            <a key={label} href={url as string} target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 hover:bg-white/8 transition-all text-center">
              <span className="text-2xl">{icon}</span>
              <span className="text-xs text-gray-300 font-medium">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
