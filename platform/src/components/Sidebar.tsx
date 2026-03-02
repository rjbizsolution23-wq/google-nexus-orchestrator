'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Bot,
  Cpu,
  Globe,
  Database,
  Settings,
  Activity,
  ChevronLeft,
  Zap,
  Search,
  BookOpen,
  FlaskConical,
  TrendingUp,
  Palette,
  Microscope
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard', group: 'core' },
  { href: '/agents', icon: Bot, label: 'AI Agents', group: 'core' },
  { href: '/orchestrator', icon: Cpu, label: 'Orchestrator', group: 'core' },
  { href: '/workspace', icon: Globe, label: 'Workspace', group: 'core' },
  { href: '/data', icon: Database, label: 'Data Layer', group: 'core' },
  { href: '/monitor', icon: Activity, label: 'Monitor', group: 'core' },
  { href: '/settings', icon: Settings, label: 'Settings', group: 'core' },
  // Google System 2026 integration
  { href: '/library', icon: BookOpen, label: 'Agent Library', group: 'knowledge' },
  { href: '/knowledge', icon: FlaskConical, label: 'Knowledge Base', group: 'knowledge' },
  { href: '/seo', icon: TrendingUp, label: 'SEO Center', group: 'knowledge' },
  { href: '/design', icon: Palette, label: 'Design Intelligence', group: 'knowledge' },
  { href: '/research', icon: Microscope, label: 'Research Hub', group: 'knowledge' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className="sidebar"
      style={{ width: collapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)' }}
    >
      {/* Logo */}
      <div style={{
        padding: '20px 16px 12px',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '72px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0,
            background: 'var(--gradient-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(79, 142, 247, 0.4)'
          }}>
            <Zap size={20} color="#fff" />
          </div>
          {!collapsed && (
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', lineHeight: 1.2 }}>
                GNO
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Nexus Orchestrator
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-muted)', padding: '4px', borderRadius: '6px',
            display: 'flex', transition: 'color 0.2s',
            flexShrink: 0
          }}
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          <ChevronLeft size={16} style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
        </button>
      </div>

      {/* Search */}
      {!collapsed && (
        <div style={{ padding: '12px 16px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              className="input-field"
              placeholder="Search..."
              style={{ paddingLeft: '32px', fontSize: '13px', padding: '8px 12px 8px 32px' }}
            />
          </div>
        </div>
      )}

      {/* Nav */}
      <nav style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>
        {/* Core navigation */}
        {!collapsed && (
          <div style={{ padding: '4px 24px 8px', fontSize: '10px', fontWeight: '600', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Navigation
          </div>
        )}
        {navItems.filter(n => n.group === 'core').map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} className={`sidebar-link ${active ? 'active' : ''}`} title={collapsed ? label : ''}>
              <Icon size={18} style={{ flexShrink: 0 }} />
              {!collapsed && <span>{label}</span>}
              {!collapsed && active && (
                <div style={{
                  marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%',
                  background: 'var(--accent-blue)', flexShrink: 0
                }} />
              )}
            </Link>
          );
        })}

        {/* Knowledge section */}
        {!collapsed && (
          <div style={{ padding: '12px 24px 8px', fontSize: '10px', fontWeight: '600', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '8px', borderTop: '1px solid var(--border-subtle)' }}>
            Google System 2026
          </div>
        )}
        {collapsed && <div style={{ margin: '8px 16px', borderTop: '1px solid var(--border-subtle)' }} />}
        {navItems.filter(n => n.group === 'knowledge').map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} className={`sidebar-link ${active ? 'active' : ''}`} title={collapsed ? label : ''}>
              <Icon size={18} style={{ flexShrink: 0, color: active ? 'var(--accent-blue)' : 'var(--accent-purple)' }} />
              {!collapsed && <span>{label}</span>}
              {!collapsed && active && (
                <div style={{
                  marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%',
                  background: 'var(--accent-blue)', flexShrink: 0
                }} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid var(--border-subtle)',
      }}>
        {!collapsed ? (
          <div style={{
            background: 'rgba(79, 142, 247, 0.08)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            padding: '12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <img
                src="https://storage.googleapis.com/msgsndr/qQnxRHDtyx0uydPd5sRl/media/67eb83c5e519ed689430646b.jpeg"
                alt="RJ Business Solutions"
                style={{ width: '32px', height: '32px', borderRadius: '8px', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>Rick Jefferson</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Admin</div>
              </div>
            </div>
            <div className="badge badge-green" style={{ fontSize: '10px' }}>
              <div className="pulse-dot" style={{ background: 'var(--accent-green)', width: '6px', height: '6px' }} />
              System Online
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src="https://storage.googleapis.com/msgsndr/qQnxRHDtyx0uydPd5sRl/media/67eb83c5e519ed689430646b.jpeg"
              alt="RJ"
              style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover' }}
            />
          </div>
        )}
      </div>
    </aside>
  );
}
