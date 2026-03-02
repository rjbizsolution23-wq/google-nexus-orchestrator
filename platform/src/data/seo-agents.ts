export interface SeoAgent {
  id: string;
  name: string;
  phase: number | null;
  description: string;
  capabilities: string[];
  sourceFile: string;
  status: 'active' | 'ready' | 'beta';
  color: string;
  icon: string;
}

export const SEO_AGENTS: SeoAgent[] = [
  {
    id: 'eeat-authority',
    name: 'E-E-A-T Authority System',
    phase: 1,
    description:
      'Builds Experience, Expertise, Authoritativeness, and Trustworthiness signals across your entire web presence. Automates author profiles, schema markup, expert content, and Google\'s quality rater signals.',
    capabilities: [
      'Author schema markup automation',
      'Expert content generation',
      'Trust signals & credentials',
      'Google Quality Rater alignment',
      'Entity building (Knowledge Panel)',
      'First-party data collection',
      'Core Web Vitals optimization',
    ],
    sourceFile: '# 🔥 PHASE 1 E-E-A-T AUTHORITY SYSTEM —.ts',
    status: 'active',
    color: 'blue',
    icon: '🏛️',
  },
  {
    id: 'link-building',
    name: 'Advanced Link Building Automation',
    phase: 2,
    description:
      'Executes automated link prospecting, outreach sequences, and backlink acquisition at scale. Builds domain authority through white-hat link networks and HARO-style authority mentions.',
    capabilities: [
      'Automated outreach sequences',
      'Link prospect discovery',
      'HARO / journalist pitching',
      'Broken link building',
      'Digital PR campaigns',
      'Anchor text optimization',
      'Toxic link disavow automation',
    ],
    sourceFile: '# 🔥 PHASE 2 ADVANCED LINK BUILDING AUT.ts',
    status: 'active',
    color: 'purple',
    icon: '🔗',
  },
  {
    id: 'international-seo',
    name: 'International SEO Domination',
    phase: 3,
    description:
      'Expands your SEO presence globally with hreflang automation, multi-region content strategy, local SERPs domination, and currency/language adaptation for 150+ countries.',
    capabilities: [
      'Hreflang tag automation',
      'Multi-language content generation',
      'Local SERP domination',
      'Google My Business optimization',
      'Local citation building',
      'Currency & cultural adaptation',
      'Country-specific schema markup',
    ],
    sourceFile: '# 🔥 PHASE 3 INTERNATIONAL SEO DOMINATI.ts',
    status: 'active',
    color: 'green',
    icon: '🌍',
  },
  {
    id: 'voice-search',
    name: 'Voice Search & AI Assistant Optimization',
    phase: 4,
    description:
      'Optimizes your content for voice search, AI assistants (ChatGPT, Gemini, Perplexity), featured snippets, and zero-click results. Future-proofs your SEO for the AI-powered search era.',
    capabilities: [
      'Featured snippet optimization',
      'Conversational keyword targeting',
      'FAQ schema automation',
      'AI answer engine optimization',
      'Voice search structured data',
      'Zero-click result strategy',
      'Perplexity / ChatGPT visibility',
    ],
    sourceFile: '# 🔥 PHASE 4 VOICE SEARCH & AI ASSISTAN.ts',
    status: 'active',
    color: 'yellow',
    icon: '🎙️',
  },
  {
    id: 'blog-domination',
    name: 'Supreme Blog Domination Engine',
    phase: null,
    description:
      'Full-lifecycle blog SEO engine — keyword research, content brief generation, long-form writing, internal linking, and publish scheduling to achieve #1 rankings on competitive keywords.',
    capabilities: [
      'Keyword clustering & mapping',
      'Content brief generation',
      'Long-form AI content (3K-10K words)',
      'Internal link optimization',
      'Publish schedule automation',
      'Featured image generation',
      'Blog analytics & iteration',
    ],
    sourceFile: '# 🔥 SUPREME BLOG DOMINATION ENGINE — FU.ts',
    status: 'active',
    color: 'orange',
    icon: '✍️',
  },
  {
    id: 'fullsite-seo',
    name: 'Full-Site SEO + LLM SEO Orchestrator',
    phase: null,
    description:
      'Complete site audit + LLM visibility orchestrator. Analyzes 200+ technical SEO signals, fixes crawl issues, optimizes Core Web Vitals, and ensures your brand appears in AI-generated answers.',
    capabilities: [
      '200+ technical SEO checks',
      'Core Web Vitals audit & fix',
      'Crawl budget optimization',
      'LLM answer engine visibility',
      'Competitor gap analysis',
      'Schema.org full implementation',
      'Site architecture optimization',
    ],
    sourceFile: '# 🔥 SUPREME FULL-SITE SEO + LLM SEO ORC.ts',
    status: 'active',
    color: 'cyan',
    icon: '🕸️',
  },
  {
    id: 'realtime-seo',
    name: 'Supreme Real-Time SEO Agent',
    phase: null,
    description:
      'Autonomous real-time SEO monitoring agent. Detects ranking drops, algorithm updates, competitor movements, and technical errors — then applies fixes automatically within minutes.',
    capabilities: [
      'Real-time rank tracking',
      'Algorithm update detection',
      'Competitor movement alerts',
      'Auto-fix technical errors',
      'SERP feature monitoring',
      'Traffic anomaly detection',
      'Automated reporting',
    ],
    sourceFile: '# 🔥 SUPREME REAL-TIME SEO AGENT — AUTON.ts',
    status: 'active',
    color: 'red',
    icon: '⚡',
  },
];
