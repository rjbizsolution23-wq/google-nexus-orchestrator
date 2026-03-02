'use client';

import { useState, useEffect } from 'react';

// ── Types ──────────────────────────────────────────────────────────
interface WorkspaceFile {
  id: string;
  name: string;
  type: 'doc' | 'sheet' | 'slide' | 'pdf' | 'folder' | 'image';
  size: string;
  modifiedAt: string;
  starred: boolean;
  owner: string;
}

interface GmailMessage {
  id: string;
  from: string;
  subject: string;
  preview: string;
  receivedAt: string;
  read: boolean;
  label: 'primary' | 'promotions' | 'updates' | 'social';
  starred: boolean;
}

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  type: 'meeting' | 'task' | 'reminder';
  attendees: number;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8787';

// ── Seed Data ──────────────────────────────────────────────────────
const SEED_FILES: WorkspaceFile[] = [
  { id: 'f1', name: 'Credit Repair Client Tracker 2026', type: 'sheet', size: '1.2 MB', modifiedAt: '2 min ago', starred: true, owner: 'Rick Jefferson' },
  { id: 'f2', name: 'MFSN Affiliate Onboarding Guide', type: 'doc', size: '845 KB', modifiedAt: '1h ago', starred: true, owner: 'Rick Jefferson' },
  { id: 'f3', name: 'GNO Architecture Overview', type: 'slide', size: '3.4 MB', modifiedAt: '3h ago', starred: false, owner: 'Rick Jefferson' },
  { id: 'f4', name: 'RJ Business Solutions Pitch Deck', type: 'slide', size: '5.1 MB', modifiedAt: 'yesterday', starred: true, owner: 'Rick Jefferson' },
  { id: 'f5', name: 'Lead Generation Reports Q1 2026', type: 'folder', size: '82 MB', modifiedAt: '2 days ago', starred: false, owner: 'Rick Jefferson' },
  { id: 'f6', name: 'NeuronEdge Labs System Prompt v3', type: 'doc', size: '220 KB', modifiedAt: '3 days ago', starred: true, owner: 'Rick Jefferson' },
  { id: 'f7', name: 'kalivibe-test-firebase-adminsdk.json', type: 'pdf', size: '4 KB', modifiedAt: 'just now', starred: false, owner: 'Rick Jefferson' },
  { id: 'f8', name: 'Credit Empire Builders — Course Assets', type: 'folder', size: '1.2 GB', modifiedAt: '1 week ago', starred: false, owner: 'Rick Jefferson' },
];

const SEED_EMAILS: GmailMessage[] = [
  { id: 'e1', from: 'stripe@stripe.com', subject: 'New payout: $4,280.00 — RJ Business Solutions', preview: 'Your payout of $4,280.00 has been initiated and will arrive in 2 days.', receivedAt: '9 min ago', read: false, label: 'primary', starred: true },
  { id: 'e2', from: 'noreply@myfreescorenow.com', subject: 'Commission alert — 14 new enrollments today', preview: 'Congratulations! 14 new members enrolled using your affiliate link PID 49914.', receivedAt: '32 min ago', read: false, label: 'primary', starred: true },
  { id: 'e3', from: 'rick@skool.com', subject: 'Credit Empire Builders — 3 new members joined', preview: 'Your community group just reached a new milestone. 3 members joined today.', receivedAt: '1h ago', read: true, label: 'updates', starred: false },
  { id: 'e4', from: 'twilio@notifications.com', subject: 'Inbound call missed — +12053087452', preview: 'You missed an inbound call to +18667524618 from +12053087452 at 2:14 PM.', receivedAt: '2h ago', read: true, label: 'primary', starred: false },
  { id: 'e5', from: 'github@noreply.github.com', subject: '[google-nexus-orchestrator] Build passed ✓', preview: 'Your push to main just passed CI. 32 files changed, 10,179 insertions.', receivedAt: '3h ago', read: true, label: 'updates', starred: false },
  { id: 'e6', from: 'cloudflare@notify.cloudflare.com', subject: 'Workers usage — 48,200 requests today', preview: 'Your Cloudflare Workers handled 48,200 requests today with 99.7% success rate.', receivedAt: '4h ago', read: true, label: 'updates', starred: false },
];

