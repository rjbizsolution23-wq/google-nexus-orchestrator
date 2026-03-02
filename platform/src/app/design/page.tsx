'use client';

import { useState } from 'react';
import { UI_STYLES, COLOR_PALETTES, FONT_PAIRINGS, INDUSTRY_RULES, type UiStyle } from '@/data/ui-styles';

type DesignTab = 'styles' | 'palettes' | 'fonts' | 'rules';

function StyleCard({ style }: { style: UiStyle }) {
  return (
    <div className="glass-card border border-white/10 bg-white/2 rounded-xl p-4 flex flex-col gap-2 hover:border-blue-500/30 hover:bg-white/5 transition-all">
      <div className="flex items-center justify-between">
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${style.category === 'general' ? 'bg-blue-600/30 text-blue-300' : style.category === 'landing' ? 'bg-green-600/30 text-green-300' : 'bg-purple-600/30 text-purple-300'}`}>
          {style.category === 'general' ? 'General' : style.category === 'landing' ? 'Landing' : 'Dashboard'}
        </span>
      </div>
      <h3 className="font-bold text-white text-sm">{style.name}</h3>
      <p className="text-xs text-gray-400">{style.description}</p>
      <p className="text-xs text-gray-500"><span className="text-gray-400">Best for:</span> {style.bestFor}</p>
      <div className="flex flex-wrap gap-1 mt-auto">
        {style.keywords.slice(0, 3).map(k => (
          <span key={k} className="text-xs px-2 py-0.5 rounded bg-white/5 text-gray-500">{k}</span>
        ))}
      </div>
    </div>
  );
}

export default function DesignPage() {
  const [tab, setTab] = useState<DesignTab>('styles');
  const [selectedIndustry, setSelectedIndustry] = useState(0);

  const tabConfig: [DesignTab, string, number][] = [
    ['styles', '🎨 UI Styles', UI_STYLES.length],
    ['palettes', '🎭 Color Palettes', COLOR_PALETTES.length],
    ['fonts', '✍️ Font Pairings', FONT_PAIRINGS.length],
    ['rules', '⚙️ Industry Rules', INDUSTRY_RULES.length],
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🎨</span>
          <h1 className="text-3xl font-black gradient-text">Design Intelligence</h1>
        </div>
        <p className="text-gray-400">UI UX Pro Max skill — 67 styles, 96 palettes, 57 font pairings, 100 industry reasoning rules</p>
        <div className="flex gap-6 mt-4">
          {[['UI Styles', '67'], ['Color Palettes', '96'], ['Font Pairings', '57'], ['Reasoning Rules', '100+']].map(([label, val]) => (
            <div key={label}>
              <p className="text-2xl font-black text-white">{val}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabConfig.map(([t, label, count]) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${tab === t ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
            {label} ({count})
          </button>
        ))}
      </div>

      {/* UI Styles Tab */}
      {tab === 'styles' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {UI_STYLES.map(s => <StyleCard key={s.id} style={s} />)}
          {/* Fill remaining to show total of 67 */}
          {Array.from({ length: Math.max(0, 67 - UI_STYLES.length) }).map((_, i) => (
            <div key={`placeholder-${i}`} className="glass-card border border-white/5 rounded-xl p-4 opacity-40">
              <p className="text-xs text-gray-600 text-center">Style #{UI_STYLES.length + i + 1}</p>
            </div>
          ))}
        </div>
      )}

      {/* Color Palettes Tab */}
      {tab === 'palettes' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {COLOR_PALETTES.map(palette => (
            <div key={palette.id} className="glass-card border border-white/10 rounded-xl p-4 flex flex-col gap-3">
              {/* Color swatches */}
              <div className="flex gap-1 rounded-lg overflow-hidden h-10">
                {[palette.primary, palette.secondary, palette.accent, palette.background, palette.text].map((color, i) => (
                  <div key={i} className="flex-1 rounded" style={{ backgroundColor: color }} title={color} />
                ))}
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">{palette.name}</h3>
                <p className="text-xs text-gray-500">{palette.industry}</p>
              </div>
              <div className="grid grid-cols-2 gap-1 text-xs">
                {[['Primary', palette.primary], ['Secondary', palette.secondary], ['Accent', palette.accent], ['BG', palette.background]].map(([label, hex]) => (
                  <div key={label} className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: hex }} />
                    <span className="text-gray-500">{label}:</span>
                    <span className="text-gray-300 font-mono">{hex}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {/* Show count for remaining */}
          <div className="glass-card border border-white/5 rounded-xl p-4 flex items-center justify-center opacity-50">
            <p className="text-gray-500 text-sm text-center">+{96 - COLOR_PALETTES.length} more palettes<br /><span className="text-xs">(full library in ui-ux-pro-max)</span></p>
          </div>
        </div>
      )}

      {/* Font Pairings Tab */}
      {tab === 'fonts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FONT_PAIRINGS.map(font => (
            <div key={font.id} className="glass-card border border-white/10 rounded-xl p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-2xl font-bold text-white" style={{ fontFamily: font.heading }}>{font.heading}</p>
                  <p className="text-base text-gray-400 mt-0.5" style={{ fontFamily: font.body }}>Body: {font.body}</p>
                </div>
              </div>
              <div className="border-t border-white/10 pt-3">
                <p className="text-xs text-gray-500"><span className="text-gray-400">Mood:</span> {font.mood}</p>
                <p className="text-xs text-gray-500 mt-1"><span className="text-gray-400">Best for:</span> {font.bestFor}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Industry Rules Tab */}
      {tab === 'rules' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Industry list */}
          <div className="space-y-2">
            {INDUSTRY_RULES.map((rule, i) => (
              <button key={rule.industry} onClick={() => setSelectedIndustry(i)} className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${selectedIndustry === i ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
                {rule.industry}
              </button>
            ))}
          </div>
          {/* Rule detail */}
          {INDUSTRY_RULES[selectedIndustry] && (
            <div className="lg:col-span-2 glass-card border border-white/10 rounded-2xl p-6 space-y-5">
              <h2 className="text-xl font-bold text-white">{INDUSTRY_RULES[selectedIndustry].industry}</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><p className="text-xs text-gray-500 mb-1">Pattern</p><p className="text-blue-300 font-semibold">{INDUSTRY_RULES[selectedIndustry].pattern}</p></div>
                <div><p className="text-xs text-gray-500 mb-1">Color Mood</p><p className="text-white">{INDUSTRY_RULES[selectedIndustry].colorMood}</p></div>
                <div><p className="text-xs text-gray-500 mb-1">Typography</p><p className="text-white">{INDUSTRY_RULES[selectedIndustry].typographyMood}</p></div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2">Style Priority</p>
                <div className="flex flex-wrap gap-2">
                  {INDUSTRY_RULES[selectedIndustry].stylePriority.map(s => (
                    <span key={s} className="text-xs px-3 py-1 rounded-full bg-blue-600/30 text-blue-300">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2">Key Effects</p>
                <ul className="space-y-1">
                  {INDUSTRY_RULES[selectedIndustry].keyEffects.map(e => (
                    <li key={e} className="text-xs text-gray-300 flex items-center gap-2">
                      <span className="text-green-400">✓</span> {e}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2">Anti-Patterns (Avoid)</p>
                <ul className="space-y-1">
                  {INDUSTRY_RULES[selectedIndustry].antiPatterns.map(e => (
                    <li key={e} className="text-xs text-red-300 flex items-center gap-2">
                      <span className="text-red-400">✗</span> {e}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
