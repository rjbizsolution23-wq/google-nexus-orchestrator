export interface UiStyle {
  id: string;
  name: string;
  category: 'general' | 'landing' | 'dashboard';
  bestFor: string;
  description: string;
  keywords: string[];
  antiPatterns?: string[];
}

export interface ColorPalette {
  id: string;
  name: string;
  industry: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface FontPairing {
  id: string;
  heading: string;
  body: string;
  mood: string;
  bestFor: string;
}

export interface IndustryRule {
  industry: string;
  pattern: string;
  stylePriority: string[];
  colorMood: string;
  typographyMood: string;
  keyEffects: string[];
  antiPatterns: string[];
}

export const UI_STYLES: UiStyle[] = [
  // General Styles
  { id: 'minimalism', name: 'Minimalism & Swiss Style', category: 'general', bestFor: 'Enterprise apps, dashboards, documentation', description: 'Clean, structured, maximum whitespace with purpose-driven typography.', keywords: ['clean', 'structured', 'whitespace', 'purpose'], antiPatterns: ['decorative elements', 'gradients'] },
  { id: 'neumorphism', name: 'Neumorphism', category: 'general', bestFor: 'Health/wellness apps, meditation platforms', description: 'Soft, extruded UI elements that feel physically touchable.', keywords: ['soft', 'shadows', 'depth', 'tactile'] },
  { id: 'glassmorphism', name: 'Glassmorphism', category: 'general', bestFor: 'Modern SaaS, financial dashboards', description: 'Frosted glass panels with backdrop blur and subtle borders.', keywords: ['glass', 'blur', 'transparent', 'layered'] },
  { id: 'brutalism', name: 'Brutalism', category: 'general', bestFor: 'Design portfolios, artistic projects', description: 'Raw, intentionally rough layouts with bold typography and stark contrast.', keywords: ['raw', 'bold', 'stark', 'unconventional'] },
  { id: '3d-hyperrealism', name: '3D & Hyperrealism', category: 'general', bestFor: 'Gaming, product showcase, immersive', description: 'Three-dimensional objects, depth, and photorealistic rendering.', keywords: ['3d', 'depth', 'photorealistic', 'immersive'] },
  { id: 'vibrant-block', name: 'Vibrant & Block-based', category: 'general', bestFor: 'Startups, creative agencies, gaming', description: 'High-energy color blocks with bold sections and energetic spacing.', keywords: ['vibrant', 'colorful', 'energetic', 'bold'] },
  { id: 'dark-oled', name: 'Dark Mode (OLED)', category: 'general', bestFor: 'Night-mode apps, coding platforms', description: 'True black backgrounds with neon accents optimized for OLED screens.', keywords: ['dark', 'black', 'neon', 'oled'] },
  { id: 'accessible', name: 'Accessible & Ethical', category: 'general', bestFor: 'Government, healthcare, education', description: 'WCAG AAA compliant with high contrast, clear focus states, and reduced motion.', keywords: ['accessible', 'wcag', 'inclusive', 'contrast'] },
  { id: 'claymorphism', name: 'Claymorphism', category: 'general', bestFor: 'Educational apps, children\'s apps, SaaS', description: 'Puffy, clay-like 3D elements with rounded forms and pastel colors.', keywords: ['clay', 'puffy', 'rounded', 'playful'] },
  { id: 'aurora-ui', name: 'Aurora UI', category: 'general', bestFor: 'Modern SaaS, creative agencies', description: 'Dynamic aurora borealis gradients with dark backgrounds and fluid animations.', keywords: ['aurora', 'gradient', 'fluid', 'dynamic'] },
  { id: 'retro-futurism', name: 'Retro-Futurism', category: 'general', bestFor: 'Gaming, entertainment, music platforms', description: 'Sci-fi aesthetics blended with vintage nostalgia — CRT effects, scanlines.', keywords: ['retro', 'sci-fi', 'crt', 'nostalgic'] },
  { id: 'flat-design', name: 'Flat Design', category: 'general', bestFor: 'Web apps, mobile apps, startup MVPs', description: 'Two-dimensional elements without shadows or gradients, relying on color.', keywords: ['flat', '2d', 'clean', 'simple'] },
  { id: 'liquid-glass', name: 'Liquid Glass', category: 'general', bestFor: 'Premium SaaS, high-end e-commerce', description: 'Fluid glass morphology with dynamic light refraction and organic shapes.', keywords: ['liquid', 'glass', 'premium', 'organic'] },
  { id: 'motion-driven', name: 'Motion-Driven', category: 'general', bestFor: 'Portfolio sites, storytelling platforms', description: 'Animation as primary navigation — scroll-triggered, view transitions.', keywords: ['animation', 'motion', 'scroll', 'transitions'] },
  { id: 'micro-interactions', name: 'Micro-interactions', category: 'general', bestFor: 'Mobile apps, touchscreen UIs', description: 'Subtle, purposeful animations on every interactive element.', keywords: ['micro', 'hover', 'feedback', 'delight'] },
  { id: 'soft-ui', name: 'Soft UI Evolution', category: 'general', bestFor: 'Modern enterprise apps, SaaS', description: 'Refined neumorphism with softer shadows and more refined contrast.', keywords: ['soft', 'refined', 'enterprise', 'balanced'] },
  { id: 'neubrutalism', name: 'Neubrutalism', category: 'general', bestFor: 'Gen Z brands, startups, Figma-style', description: 'Bold borders, high contrast, flat shadows, raw typography — intentionally messy.', keywords: ['neubrutalism', 'bold', 'border', 'genz'] },
  { id: 'bento-box', name: 'Bento Box Grid', category: 'general', bestFor: 'Dashboards, product pages, portfolios', description: 'Japanese bento-inspired grid layout with varied card sizes.', keywords: ['bento', 'grid', 'cards', 'layout'] },
  { id: 'cyberpunk', name: 'Cyberpunk UI', category: 'general', bestFor: 'Gaming, tech products, crypto apps', description: 'Neon on dark, glitch effects, dystopian aesthetic, scanlines.', keywords: ['cyberpunk', 'neon', 'glitch', 'dystopian'] },
  { id: 'ai-native', name: 'AI-Native UI', category: 'general', bestFor: 'AI products, chatbots, copilots', description: 'Streaming text, thinking indicators, token counts, model badges.', keywords: ['ai', 'streaming', 'chat', 'copilot'] },
  { id: 'hud-scifi', name: 'HUD / Sci-Fi FUI', category: 'general', bestFor: 'Sci-fi games, space tech, cybersecurity', description: 'Heads-up display elements with scan lines, data overlays, holographic panels.', keywords: ['hud', 'holographic', 'scifi', 'overlay'] },
  { id: 'gradient-mesh', name: 'Gradient Mesh / Aurora Evolved', category: 'general', bestFor: 'Hero sections, backgrounds, creative', description: 'Multi-point gradient meshes creating organic, painterly backgrounds.', keywords: ['gradient', 'mesh', 'painterly', 'artistic'] },
  { id: 'editorial-grid', name: 'Editorial Grid / Magazine', category: 'general', bestFor: 'News sites, blogs, magazines', description: 'Newspaper-inspired asymmetric grids with strong editorial typography.', keywords: ['editorial', 'magazine', 'newspaper', 'type'] },
  { id: 'spatial-visionos', name: 'Spatial UI (VisionOS)', category: 'general', bestFor: 'Spatial computing apps, VR/AR', description: 'Depth-layered glass panels designed for Apple Vision Pro + AR headsets.', keywords: ['spatial', 'visionos', 'ar', 'vr', 'depth'] },
  { id: 'organic-biophilic', name: 'Organic Biophilic', category: 'general', bestFor: 'Wellness apps, sustainability brands', description: 'Nature-inspired forms, earthy colors, organic textures and flowing shapes.', keywords: ['organic', 'nature', 'biophilic', 'earthy'] },
  // Dashboard Styles
  { id: 'data-dense', name: 'Data-Dense Dashboard', category: 'dashboard', bestFor: 'Complex data analysis', description: 'Maximum information density with synchronized charts and drill-down tables.', keywords: ['data', 'density', 'charts', 'tables'] },
  { id: 'realtime-monitor', name: 'Real-Time Monitoring', category: 'dashboard', bestFor: 'Operations, DevOps', description: 'Live-updating metrics, alert states, streaming logs and WebSocket data.', keywords: ['realtime', 'monitoring', 'alerts', 'streaming'] },
  { id: 'executive-dash', name: 'Executive Dashboard', category: 'dashboard', bestFor: 'C-suite summaries', description: 'High-level KPIs, large numbers, minimal detail, board-ready presentation.', keywords: ['executive', 'kpi', 'summary', 'minimal'] },
  { id: 'financial-dash', name: 'Financial Dashboard', category: 'dashboard', bestFor: 'Finance, accounting', description: 'P&L visualization, forecast charts, account balances, expense breakdowns.', keywords: ['financial', 'pnl', 'forecast', 'accounting'] },
  // Landing Page Styles
  { id: 'hero-centric', name: 'Hero-Centric Design', category: 'landing', bestFor: 'Products with strong visual identity', description: 'Full-screen hero with dominant visual, minimal text, single strong CTA.', keywords: ['hero', 'visual', 'cta', 'fullscreen'] },
  { id: 'conversion-optimized', name: 'Conversion-Optimized', category: 'landing', bestFor: 'Lead generation, sales pages', description: 'Strategic CTA placement, social proof, urgency triggers, fear-of-missing-out.', keywords: ['conversion', 'cta', 'urgency', 'social-proof'] },
  { id: 'feature-showcase', name: 'Feature-Rich Showcase', category: 'landing', bestFor: 'SaaS, complex products', description: 'Feature grids, comparison tables, technical specs, integration showcases.', keywords: ['features', 'comparison', 'tabs', 'specs'] },
  { id: 'trust-authority', name: 'Trust & Authority', category: 'landing', bestFor: 'B2B, enterprise, consulting', description: 'Case studies, logos, certifications, testimonials, and credentials front and center.', keywords: ['trust', 'authority', 'credentials', 'b2b'] },
];

export const COLOR_PALETTES: ColorPalette[] = [
  { id: 'neural-dark', name: 'Neural Dark', industry: 'AI / SaaS', primary: '#3B82F6', secondary: '#8B5CF6', accent: '#06B6D4', background: '#050813', text: '#E2E8F0' },
  { id: 'fintech-trust', name: 'Fintech Trust', industry: 'Fintech', primary: '#1E40AF', secondary: '#0F766E', accent: '#F59E0B', background: '#0F172A', text: '#F1F5F9' },
  { id: 'health-calm', name: 'Health Calm', industry: 'Healthcare', primary: '#059669', secondary: '#0891B2', accent: '#10B981', background: '#F0FDF4', text: '#1E293B' },
  { id: 'luxury-brand', name: 'Luxury Brand', industry: 'E-commerce', primary: '#D4AF37', secondary: '#8B5E3C', accent: '#C0A060', background: '#0A0A0A', text: '#F5F0E8' },
  { id: 'credit-pro', name: 'Credit Pro', industry: 'Credit / Finance', primary: '#2563EB', secondary: '#16A34A', accent: '#F59E0B', background: '#F8FAFC', text: '#1E293B' },
  { id: 'gaming-neon', name: 'Gaming Neon', industry: 'Gaming', primary: '#A855F7', secondary: '#EC4899', accent: '#06B6D4', background: '#0D0D0D', text: '#F8FAFC' },
  { id: 'wellness-sage', name: 'Wellness Sage', industry: 'Wellness / Spa', primary: '#A8D5BA', secondary: '#E8B4B8', accent: '#D4AF37', background: '#FFF5F5', text: '#2D3436' },
  { id: 'rjbs-brand', name: 'RJ Business Solutions', industry: 'Agency', primary: '#1D4ED8', secondary: '#7C3AED', accent: '#F59E0B', background: '#050813', text: '#E2E8F0' },
  { id: 'crypto-dark', name: 'Crypto Dark', industry: 'Web3 / Crypto', primary: '#F59E0B', secondary: '#8B5CF6', accent: '#10B981', background: '#111827', text: '#F9FAFB' },
  { id: 'saas-clean', name: 'SaaS Clean', industry: 'SaaS', primary: '#6366F1', secondary: '#EC4899', accent: '#F59E0B', background: '#FFFFFF', text: '#111827' },
  { id: 'legal-trust', name: 'Legal Trust', industry: 'Legal', primary: '#1E3A5F', secondary: '#C5A028', accent: '#1E3A5F', background: '#F8F8F5', text: '#1A1A1A' },
  { id: 'real-estate', name: 'Real Estate Prime', industry: 'Real Estate', primary: '#1E40AF', secondary: '#92400E', accent: '#F59E0B', background: '#F9FAFB', text: '#111827' },
];

export const FONT_PAIRINGS: FontPairing[] = [
  { id: 'inter-inter', heading: 'Inter', body: 'Inter', mood: 'Clean, modern, professional', bestFor: 'SaaS dashboards, apps' },
  { id: 'poppins-inter', heading: 'Poppins', body: 'Inter', mood: 'Friendly, approachable, modern', bestFor: 'Startups, agencies' },
  { id: 'cormorant-montserrat', heading: 'Cormorant Garamond', body: 'Montserrat', mood: 'Elegant, luxury, sophisticated', bestFor: 'Luxury brands, wellness' },
  { id: 'playfair-lato', heading: 'Playfair Display', body: 'Lato', mood: 'Editorial, authoritative, classic', bestFor: 'News, education, law' },
  { id: 'space-grotesk-inter', heading: 'Space Grotesk', body: 'Inter', mood: 'Technical, innovative, developer', bestFor: 'Dev tools, crypto, AI' },
  { id: 'dm-serif-dm', heading: 'DM Serif Display', body: 'DM Sans', mood: 'Premium, editorial, trustworthy', bestFor: 'Finance, consulting' },
  { id: 'outfit-outfit', heading: 'Outfit', body: 'Outfit', mood: 'Modern, versatile, energetic', bestFor: 'Tech startups, mobile apps' },
  { id: 'fraunces-source', heading: 'Fraunces', body: 'Source Sans 3', mood: 'Quirky, literary, distinctive', bestFor: 'Creative agencies, portfolios' },
];

export const INDUSTRY_RULES: IndustryRule[] = [
  {
    industry: 'SaaS / Tech',
    pattern: 'Feature-Rich Showcase',
    stylePriority: ['Glassmorphism', 'AI-Native UI', 'Bento Box Grid'],
    colorMood: 'Blue-purple gradient on dark',
    typographyMood: 'Technical, modern, clean',
    keyEffects: ['Smooth transitions 200ms', 'Hover glow states', 'Animated counters'],
    antiPatterns: ['Handwritten fonts', 'Complex textures', 'Warm earthy colors'],
  },
  {
    industry: 'Fintech / Banking',
    pattern: 'Trust & Authority',
    stylePriority: ['Minimalism', 'Financial Dashboard', 'Dark Mode OLED'],
    colorMood: 'Deep navy, muted blue, gold accents',
    typographyMood: 'Trustworthy, precise, authoritative',
    keyEffects: ['Subtle animations only', 'Number counter animations', 'Clean data vis'],
    antiPatterns: ['Bright neon', 'Playful rounded fonts', 'Comic/casual imagery'],
  },
  {
    industry: 'Healthcare / Medical',
    pattern: 'Social Proof-Focused',
    stylePriority: ['Accessible & Ethical', 'Minimalism', 'Soft UI Evolution'],
    colorMood: 'Clean white, calming green, blue accents',
    typographyMood: 'Trustworthy, clear, professional',
    keyEffects: ['Reduced motion', 'High contrast mode', 'Large touch targets'],
    antiPatterns: ['Neon colors', 'Complex animations', 'Aggressive CTAs'],
  },
  {
    industry: 'Credit / Finance Services',
    pattern: 'Conversion-Optimized',
    stylePriority: ['Trust & Authority', 'Social Proof-Focused', 'Minimalism'],
    colorMood: 'Professional blue, success green, gold CTA',
    typographyMood: 'Confident, authoritative, benefit-focused',
    keyEffects: ['Score counter animations', 'Progress bars', 'Trust badge highlights'],
    antiPatterns: ['Dark/gloomy palette', 'Complex layouts', 'Excessive animations'],
  },
  {
    industry: 'Gaming',
    pattern: 'Hero-Centric Design',
    stylePriority: ['Cyberpunk UI', 'Dark Mode OLED', '3D & Hyperrealism'],
    colorMood: 'Near-black + electric purple/cyan/neon',
    typographyMood: 'Aggressive, futuristic, bold',
    keyEffects: ['Glitch effects', 'Particle systems', 'Parallax layers'],
    antiPatterns: ['Light pastels', 'Serif fonts', 'Corporate minimal'],
  },
  {
    industry: 'AI / Copilot Products',
    pattern: 'Feature-Rich Showcase',
    stylePriority: ['AI-Native UI', 'Aurora UI', 'Gradient Mesh'],
    colorMood: 'Deep space dark + aurora gradient accents',
    typographyMood: 'Modern, technical, intelligent',
    keyEffects: ['Streaming text animation', 'Thinking indicators', 'Particle orbs'],
    antiPatterns: ['Generic stock photos', 'Flat colors only', 'Heavy borders'],
  },
  {
    industry: 'Wellness / Spa',
    pattern: 'Hero-Centric + Social Proof',
    stylePriority: ['Soft UI Evolution', 'Organic Biophilic', 'Neumorphism'],
    colorMood: 'Warm cream, sage green, blush pink, gold',
    typographyMood: 'Elegant, calming, sophisticated',
    keyEffects: ['Soft shadows', 'Smooth 300ms transitions', 'Gentle hover states'],
    antiPatterns: ['Bright neon', 'Harsh animations', 'Dark mode', 'AI purple gradients'],
  },
];
