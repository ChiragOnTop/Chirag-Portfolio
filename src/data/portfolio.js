import airCanvasImage from '../assets/projects/air-canvas.jpg'
import astroManjuImage from '../assets/projects/astro-manju.jpg'
import orbitFriendsImage from '../assets/projects/orbit-friends.jpg'

export const subtitles = [
  'AI Developer',
  'Full Stack Engineer',
  'Creative Technologist',
  'Experimental Interface Creator',
]

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Labs', href: '#labs' },
  { label: 'Contact', href: '#contact' },
]

export const techStack = [
  { name: 'Python', orbit: 0, size: 'lg' },
  { name: 'C', orbit: 1, size: 'sm' },
  { name: 'Java', orbit: 1, size: 'md' },
  { name: 'JavaScript', orbit: 0, size: 'lg' },
  { name: 'React', orbit: 0, size: 'lg' },
  { name: 'Node.js', orbit: 2, size: 'lg' },
  { name: 'HTML', orbit: 2, size: 'md' },
  { name: 'CSS', orbit: 2, size: 'md' },
  { name: 'Flutter', orbit: 3, size: 'lg' },
  { name: 'Dart', orbit: 3, size: 'md' },
  { name: 'Three.js', orbit: 1, size: 'lg' },
  { name: 'AI Systems', orbit: 0, size: 'xl' },
  { name: 'Computer Vision', orbit: 1, size: 'lg' },
  { name: 'WebGL', orbit: 1, size: 'lg' },
  { name: 'UI/UX', orbit: 3, size: 'lg' },
  { name: 'Motion', orbit: 3, size: 'md' },
]

export const featuredProjects = [
  {
    id: 'stellar-ai',
    title: 'Stellar AI',
    tag: 'AI Ecosystem',
    featured: true,
    description:
      'Real-time cosmic intelligence platform — zodiac-powered AI chatbot, live data streams, and a holographic neural dashboard for next-gen decision systems.',
    problem:
      'Users needed an interactive AI assistant with real-time data visualization and an intuitive interface that felt cutting-edge and immersive.',
    solution:
      'Built a full-stack AI ecosystem combining React frontend, Node.js WebSocket server, and Python LLM integration with a holographic neural dashboard UI.',
    keyFeatures: [
      'Real-time AI chat with streaming responses',
      'Zodiac-powered personality engine',
      'Live neural network visualization',
      'WebSocket data streaming',
      'Holographic dashboard UI',
    ],
    tech: ['React', 'Node.js', 'Python', 'LLMs', 'WebSockets', 'Three.js'],
    accent: '#00e5ff',
    highlights: ['Live AI Chat', 'Zodiac Engine', 'Neural Dashboard'],
    gitHub: '',
    liveDemo: '',
    screenshot: astroManjuImage,
    screenshotAlt: 'Astro Manju celestial guidance interface screenshot',
  },
  {
    id: 'air-canvas',
    title: 'Air Canvas',
    tag: 'Computer Vision Lab',
    featured: true,
    description:
      'Experimental CV laboratory — hand tracking, gesture recognition, neon air-drawing, and AI detection layers in a holographic HUD environment.',
    problem:
      'Enable users to draw and interact with their computer using only hand gestures, creating a futuristic, touchless interface for creative expression.',
    solution:
      'Integrated MediaPipe for real-time hand tracking, OpenCV for gesture recognition, and WebGL for immersive HUD rendering with neon effects.',
    keyFeatures: [
      'Real-time hand tracking',
      'Gesture recognition engine',
      'Air-drawing canvas',
      'AI object detection overlay',
      'Holographic HUD interface',
      'Neon trail effects',
    ],
    tech: ['Python', 'OpenCV', 'MediaPipe', 'WebGL', 'JavaScript'],
    accent: '#8b5cf6',
    highlights: ['Hand Tracking', 'Gesture Draw', 'CV HUD', 'AI Detect'],
    gitHub: '',
    liveDemo: '',
    screenshot: airCanvasImage,
    screenshotAlt: 'Air Canvas mobile drawing interface screenshot',
  },
]

