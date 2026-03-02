'use client';

import { useState } from 'react';
import { Save, Key, Cloud, Bot, Bell, Shield, Database, Eye, EyeOff } from 'lucide-react';

const tabs = ['General', 'API Keys', 'Cloudflare', 'Security', 'Notifications'] as const;
type Tab = typeof tabs[number];

function MaskInput({ value, label }: { value: string; label: string }) {
  const [show, setShow] = useState(false);
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '500' }}>{label}</label>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          className="input-field"
          type={show ? 'text' : 'password'}
          defaultValue={value}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}
        />
        <button className="btn-ghost" style={{ padding: '10px', flexShrink: 0 }} onClick={() => setShow(!show)}>
          {show ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('General');

  return (
    <div>
      {/* Header */}
      <div className="topbar">
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-primary)' }}>Settings</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>Configure GNO and connected services</p>
        </div>
        <button className="btn-primary" style={{ fontSize: '13px', padding: '8px 16px' }}>
          <Save size={14} /> Save Changes
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '24px' }}>
        {/* Sidebar Tabs */}
        <div className="glass-card" style={{ padding: '12px', height: 'fit-content' }}>
          {tabs.map(tab => {
            const icons: Record<Tab, React.ElementType> = {
              General: Bot, 'API Keys': Key, Cloudflare: Cloud, Security: Shield, Notifications: Bell
            };
            const Icon = icons[tab];
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`sidebar-link ${activeTab === tab ? 'active' : ''}`}
                style={{ width: '100%', background: 'none', border: activeTab === tab ? '1px solid rgba(79,142,247,0.15)' : '1px solid transparent', cursor: 'pointer', textAlign: 'left' }}
              >
                <Icon size={15} />
                {tab}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="glass-card" style={{ padding: '28px' }}>
          {activeTab === 'General' && (
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>General Settings</h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>Configure your GNO system identity and behaviors.</p>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '500' }}>System Name</label>
                <input className="input-field" defaultValue="Google Nexus Orchestrator" />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '500' }}>Owner</label>
                <input className="input-field" defaultValue="Rick Jefferson — RJ Business Solutions" />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '500' }}>Default AI Model</label>
                <select className="input-field" style={{ cursor: 'pointer' }}>
                  <option>gemini-2.5-pro</option>
                  <option>gemini-flash-2.0</option>
                  <option>vertex-ai-agent</option>
                </select>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '500' }}>GCP Project ID</label>
                <input className="input-field" defaultValue="Gen-lang-client-0757166967" style={{ fontFamily: 'var(--font-mono)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '500' }}>GCP Region</label>
                <select className="input-field" style={{ cursor: 'pointer' }}>
                  <option>us-central1</option>
                  <option>us-east1</option>
                  <option>europe-west1</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'API Keys' && (
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>API Keys</h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>Manage service credentials for all connected AI providers.</p>

              <MaskInput label="Google API Key" value="AIzaSyDH0BkDfE3BwEi3DCDC7LhYlHXs92OYonU" />
              <MaskInput label="OpenAI API Key" value="sk-proj-1lgcClEMdhgL6y..." />
              <MaskInput label="OpenRouter API Key" value="sk-or-v1-b9414f174..." />
              <MaskInput label="Groq API Key" value="gsk_HZEpBKbHHWv9LqIs..." />
              <MaskInput label="Perplexity API Key" value="pplx-5aY3osjZjhF..." />
              <MaskInput label="ElevenLabs API Key" value="sk_606b9b17e9f9b49c..." />
            </div>
          )}

          {activeTab === 'Cloudflare' && (
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>Cloudflare Configuration</h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>Configure Cloudflare infrastructure bindings.</p>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '500' }}>Account ID</label>
                <input className="input-field" defaultValue="58250b56ae5b45d940cd6e4b64314c01" style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '500' }}>Zone ID</label>
                <input className="input-field" defaultValue="18e1ffe3c8a6b6c965860aa0bae60357" style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }} />
              </div>
              <MaskInput label="API Token" value="zvXxjzZoiKJBlJfSjmK-v2r2dCIaLNnjq6kjLNav" />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                {[
                  { name: 'D1 Database', status: 'Connected', id: 'google-nexus-orchestrator-db' },
                  { name: 'KV Namespace', status: 'Connected', id: 'gno-cache' },
                  { name: 'R2 Bucket', status: 'Connected', id: 'gno-assets' },
                  { name: 'Workers AI', status: 'Connected', id: 'gno-ai-binding' },
                ].map(({ name, status, id }) => (
                  <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--bg-card)', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>{name}</div>
                      <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{id}</div>
                    </div>
                    <span className="badge badge-green">{status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Security' && (
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>Security</h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>Access control and security configuration.</p>
              {[
                { label: 'Enable WAF Protection', desc: 'Cloudflare WAF + DDoS shield', checked: true },
                { label: 'Require Auth on Dashboard', desc: 'All dashboard routes require login', checked: true },
                { label: 'Rate Limit API Calls', desc: '1000 req/min per IP', checked: true },
                { label: 'Log All Agent Actions', desc: 'Full audit trail in D1', checked: true },
                { label: 'Auto-rotate KV Secrets', desc: 'Rotate credentials every 30 days', checked: false },
              ].map(({ label, desc, checked }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>{label}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{desc}</div>
                  </div>
                  <div style={{
                    width: '44px', height: '24px', borderRadius: '99px',
                    background: checked ? 'var(--accent-blue)' : 'var(--border-subtle)',
                    cursor: 'pointer', position: 'relative', transition: 'background 0.2s'
                  }}>
                    <div style={{
                      position: 'absolute', top: '3px', width: '18px', height: '18px',
                      borderRadius: '50%', background: '#fff', transition: 'left 0.2s',
                      left: checked ? '23px' : '3px'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Notifications' && (
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>Notifications</h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>Configure alerts and notification channels.</p>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '500' }}>Alert Email</label>
                <input className="input-field" defaultValue="rjbizsolution23@gmail.com" />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '500' }}>Twilio Phone (SMS)</label>
                <input className="input-field" defaultValue="+18667524618" style={{ fontFamily: 'var(--font-mono)' }} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '500' }}>Telegram Bot</label>
                <input className="input-field" defaultValue="@jukeymanbot" style={{ fontFamily: 'var(--font-mono)' }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