const SEED_EVENTS: CalendarEvent[] = [
  { id: 'ev1', title: 'GNO System Review', start: '10:00 AM', end: '11:00 AM', type: 'meeting', attendees: 3 },
  { id: 'ev2', title: 'Credit Client Check-in Call', start: '1:00 PM', end: '1:30 PM', type: 'meeting', attendees: 2 },
  { id: 'ev3', title: 'Deploy MFSN Landing Page', start: '3:00 PM', end: '4:00 PM', type: 'task', attendees: 0 },
  { id: 'ev4', title: 'Review Lead Gen Reports', start: '5:00 PM', end: '5:30 PM', type: 'reminder', attendees: 0 },
];

const FILE_ICON: Record<WorkspaceFile['type'], string> = {
  doc: '📄', sheet: '📊', slide: '📑', pdf: '📋', folder: '📁', image: '🖼️',
};

const LABEL_COLOR: Record<GmailMessage['label'], string> = {
  primary: 'text-blue-300 bg-blue-600/20',
  updates: 'text-green-300 bg-green-600/20',
  promotions: 'text-yellow-300 bg-yellow-600/20',
  social: 'text-purple-300 bg-purple-600/20',
};

const EVENT_COLOR: Record<CalendarEvent['type'], string> = {
  meeting: 'border-blue-500/60 bg-blue-500/10',
  task: 'border-green-500/60 bg-green-500/10',
  reminder: 'border-yellow-500/60 bg-yellow-500/10',
};

type WorkspaceTab = 'drive' | 'gmail' | 'calendar' | 'sheets';