export const projects = [
  {
    id: 'resonate-healer',
    title: 'Resonate Healer',
    tag: 'Immersive Web',
    year: '2025',
    description:
      'Healing-focused immersive interface with cinematic scroll narratives and ethereal motion systems.',
    problem: 'Create a wellness platform that prioritizes user mental health through immersive design and calming interactions.',
    solution: 'Built an interactive web experience using GSAP animations and scroll-triggered narratives for a therapeutic user journey.',
    keyFeatures: ['Scroll narratives', 'Ethereal animations', 'Calming UI', 'Responsive design'],
    tech: ['React', 'GSAP', 'Tailwind', 'Lenis'],
    accent: '#22d3ee',
    gitHub: '',
    liveDemo: '',
    screenshot: orbitFriendsImage,
    screenshotAlt: 'Dark futuristic orbit interface screenshot',
  },
  {
    id: 'neural-os',
    title: 'Neural OS',
    tag: '3D Interface',
    year: '2025',
    description:
      'Futuristic 3D operating environment with spatial window management and AI-native workflows.',
    problem: 'Reimagine how developers interact with their environment through a 3D, spatial interface.',
    solution: 'Developed a Three.js-based 3D workspace with spatial window management and AI integration.',
    keyFeatures: ['3D spatial interface', 'Window management', 'AI workflows', 'Real-time updates'],
    tech: ['Three.js', 'R3F', 'TypeScript', 'React'],
    accent: '#7c3aed',
    gitHub: '',
    liveDemo: '',
  },
  {
    id: 'flutter-pulse',
    title: 'Flutter Pulse',
    tag: 'Flutter / Dart',
    year: '2024',
    description:
      'Cross-platform mobile application with real-time sync and glassmorphic UI primitives.',
    problem: 'Build a responsive mobile app that works seamlessly across iOS and Android.',
    solution: 'Used Flutter and Firebase for real-time data sync with modern glassmorphic UI.',
    keyFeatures: ['Cross-platform', 'Real-time sync', 'Glassmorphic UI', 'Offline support'],
    tech: ['Flutter', 'Dart', 'Firebase', 'GetX'],
    accent: '#38bdf8',
    gitHub: '',
    liveDemo: '',
  },
  {
    id: 'node-nexus',
    title: 'Node Nexus',
    tag: 'Backend Systems',
    year: '2024',
    description:
      'Scalable Node.js microservices with event-driven AI pipeline integrations.',
    problem: 'Create a scalable backend that integrates AI pipelines and real-time events.',
    solution: 'Built microservices architecture using Node.js, Redis, and event-driven patterns.',
    keyFeatures: ['Microservices', 'Event-driven', 'AI integration', 'Scalable'],
    tech: ['Node.js', 'Redis', 'PostgreSQL', 'Express'],
    accent: '#f59e0b',
    gitHub: '',
    liveDemo: '',
  },
  {
    id: 'prism-drift',
    title: 'Prism Drift',
    tag: 'Creative Code',
    year: '2024',
    description:
      'Scroll-driven shader landscapes and procedural animation experiments in JavaScript.',
    problem: 'Explore creative coding and procedural generation in the browser.',
    solution: 'Used WebGL shaders and GSAP for scroll-driven procedural animations.',
    keyFeatures: ['WebGL shaders', 'Procedural animation', 'Scroll interaction', 'Custom effects'],
    tech: ['WebGL', 'GSAP', 'Lenis', 'JavaScript'],
    accent: '#ec4899',
    gitHub: '',
    liveDemo: '',
  },
  {
    id: 'holo-web',
    title: 'Holo Web',
    tag: '3D Website',
    year: '2024',
    description:
      'Immersive futuristic marketing site with WebGL environments and cinematic transitions.',
    problem: 'Create an engaging marketing site that stands out with immersive 3D experiences.',
    solution: 'Built interactive WebGL scenes with Three.js and smooth cinematic transitions.',
    keyFeatures: ['WebGL environments', 'Cinematic transitions', 'Interactive', 'Performance optimized'],
    tech: ['HTML', 'CSS', 'Three.js', 'JavaScript'],
    accent: '#00e5ff',
    gitHub: '',
    liveDemo: '',
  },
]

export const labs = [
  {
    id: 'holo-type',
    title: 'HoloType Engine',
    status: 'Live',
    category: 'Interface',
    description: 'Kinetic typography with depth-mapped glyph extrusion and holographic refraction.',
  },
  {
    id: 'gesture-mind',
    title: 'Gesture Mind',
    status: 'Beta',
    category: 'Computer Vision',
    description: 'Real-time hand pose estimation driving spatial UI manipulation.',
  },
  {
    id: 'agent-hud',
    title: 'Agent HUD Kit',
    status: 'Live',
    category: 'AI Systems',
    description: 'Composable HUD patterns for autonomous copilots and multi-agent dashboards.',
  },
  {
    id: 'particle-field',
    title: 'Particle Field OS',
    status: 'Research',
    category: 'Immersive UI',
    description: 'GPU particle swarms forming reactive interface topology from cursor intent.',
  },
  {
    id: 'glass-nav',
    title: 'Glass Navigation',
    status: 'Research',
    category: 'Interface',
    description: 'Refractive nav primitives with chromatic aberration and depth parallax.',
  },
  {
    id: 'cv-lab',
    title: 'Vision Lab',
    status: 'Beta',
    category: 'Computer Vision',
    description: 'Holographic tracking overlays and neon gesture trail visualization systems.',
  },
]

export const aboutStats = [
  { label: 'Systems Shipped', value: '40+' },
  { label: 'AI Experiments', value: '24' },
  { label: '3D Interfaces', value: '12' },
  { label: 'Vision Projects', value: '8' },
]

export const socials = [
  { label: 'GitHub', href: 'https://github.com/ChiragOnTop' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/chiraggambhir777' },
  { label: 'Instagram', href: 'https://www.instagram.com/chiraggambhir_777/' },
  { label: 'Email', href: 'mailto:cgambhir777@gmail.com' },
]

export const bootLines = [
  'INITIALIZING NEURAL CORE...',
  'LOADING HOLOGRAPHIC LAYERS...',
  'SYNCING AI SUBSYSTEMS...',
  'DEPLOYING INTERFACE v3.0...',
  'SYSTEM ONLINE',
]
