'use client';

import { useState } from 'react';

export default function ResearchPage() {
  const PLATFORMS = [
    {
      name: 'arXiv',
      description: '2.4M+ research papers across CS, ML, CV, NLP, Robotics',
      url: 'https://arxiv.org',
      icon: '📄',
      color: 'from-red-500/10 border-red-500/30',
      links: [
        { label: 'ML Papers (cs.LG)', url: 'https://arxiv.org/list/cs.LG/recent' },
        { label: 'CV Papers (cs.CV)', url: 'https://arxiv.org/list/cs.CV/recent' },
        { label: 'NLP Papers (cs.CL)', url: 'https://arxiv.org/list/cs.CL/recent' },
        { label: 'AI Papers (cs.AI)', url: 'https://arxiv.org/list/cs.AI/recent' },
      ],
      code: `import arxiv\n\nsearch = arxiv.Search(\n    query="transformer attention",\n    max_results=10,\n    sort_by=arxiv.SortCriterion.SubmittedDate\n)\nfor result in search.results():\n    print(result.title, result.pdf_url)`,
    },
    {
      name: 'Papers with Code',
      description: 'Research papers + implementations + SOTA benchmarks',
      url: 'https://paperswithcode.com',
      icon: '💻',
      color: 'from-blue-500/10 border-blue-500/30',
      links: [
        { label: 'NLP Tasks', url: 'https://paperswithcode.com/area/natural-language-processing' },
        { label: 'CV Tasks', url: 'https://paperswithcode.com/area/computer-vision' },
        { label: 'SOTA Leaderboards', url: 'https://paperswithcode.com/sota' },
        { label: 'Datasets', url: 'https://paperswithcode.com/datasets' },
      ],
      code: `# Key datasets\n# ImageNet: paperswithcode.com/dataset/imagenet\n# COCO: paperswithcode.com/dataset/coco\n# CIFAR-10: paperswithcode.com/dataset/cifar-10\n# SQuAD: paperswithcode.com/dataset/squad`,
    },
    {
      name: 'Hugging Face',
      description: '500K+ models, 10K+ datasets, Spaces demos',
      url: 'https://huggingface.co',
      icon: '🤗',
      color: 'from-yellow-500/10 border-yellow-500/30',
      links: [
        { label: 'Models Hub', url: 'https://huggingface.co/models' },
        { label: 'Datasets', url: 'https://huggingface.co/datasets' },
        { label: 'Spaces', url: 'https://huggingface.co/spaces' },
        { label: 'Trending', url: 'https://huggingface.co/models?sort=trending' },
      ],
      code: `from transformers import pipeline, AutoModel\nfrom datasets import load_dataset\n\n# Load model\nclassifier = pipeline("sentiment-analysis")\n\n# Load dataset\ndataset = load_dataset("squad")\ntrain = dataset['train']`,
    },
    {
      name: 'Kaggle',
      description: '50K+ datasets, ML competitions, notebooks',
      url: 'https://kaggle.com',
      icon: '🏅',
      color: 'from-cyan-500/10 border-cyan-500/30',
      links: [
        { label: 'All Datasets', url: 'https://www.kaggle.com/datasets' },
        { label: 'Competitions', url: 'https://www.kaggle.com/competitions' },
        { label: 'Notebooks', url: 'https://www.kaggle.com/notebooks' },
        { label: 'Trending', url: 'https://www.kaggle.com/datasets?sort=hotness' },
      ],
      code: `# CLI Setup\npip install kaggle\n\n# Download dataset\nkaggle datasets download -d username/dataset-name\n\n# Download competition\nkaggle competitions download -c competition-name`,
    },
    {
      name: 'GitHub AI/ML Repos',
      description: '100M+ repositories — focus on top AI/ML implementations',
      url: 'https://github.com/trending',
      icon: '🐙',
      color: 'from-purple-500/10 border-purple-500/30',
      links: [
        { label: 'Trending Python', url: 'https://github.com/trending/python' },
        { label: 'Awesome ML', url: 'https://github.com/josephmisiti/awesome-machine-learning' },
        { label: 'Awesome CV', url: 'https://github.com/jbhuang0604/awesome-computer-vision' },
        { label: 'Trending TS', url: 'https://github.com/trending/typescript' },
      ],
      code: `import requests\n\nurl = "https://api.github.com/search/repositories"\nparams = {"q": "machine learning", "sort": "stars"}\nresponse = requests.get(url, params=params)\nrepos = response.json()['items'][:10]`,
    },
    {
      name: 'Semantic Scholar',
      description: '200M+ academic papers with citations and semantic search',
      url: 'https://www.semanticscholar.org',
      icon: '🔬',
      color: 'from-green-500/10 border-green-500/30',
      links: [
        { label: 'Paper Search', url: 'https://www.semanticscholar.org/search' },
        { label: 'API Docs', url: 'https://api.semanticscholar.org/api-docs/' },
        { label: 'Influential Papers', url: 'https://www.semanticscholar.org' },
      ],
      code: `import requests\n\nurl = "https://api.semanticscholar.org/graph/v1/paper/search"\nparams = {\n    "query": "transformer architecture",\n    "limit": 10,\n    "fields": "title,authors,year,abstract"\n}\npapers = requests.get(url, params=params).json()`,
    },
  ];

  const TOP_REPOS = [
    { name: 'LLaMA', url: 'https://github.com/facebookresearch/llama', desc: 'Meta\'s flagship LLM', stars: '60K+' },
    { name: 'Segment Anything (SAM)', url: 'https://github.com/facebookresearch/segment-anything', desc: 'Universal image segmentation', stars: '48K+' },
    { name: 'YOLO (Ultralytics)', url: 'https://github.com/ultralytics/ultralytics', desc: 'Real-time object detection', stars: '35K+' },
    { name: 'CLIP', url: 'https://github.com/openai/CLIP', desc: 'Image-text representation', stars: '25K+' },
    { name: 'LangChain', url: 'https://github.com/langchain-ai/langchain', desc: 'LLM application framework', stars: '95K+' },
    { name: 'CrewAI', url: 'https://github.com/joaomdmoura/crewAI', desc: 'Multi-agent orchestration', stars: '22K+' },
    { name: 'Transformers (HF)', url: 'https://github.com/huggingface/transformers', desc: '140K+ pre-trained models', stars: '135K+' },
    { name: 'Stable Diffusion', url: 'https://github.com/CompVis/stable-diffusion', desc: 'Text-to-image generation', stars: '68K+' },
  ];

  const [expandedCode, setExpandedCode] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">📚</span>
          <h1 className="text-3xl font-black gradient-text">Research Corpus Hub</h1>
        </div>
        <p className="text-gray-400">Complete access to research papers, datasets, models, and code repositories — direct links + Python snippets</p>
        <div className="flex gap-6 mt-4">
          {[['Research Papers', '2.4M+'], ['Datasets', '50K+'], ['AI Models', '500K+'], ['Code Repos', '100M+']].map(([label, val]) => (
            <div key={label}>
              <p className="text-2xl font-black gradient-text">{val}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Platform cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PLATFORMS.map(platform => (
          <div key={platform.name} className={`glass-card border bg-gradient-to-br ${platform.color} to-transparent rounded-2xl p-5 flex flex-col gap-4`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{platform.icon}</span>
                <div>
                  <h3 className="font-bold text-white">{platform.name}</h3>
                  <p className="text-xs text-gray-400">{platform.description}</p>
                </div>
              </div>
              <a href={platform.url} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20 transition-colors shrink-0">
                Open ↗
              </a>
            </div>

            {/* Quick links */}
            <div className="flex flex-wrap gap-2">
              {platform.links.map(link => (
                <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:border-blue-500/30 hover:text-white transition-all">
                  {link.label}
                </a>
              ))}
            </div>

            {/* Code toggle */}
            <button onClick={() => setExpandedCode(expandedCode === platform.name ? null : platform.name)}
              className="text-xs text-gray-500 hover:text-gray-300 text-left transition-colors">
              {expandedCode === platform.name ? '▼ Hide code' : '▶ Show API code'}
            </button>
            {expandedCode === platform.name && (
              <pre className="text-xs text-green-300 bg-black/50 rounded-xl p-3 overflow-x-auto font-mono leading-relaxed border border-white/10">
                {platform.code}
              </pre>
            )}
          </div>
        ))}
      </div>

      {/* Top AI/ML Repos */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">⭐ Top AI/ML Repositories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {TOP_REPOS.map(repo => (
            <a key={repo.name} href={repo.url} target="_blank" rel="noopener noreferrer"
              className="glass-card border border-white/10 rounded-xl p-3 flex flex-col gap-2 hover:border-blue-500/30 hover:bg-white/5 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{repo.name}</span>
                <span className="text-xs text-yellow-400">⭐ {repo.stars}</span>
              </div>
              <p className="text-xs text-gray-500">{repo.desc}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Specialized libraries */}
      <div className="glass-card border border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">Specialized Libraries</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { category: '🖼️ Computer Vision', libs: ['MMDetection', 'Detectron2', 'Kornia', 'Albumentations', 'OpenCV'] },
            { category: '🧠 Natural Language Processing', libs: ['spaCy', 'NLTK', 'Gensim', 'FastText', 'HuggingFace Transformers'] },
            { category: '🎤 Speech & Audio', libs: ['Whisper (OpenAI)', 'Coqui TTS', 'Demucs', 'AudioCraft', 'SpeechBrain'] },
          ].map(col => (
            <div key={col.category}>
              <p className="text-sm font-semibold text-gray-300 mb-2">{col.category}</p>
              <ul className="space-y-1">
                {col.libs.map(lib => (
                  <li key={lib} className="text-xs text-gray-400 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-blue-400" /> {lib}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