export default function WorkspacePage() {
  const [tab, setTab] = useState<WorkspaceTab>('drive');
  const [files, setFiles] = useState<WorkspaceFile[]>(SEED_FILES);
  const [emails, setEmails] = useState<GmailMessage[]>(SEED_EMAILS);
  const [events] = useState<CalendarEvent[]>(SEED_EVENTS);
  const [search, setSearch] = useState('');
  const [connected, setConnected] = useState({ gmail: true, drive: true, sheets: true, calendar: false });
  const [toast, setToast] = useState<string | null>(null);
  const [storageGb] = useState(4.2);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  // Fetch workspace status from backend
  useEffect(() => {
    fetch(`${API_BASE}/api/workspace/status`)
      .then(r => r.json())
      .then((data: { gmail?: { connected: boolean }; drive?: { connected: boolean }; sheets?: { connected: boolean }; calendar?: { connected: boolean } }) => {
        setConnected({
          gmail: data.gmail?.connected ?? true,
          drive: data.drive?.connected ?? true,
          sheets: data.sheets?.connected ?? true,
          calendar: data.calendar?.connected ?? false,
        });
      })
      .catch(() => {/* use defaults */});
  }, []);

  // ── Drive handlers ──────────────────────────────────────────────
  const toggleStar = (id: string) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, starred: !f.starred } : f));
  };

  const deleteFile = async (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    showToast('🗑 File removed from workspace view');
    try { await fetch(`${API_BASE}/api/workspace/drive/${id}`, { method: 'DELETE' }); } catch { /**/ }
  };

  // ── Gmail handlers ──────────────────────────────────────────────
  const markRead = (id: string) => setEmails(prev => prev.map(e => e.id === id ? { ...e, read: true } : e));
  const toggleEmailStar = (id: string) => setEmails(prev => prev.map(e => e.id === id ? { ...e, starred: !e.starred } : e));
  const deleteEmail = (id: string) => { setEmails(prev => prev.filter(e => e.id !== id)); showToast('🗑 Email archived'); };

  const filteredFiles = files.filter(f => !search || f.name.toLowerCase().includes(search.toLowerCase()));
  const filteredEmails = emails.filter(e => !search || e.subject.toLowerCase().includes(search.toLowerCase()) || e.from.toLowerCase().includes(search.toLowerCase()));
  const unread = emails.filter(e => !e.read).length;

  const TABS: [WorkspaceTab, string, string][] = [
    ['drive', '📁 Drive', `${files.length} files`],
    ['gmail', `✉️ Gmail${unread > 0 ? ` (${unread})` : ''}`, `${emails.length} messages`],
    ['calendar', '📅 Calendar', `${events.length} today`],
    ['sheets', '📊 Sheets', 'Connected'],
  ];

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm shadow-2xl">
          {toast}
        </div>
      )}

      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <span className="text-3xl">🏢</span>
          <h1 className="text-3xl font-black gradient-text">Workspace</h1>
        </div>
        <p className="text-gray-400">Google Workspace — Drive, Gmail, Calendar, and Sheets unified command center</p>
      </div>

      {/* Service status bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {([
          ['📧 Gmail', connected.gmail, 'primary'],
          ['📁 Drive', connected.drive, `${storageGb} GB used`],
          ['📊 Sheets', connected.sheets, 'active'],
          ['📅 Calendar', connected.calendar, 'not connected'],
        ] as const).map(([label, ok, detail]) => (
          <div key={label as string} className={`glass-card border rounded-xl p-3 text-center ${ok ? 'border-green-500/20' : 'border-red-500/20'}`}>
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <div className={`w-1.5 h-1.5 rounded-full ${ok ? 'bg-green-400 animate-pulse' : 'bg-red-500'}`} />
              <span className="text-xs text-white font-semibold">{label}</span>
            </div>
            <p className={`text-xs ${ok ? 'text-green-400' : 'text-red-400'}`}>{ok ? detail : 'offline'}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {TABS.map(([t, label, detail]) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${tab === t ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
            {label}
            <span className="ml-1.5 text-xs opacity-60">{detail}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      {(tab === 'drive' || tab === 'gmail') && (
        <input type="text" placeholder={tab === 'drive' ? 'Search files…' : 'Search emails…'}
          value={search} onChange={e => setSearch(e.target.value)}
          className="w-full max-w-md bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50" />
      )}

      {/* ── DRIVE TAB ─────────────────────────────────────────── */}
      {tab === 'drive' && (
        <div className="space-y-2">
          {filteredFiles.map(file => (
            <div key={file.id} className="glass-card border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 hover:border-blue-500/20 transition-all">
              <span className="text-xl shrink-0">{FILE_ICON[file.type]}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium truncate">{file.name}</p>
                <p className="text-xs text-gray-500">{file.size} · {file.modifiedAt} · {file.owner}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => toggleStar(file.id)} title="Star" className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all hover:bg-white/10 ${file.starred ? 'text-yellow-400' : 'text-gray-600'}`}>
                  {file.starred ? '★' : '☆'}
                </button>
                <button onClick={() => showToast(`📥 Opening ${file.name}…`)} title="Open" className="w-8 h-8 rounded-lg flex items-center justify-center text-sm bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 transition-all">
                  ↗
                </button>
                <button onClick={() => deleteFile(file.id)} title="Remove" className="w-8 h-8 rounded-lg flex items-center justify-center text-sm bg-red-600/20 hover:bg-red-600/40 text-red-300 transition-all">
                  🗑
                </button>
              </div>
            </div>
          ))}
          {filteredFiles.length === 0 && <p className="text-center py-10 text-gray-500">No files found</p>}
        </div>
      )}

      {/* ── GMAIL TAB ─────────────────────────────────────────── */}
      {tab === 'gmail' && (
        <div className="space-y-2">
          {filteredEmails.map(email => (
            <div key={email.id} onClick={() => markRead(email.id)}
              className={`glass-card border rounded-xl px-4 py-3 flex items-start gap-3 cursor-pointer transition-all hover:border-blue-500/20 ${!email.read ? 'border-blue-500/20 bg-blue-500/5' : 'border-white/10'}`}>
              <div className="flex flex-col items-center gap-1 shrink-0 pt-0.5">
                <div className={`w-2 h-2 rounded-full ${!email.read ? 'bg-blue-400' : 'bg-transparent'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <span className="text-xs font-semibold text-white">{email.from}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${LABEL_COLOR[email.label]}`}>{email.label}</span>
                  <span className="text-xs text-gray-500 ml-auto">{email.receivedAt}</span>
                </div>
                <p className={`text-sm truncate ${!email.read ? 'text-white font-medium' : 'text-gray-300'}`}>{email.subject}</p>
                <p className="text-xs text-gray-500 truncate">{email.preview}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={e => { e.stopPropagation(); toggleEmailStar(email.id); }} className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm hover:bg-white/10 transition-all ${email.starred ? 'text-yellow-400' : 'text-gray-600'}`}>
                  {email.starred ? '★' : '☆'}
                </button>
                <button onClick={e => { e.stopPropagation(); deleteEmail(email.id); }} className="w-8 h-8 rounded-lg flex items-center justify-center text-sm bg-red-600/20 hover:bg-red-600/40 text-red-300 transition-all">
                  🗑
                </button>
              </div>
            </div>
          ))}
          {filteredEmails.length === 0 && <p className="text-center py-10 text-gray-500">Inbox is empty</p>}
        </div>
      )}

      {/* ── CALENDAR TAB ──────────────────────────────────────── */}
      {tab === 'calendar' && (
        <div className="space-y-3">
          <div className="glass-card border border-white/10 rounded-xl p-4">
            <p className="text-sm font-semibold text-white mb-4">Today — {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
            <div className="space-y-2">
              {events.map(event => (
                <div key={event.id} className={`border rounded-xl p-3 flex items-center gap-3 ${EVENT_COLOR[event.type]}`}>
                  <div className="text-center w-16 shrink-0">
                    <p className="text-xs text-gray-400">{event.start}</p>
                    <p className="text-xs text-gray-500">{event.end}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium">{event.title}</p>
                    <p className="text-xs text-gray-500 capitalize">{event.type}{event.attendees > 0 ? ` · ${event.attendees} attendee${event.attendees > 1 ? 's' : ''}` : ''}</p>
                  </div>
                  <span className="text-lg">{event.type === 'meeting' ? '👥' : event.type === 'task' ? '✅' : '🔔'}</span>
                </div>
              ))}
            </div>
          </div>
          {!connected.calendar && (
            <div className="glass-card border border-yellow-500/20 bg-yellow-500/5 rounded-xl p-4 text-center">
              <p className="text-yellow-300 text-sm font-semibold">📅 Google Calendar not connected</p>
              <p className="text-xs text-gray-400 mt-1">Connect via Google OAuth to see live events</p>
              <button onClick={() => showToast('OAuth connection flow coming soon')} className="mt-3 px-4 py-1.5 rounded-lg bg-yellow-600/40 text-yellow-200 text-xs hover:bg-yellow-600/60 transition-colors">
                Connect Calendar
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── SHEETS TAB ────────────────────────────────────────── */}
      {tab === 'sheets' && (
        <div className="space-y-4">
          <div className="glass-card border border-green-500/20 bg-green-500/5 rounded-xl p-5">
            <p className="text-green-300 font-semibold text-sm mb-1">📊 Google Sheets — Active Integration</p>
            <p className="text-xs text-gray-400">7 active sheets, last sync 4 minutes ago</p>
          </div>
          {[
            { name: 'Credit Repair Client Tracker 2026', rows: 342, cols: 24, updated: '4m ago' },
            { name: 'MFSN Affiliate Commission Log', rows: 1840, cols: 12, updated: '1h ago' },
            { name: 'Lead Gen Pipeline Q1 2026', rows: 2406, cols: 18, updated: '2h ago' },
            { name: 'GNO System Metrics Dashboard', rows: 48, cols: 8, updated: '5m ago' },
            { name: 'Monthly Revenue Tracker', rows: 156, cols: 14, updated: 'yesterday' },
          ].map(sheet => (
            <div key={sheet.name} className="glass-card border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 hover:border-green-500/20 transition-all">
              <span className="text-xl">📊</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium truncate">{sheet.name}</p>
                <p className="text-xs text-gray-500">{sheet.rows.toLocaleString()} rows · {sheet.cols} cols · updated {sheet.updated}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => showToast(`📊 Opening ${sheet.name}…`)} className="px-3 py-1.5 rounded-lg bg-green-600/30 hover:bg-green-600/50 text-green-300 text-xs transition-colors">Open ↗</button>
                <button onClick={() => showToast(`🤖 AI analyzing ${sheet.name}…`)} className="px-3 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 text-xs transition-colors">AI Analyze</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
