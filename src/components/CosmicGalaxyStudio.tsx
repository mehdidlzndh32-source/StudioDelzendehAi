import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import galaxyCoreImg from '../assets/images/milkyway_galaxy_core_1793351807386.jpg';
import solarCoronaImg from '../assets/images/solar_corona_texture_1793351818982.jpg';
import {
  Sparkles,
  Compass,
  Maximize2,
  Minimize2,
  Atom,
  RotateCw,
  Eye,
  Volume2,
  VolumeX,
  Layers,
  ChevronRight,
  Info,
  Radio,
  ArrowRight
} from 'lucide-react';

function createEarthCanvasTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const oceanGrad = ctx.createLinearGradient(0, 0, 0, 512);
  oceanGrad.addColorStop(0, '#0a2342');
  oceanGrad.addColorStop(0.5, '#124559');
  oceanGrad.addColorStop(1, '#081726');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, 1024, 512);

  ctx.fillStyle = '#2d6a4f';
  ctx.beginPath();
  ctx.ellipse(560, 240, 140, 95, 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#52b788';
  ctx.beginPath();
  ctx.ellipse(620, 200, 120, 65, -0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#2d6a4f';
  ctx.beginPath();
  ctx.ellipse(260, 180, 85, 110, -0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(320, 320, 65, 95, 0.3, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  for (let i = 0; i < 45; i++) {
    const x = Math.random() * 1024;
    const y = 80 + Math.random() * 350;
    const w = 40 + Math.random() * 140;
    const h = 8 + Math.random() * 25;
    ctx.beginPath();
    ctx.ellipse(x, y, w, h, Math.random() * 0.4 - 0.2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, 1024, 45);
  ctx.fillRect(0, 467, 1024, 45);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createJupiterCanvasTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const colors = ['#d4a373', '#e9edc9', '#faedcd', '#ccd5ae', '#cb997e', '#ddb892', '#b08968', '#7f5539'];
  const bandHeight = 512 / 24;
  for (let i = 0; i < 24; i++) {
    ctx.fillStyle = colors[i % colors.length];
    ctx.fillRect(0, i * bandHeight, 1024, bandHeight + 2);
  }

  for (let i = 0; i < 70; i++) {
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.beginPath();
    ctx.ellipse(Math.random() * 1024, Math.random() * 512, 60 + Math.random() * 90, 6 + Math.random() * 14, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = '#b7094c';
  ctx.beginPath();
  ctx.ellipse(650, 310, 75, 45, 0.05, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#e63946';
  ctx.beginPath();
  ctx.ellipse(650, 310, 50, 28, 0.05, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createMarsCanvasTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = '#c1440e';
  ctx.fillRect(0, 0, 1024, 512);

  ctx.fillStyle = '#7a2208';
  for (let i = 0; i < 50; i++) {
    ctx.beginPath();
    ctx.ellipse(Math.random() * 1024, Math.random() * 512, 30 + Math.random() * 80, 10 + Math.random() * 30, Math.random() * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, 1024, 30);
  ctx.fillRect(0, 482, 1024, 30);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

interface CelestialBody {
  id: string;
  nameFa: string;
  nameEn: string;
  radius: number;
  orbitRadius: number;
  orbitSpeed: number;
  color: number;
  emissive?: number;
  emissiveIntensity?: number;
  roughness: number;
  metalness: number;
  particleColor: string;
  description: string;
  wisdomText: string;
  hasRing?: boolean;
  ringInner?: number;
  ringOuter?: number;
  hasMoon?: boolean;
}

export function CosmicGalaxyStudio() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedBody, setSelectedBody] = useState<CelestialBody | null>(null);
  const [viewMode, setViewMode] = useState<'macro-galaxy' | 'molecular' | 'blackhole-tunnel'>('macro-galaxy');
  const [isRotating, setIsRotating] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [warpActive, setWarpActive] = useState(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const planetsGroupRef = useRef<THREE.Group | null>(null);
  const tunnelParticlesRef = useRef<THREE.Points | null>(null);
  const molecularGroupRef = useRef<THREE.Group | null>(null);
  const planetMeshesRef = useRef<Map<string, { mesh: THREE.Mesh; orbit: number; speed: number; angle: number; moonMesh?: THREE.Mesh; moonAngle?: number }>>(new Map());
  const isRotatingRef = useRef(true);
  const viewModeRef = useRef<'macro-galaxy' | 'molecular' | 'blackhole-tunnel'>('macro-galaxy');

  isRotatingRef.current = isRotating;
  viewModeRef.current = viewMode;

  const celestialBodies: CelestialBody[] = [
    {
      id: 'sun',
      nameFa: 'خورشید مرکزی (Solar Core)',
      nameEn: 'The Sun',
      radius: 2.2,
      orbitRadius: 0,
      orbitSpeed: 0,
      color: 0xffaa00,
      emissive: 0xff7700,
      emissiveIntensity: 2.5,
      roughness: 0.1,
      metalness: 0.2,
      particleColor: '#f59e0b',
      description: 'هسته تپنده منظومه و منشأ نور و حیات؛ نماد هدایت و پایداری در اکوسیستم هوش مصنوعی.',
      wisdomText: 'خورشید هر روز غروب می‌کند بی‌آنکه نابود شود؛ هر فروریختنی در زندگی، بستر طلوعی باشکوه‌تر با هویتی پرفروغ‌تر است.'
    },
    {
      id: 'earth',
      nameFa: 'زمین و ماه (Earth & Moon)',
      nameEn: 'Earth & Moon',
      radius: 0.9,
      orbitRadius: 8.5,
      orbitSpeed: 0.8,
      color: 0x2563eb,
      roughness: 0.4,
      metalness: 0.1,
      particleColor: '#38bdf8',
      hasMoon: true,
      description: 'گهواره تمدن و حیات هوشمند؛ کانون هماهنگی ایجنت‌های سازمانی و عواطف انسانی.',
      wisdomText: 'گردش فصول و شب و روز زمین گواه این حقیقت است: دگرگونی، ماهیت جاودانگی است و هر پایانی، آغازی نو در مداری متعالی‌تر است.'
    },
    {
      id: 'mars',
      nameFa: 'مریخ سرخ (Mars)',
      nameEn: 'Mars',
      radius: 0.65,
      orbitRadius: 11.5,
      orbitSpeed: 0.65,
      color: 0xe11d48,
      roughness: 0.6,
      metalness: 0.3,
      particleColor: '#fb7185',
      description: 'سیاره سرخ و افق آینده تمدن بشری؛ نماد کاوشگری، جسارت و عبور از مرزها.',
      wisdomText: 'دشت‌های خاموش مریخ فریاد می‌زنند که سکون و تغییر اقلیم، نیستی نیست؛ سرآغاز خلق تمدنی نوین در کهکشان است.'
    },
    {
      id: 'jupiter',
      nameFa: 'مشتری بزرگ (Jupiter)',
      nameEn: 'Jupiter',
      radius: 1.5,
      orbitRadius: 15.5,
      orbitSpeed: 0.4,
      color: 0xd97706,
      roughness: 0.3,
      metalness: 0.2,
      particleColor: '#fcd34d',
      description: 'پادشاه گازی سیارات؛ سنگر محافظ زمین در برابر شهاب‌سنگ‌ها و نماد اقتدار سازمانی.',
      wisdomText: 'توفان‌های عظیم مشتری نشانه ویرانی نیستند؛ پالایشگاه انرژی‌های سرکش و زایش الگوهای هندسی پایدارند.'
    },
    {
      id: 'saturn',
      nameFa: 'کیوان و حلقه‌های نورانی (Saturn)',
      nameEn: 'Saturn',
      radius: 1.25,
      orbitRadius: 20.0,
      orbitSpeed: 0.3,
      color: 0xfef08a,
      roughness: 0.3,
      metalness: 0.4,
      hasRing: true,
      ringInner: 1.6,
      ringOuter: 2.8,
      particleColor: '#fde047',
      description: 'نگین منظومه شمسی با حلقه‌های بلورین؛ الهام‌بخش نشان تجاری و حلقه‌های نورانی AIONVERSE.',
      wisdomText: 'حلقه‌های کیوان از خرده‌سنگ‌های خردشده پدید آمده‌اند؛ آنچه روزی فروپاشی می‌نمود، به باشکوه‌ترین شاهکار آفرینش بدل گردید.'
    },
    {
      id: 'quantum-core',
      nameFa: 'سیاره کوانتوم مهدی دل زنده (AION Core)',
      nameEn: 'AIONVERSE Prime Exoplanet',
      radius: 1.1,
      orbitRadius: 25.0,
      orbitSpeed: 0.22,
      color: 0x4f46e5,
      emissive: 0x818cf8,
      emissiveIntensity: 1.2,
      roughness: 0.1,
      metalness: 0.9,
      particleColor: '#a855f7',
      description: 'هسته فوق‌پیشرفته هوش مصنوعی فرامنظومه‌ای، متصل به ۲۵ ایجنت خودگردان و صندوق توسعه.',
      wisdomText: '«هر تغییری در زندگی حاکی از فنا و نابودی نیست، بلکه آغاز یک مسیر نو با ویژگی‌ها و افق‌های دیگر است.»'
    }
  ];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect Software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // Initialize Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x02040a);
    scene.fog = new THREE.FogExp2(0x02040a, 0.015);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 22, 42);
    cameraRef.current = camera;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 140;
    controls.minDistance = 2;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    // Lighting Rig
    const sunLight = new THREE.PointLight(0xfffaed, 3.5, 300, 0.5);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x1e293b, 0.6);
    scene.add(ambientLight);

    // 1. Milky Way Cosmic Starfield (5,000 Procedural Stars)
    const starsCount = isSoftwareGl ? 1500 : 4500;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starsCount * 3);
    const starColors = new Float32Array(starsCount * 3);

    const color1 = new THREE.Color(0xf59e0b);
    const color2 = new THREE.Color(0x38bdf8);
    const color3 = new THREE.Color(0xffffff);

    for (let i = 0; i < starsCount; i++) {
      const radius = 60 + Math.random() * 200;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi);

      const mixed = Math.random() > 0.6 ? color1 : Math.random() > 0.3 ? color2 : color3;
      starColors[i * 3] = mixed.r;
      starColors[i * 3 + 1] = mixed.g;
      starColors[i * 3 + 2] = mixed.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 1.5 Photorealistic Real NASA / James Webb Galaxy Background Skydome
    const textureLoader = new THREE.TextureLoader();
    const galaxyTexture = textureLoader.load(galaxyCoreImg);
    galaxyTexture.colorSpace = THREE.SRGBColorSpace;

    const sunTexture = textureLoader.load(solarCoronaImg);
    sunTexture.colorSpace = THREE.SRGBColorSpace;

    const galaxySkydomeGeo = new THREE.SphereGeometry(260, 48, 48);
    const galaxySkydomeMat = new THREE.MeshBasicMaterial({
      map: galaxyTexture,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.95
    });
    const galaxySkydome = new THREE.Mesh(galaxySkydomeGeo, galaxySkydomeMat);
    scene.add(galaxySkydome);

    // Photorealistic Rotating Accretion Disc & Swirling Spiral Dust
    const galacticDiscGeo = new THREE.RingGeometry(6, 110, 64);
    const galacticDiscMat = new THREE.MeshBasicMaterial({
      map: galaxyTexture,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });
    const galacticDisc = new THREE.Mesh(galacticDiscGeo, galacticDiscMat);
    galacticDisc.rotation.x = Math.PI / 2.3;
    scene.add(galacticDisc);

    // Procedural textures
    const earthTexture = createEarthCanvasTexture();
    const jupiterTexture = createJupiterCanvasTexture();
    const marsTexture = createMarsCanvasTexture();

    // 2. Planets & Sun Group
    const planetsGroup = new THREE.Group();
    scene.add(planetsGroup);
    planetsGroupRef.current = planetsGroup;

    // Build Planets & Orbits
    celestialBodies.forEach((body) => {
      // Planet Mesh with authentic PBR material & realistic textures
      const geometry = new THREE.SphereGeometry(body.radius, 48, 48);
      let material: THREE.Material;

      if (body.id === 'sun') {
        material = new THREE.MeshStandardMaterial({
          map: sunTexture,
          emissiveMap: sunTexture,
          emissive: 0xffaa00,
          emissiveIntensity: 2.8,
          roughness: 0.2,
          metalness: 0.1
        });
      } else if (body.id === 'earth') {
        material = new THREE.MeshStandardMaterial({
          map: earthTexture,
          roughness: 0.35,
          metalness: 0.15
        });
      } else if (body.id === 'jupiter') {
        material = new THREE.MeshStandardMaterial({
          map: jupiterTexture,
          roughness: 0.4,
          metalness: 0.1
        });
      } else if (body.id === 'mars') {
        material = new THREE.MeshStandardMaterial({
          map: marsTexture,
          roughness: 0.7,
          metalness: 0.2
        });
      } else {
        material = new THREE.MeshStandardMaterial({
          color: body.color,
          emissive: body.emissive || 0x000000,
          emissiveIntensity: body.emissiveIntensity || 0,
          roughness: body.roughness,
          metalness: body.metalness,
        });
      }

      const mesh = new THREE.Mesh(geometry, material);

      if (body.id === 'sun') {
        mesh.position.set(0, 0, 0);
        // Sun Corona Glow Mesh
        const coronaGeo = new THREE.SphereGeometry(body.radius * 1.35, 32, 32);
        const coronaMat = new THREE.MeshBasicMaterial({
          color: 0xf59e0b,
          transparent: true,
          opacity: 0.35,
          wireframe: true,
          blending: THREE.AdditiveBlending
        });
        const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
        mesh.add(coronaMesh);

        // Radiant Outer Solar Flare Halo
        const haloGeo = new THREE.SphereGeometry(body.radius * 1.8, 32, 32);
        const haloMat = new THREE.MeshBasicMaterial({
          color: 0xff7700,
          transparent: true,
          opacity: 0.16,
          blending: THREE.AdditiveBlending
        });
        const haloMesh = new THREE.Mesh(haloGeo, haloMat);
        mesh.add(haloMesh);
      } else {
        // Orbital Ring Guide
        const orbitCurve = new THREE.EllipseCurve(0, 0, body.orbitRadius, body.orbitRadius, 0, 2 * Math.PI, false, 0);
        const points = orbitCurve.getPoints(100);
        const orbitGeo = new THREE.BufferGeometry().setFromPoints(points);
        orbitGeo.rotateX(Math.PI / 2);
        const orbitMat = new THREE.LineBasicMaterial({
          color: 0x475569,
          transparent: true,
          opacity: 0.45,
        });
        const orbitLine = new THREE.Line(orbitGeo, orbitMat);
        planetsGroup.add(orbitLine);

        // Initial position
        const angle = Math.random() * Math.PI * 2;
        mesh.position.set(Math.cos(angle) * body.orbitRadius, 0, Math.sin(angle) * body.orbitRadius);
      }

      // Saturn Rings
      if (body.hasRing && body.ringInner && body.ringOuter) {
        const ringGeo = new THREE.RingGeometry(body.ringInner, body.ringOuter, 64);
        const ringMat = new THREE.MeshStandardMaterial({
          color: 0xfde047,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.75,
          roughness: 0.3,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2.4;
        mesh.add(ringMesh);
      }

      // Earth Moon
      let moonMesh: THREE.Mesh | undefined;
      if (body.hasMoon) {
        const moonGeo = new THREE.SphereGeometry(0.24, 16, 16);
        const moonMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.8 });
        moonMesh = new THREE.Mesh(moonGeo, moonMat);
        moonMesh.position.set(1.6, 0.2, 0);
        mesh.add(moonMesh);
      }

      planetsGroup.add(mesh);
      planetMeshesRef.current.set(body.id, {
        mesh,
        orbit: body.orbitRadius,
        speed: body.orbitSpeed,
        angle: Math.random() * Math.PI * 2,
        moonMesh,
        moonAngle: 0,
      });
    });

    // 3. Floating Black Hole Wormhole Particle Tunnel
    const tunnelCount = isSoftwareGl ? 800 : 2400;
    const tunnelGeo = new THREE.BufferGeometry();
    const tunnelPos = new Float32Array(tunnelCount * 3);
    const tunnelColors = new Float32Array(tunnelCount * 3);

    for (let i = 0; i < tunnelCount; i++) {
      const z = (Math.random() - 0.5) * 80;
      const radius = 2 + Math.random() * 8;
      const angle = Math.random() * Math.PI * 2;

      tunnelPos[i * 3] = Math.cos(angle) * radius;
      tunnelPos[i * 3 + 1] = Math.sin(angle) * radius;
      tunnelPos[i * 3 + 2] = z;

      tunnelColors[i * 3] = 0.96;
      tunnelColors[i * 3 + 1] = 0.62;
      tunnelColors[i * 3 + 2] = 0.04;
    }

    tunnelGeo.setAttribute('position', new THREE.BufferAttribute(tunnelPos, 3));
    tunnelGeo.setAttribute('color', new THREE.BufferAttribute(tunnelColors, 3));

    const tunnelMat = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
    });
    const tunnelParticles = new THREE.Points(tunnelGeo, tunnelMat);
    tunnelParticles.visible = false;
    scene.add(tunnelParticles);
    tunnelParticlesRef.current = tunnelParticles;

    // 4. Asteroid Belt between Mars & Jupiter (Macro Cosmos)
    const asteroidCount = isSoftwareGl ? 150 : 450;
    const asteroidGeo = new THREE.BufferGeometry();
    const asteroidPos = new Float32Array(asteroidCount * 3);
    for (let i = 0; i < asteroidCount; i++) {
      const dist = 13.5 + Math.random() * 2.0;
      const angle = Math.random() * Math.PI * 2;
      const ySpread = (Math.random() - 0.5) * 0.9;
      asteroidPos[i * 3] = Math.cos(angle) * dist;
      asteroidPos[i * 3 + 1] = ySpread;
      asteroidPos[i * 3 + 2] = Math.sin(angle) * dist;
    }
    asteroidGeo.setAttribute('position', new THREE.BufferAttribute(asteroidPos, 3));
    const asteroidMat = new THREE.PointsMaterial({ size: 0.9, color: 0x94a3b8, transparent: true, opacity: 0.7 });
    const asteroidBelt = new THREE.Points(asteroidGeo, asteroidMat);
    planetsGroup.add(asteroidBelt);

    // 5. Molecular & Subatomic Lattice Model (Expert Multi-Atomic Graphene & Quantum Core)
    const molecularGroup = new THREE.Group();

    // Central Quantum Atom Core
    const centralNucleusGeo = new THREE.SphereGeometry(1.3, 32, 32);
    const centralNucleusMat = new THREE.MeshPhysicalMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.1,
      clearcoat: 1.0,
      emissive: 0xd97706,
      emissiveIntensity: 0.8,
    });
    const centralAtom = new THREE.Mesh(centralNucleusGeo, centralNucleusMat);
    molecularGroup.add(centralAtom);

    // Clustered Nucleons (Protons & Neutrons) inside Central Nucleus
    for (let p = 0; p < 12; p++) {
      const nGeo = new THREE.SphereGeometry(0.32, 16, 16);
      const isProton = p % 2 === 0;
      const nMat = new THREE.MeshStandardMaterial({
        color: isProton ? 0xef4444 : 0x06b6d4,
        emissive: isProton ? 0xb91c1c : 0x0891b2,
        emissiveIntensity: 0.6,
      });
      const nucleon = new THREE.Mesh(nGeo, nMat);
      const ang = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const dist = 0.65;
      nucleon.position.set(dist * Math.sin(phi) * Math.cos(ang), dist * Math.sin(phi) * Math.sin(ang), dist * Math.cos(phi));
      centralAtom.add(nucleon);
    }

    // Outer 6 Carbon Atoms in Hexagonal Lattice Ring with Covalent Bonds
    const ringRadius = 5.2;
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const x = Math.cos(angle) * ringRadius;
      const z = Math.sin(angle) * ringRadius;

      // Outer Carbon Atom
      const cGeo = new THREE.SphereGeometry(0.85, 24, 24);
      const cMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.4,
        roughness: 0.2,
        metalness: 0.8,
      });
      const cMesh = new THREE.Mesh(cGeo, cMat);
      cMesh.position.set(x, 0, z);
      molecularGroup.add(cMesh);

      // Covalent Spoke Bond to Center
      const bondGeo = new THREE.CylinderGeometry(0.08, 0.08, ringRadius, 12);
      const bondMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.7, roughness: 0.3 });
      const spoke = new THREE.Mesh(bondGeo, bondMat);
      spoke.position.set(x / 2, 0, z / 2);
      spoke.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(x, 0, z).normalize());
      molecularGroup.add(spoke);

      // Outer Perimeter Hexagonal Bond
      const nextAngle = ((i + 1) / 6) * Math.PI * 2;
      const nx = Math.cos(nextAngle) * ringRadius;
      const nz = Math.sin(nextAngle) * ringRadius;
      const pLen = Math.hypot(nx - x, nz - z);
      const pGeo = new THREE.CylinderGeometry(0.06, 0.06, pLen, 12);
      const pBond = new THREE.Mesh(pGeo, bondMat);
      pBond.position.set((x + nx) / 2, 0, (z + nz) / 2);
      pBond.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(nx - x, 0, nz - z).normalize());
      molecularGroup.add(pBond);
    }

    // Orbiting Electron Energy Shells (Torus + Quantum Probability Spheres)
    for (let i = 0; i < 4; i++) {
      const shellGeo = new THREE.TorusGeometry(3.0 + i * 1.8, 0.04, 16, 100);
      const shellMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.45 });
      const shell = new THREE.Mesh(shellGeo, shellMat);
      shell.rotation.x = Math.PI / (1.5 + i * 0.4);
      shell.rotation.y = Math.PI / (2.0 + i * 0.5);
      molecularGroup.add(shell);

      // Electron with trail
      const elecGeo = new THREE.SphereGeometry(0.22, 16, 16);
      const elecMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const elec = new THREE.Mesh(elecGeo, elecMat);
      elec.position.set(3.0 + i * 1.8, 0, 0);
      shell.add(elec);
    }

    // de Broglie Quantum Probability Particle Cloud
    const probCount = isSoftwareGl ? 300 : 900;
    const probGeo = new THREE.BufferGeometry();
    const probPos = new Float32Array(probCount * 3);
    for (let i = 0; i < probCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.4 + Math.random() * 6.5;
      probPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      probPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      probPos[i * 3 + 2] = r * Math.cos(phi);
    }
    probGeo.setAttribute('position', new THREE.BufferAttribute(probPos, 3));
    const probMat = new THREE.PointsMaterial({ size: 1.2, color: 0x38bdf8, transparent: true, opacity: 0.28 });
    const probCloud = new THREE.Points(probGeo, probMat);
    molecularGroup.add(probCloud);

    molecularGroup.visible = false;
    scene.add(molecularGroup);
    molecularGroupRef.current = molecularGroup;

    // Animation Loop
    let frameId: number;
    const clock = new THREE.Clock();

    const tick = () => {
      const delta = clock.getDelta();

      // Rotate starfield & photorealistic real space skydome
      starField.rotation.y += delta * 0.015;
      galaxySkydome.rotation.y += delta * 0.006;
      galacticDisc.rotation.z += delta * 0.012;

      // Rotate planets along their orbits
      if (isRotatingRef.current && viewModeRef.current === 'macro-galaxy') {
        planetMeshesRef.current.forEach((item, id) => {
          if (item.orbit > 0) {
            item.angle += item.speed * delta * 0.4;
            item.mesh.position.x = Math.cos(item.angle) * item.orbit;
            item.mesh.position.z = Math.sin(item.angle) * item.orbit;
          }
          item.mesh.rotation.y += delta * 0.8;

          // Moon rotation
          if (item.moonMesh) {
            item.moonAngle = (item.moonAngle || 0) + delta * 2.5;
            item.moonMesh.position.x = Math.cos(item.moonAngle) * 1.8;
            item.moonMesh.position.z = Math.sin(item.moonAngle) * 1.8;
          }
        });
      }

      // Animate Wormhole / Black Hole Tunnel particles
      if (tunnelParticlesRef.current && tunnelParticlesRef.current.visible) {
        const posAttr = tunnelParticlesRef.current.geometry.attributes.position;
        for (let i = 0; i < posAttr.count; i++) {
          let z = posAttr.getZ(i);
          z += delta * 30;
          if (z > 40) z = -40;
          posAttr.setZ(i, z);
        }
        posAttr.needsUpdate = true;
        tunnelParticlesRef.current.rotation.z += delta * 0.25;
      }

      // Animate Molecular Lattice
      if (molecularGroupRef.current && molecularGroupRef.current.visible) {
        molecularGroupRef.current.rotation.y += delta * 0.5;
        molecularGroupRef.current.rotation.x += delta * 0.3;
      }

      controls.update();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };
    tick();

    // Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  // Handle Planet Selection & Wormhole Warp
  const handleSelectBody = (body: CelestialBody) => {
    setSelectedBody(body);
    setWarpActive(true);

    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    // Enter Black Hole Particle Tunnel Transition
    setViewMode('blackhole-tunnel');
    if (planetsGroupRef.current) planetsGroupRef.current.visible = false;
    if (molecularGroupRef.current) molecularGroupRef.current.visible = false;
    if (tunnelParticlesRef.current) {
      tunnelParticlesRef.current.visible = true;

      // Update particle colors based on planet's signature hue
      const colors = tunnelParticlesRef.current.geometry.attributes.color;
      const targetColor = new THREE.Color(body.color);
      for (let i = 0; i < colors.count; i++) {
        colors.setXYZ(i, targetColor.r, targetColor.g, targetColor.b);
      }
      colors.needsUpdate = true;
    }

    // Play subtle cosmic sound pulse
    playCosmicHarmonic(body.radius * 80 + 120);

    // After 2 seconds of wormhole warp, exit into focused planet view
    setTimeout(() => {
      setWarpActive(false);
      setViewMode('macro-galaxy');
      if (planetsGroupRef.current) planetsGroupRef.current.visible = true;
      if (tunnelParticlesRef.current) tunnelParticlesRef.current.visible = false;

      // Center camera near the chosen planet
      const meshData = planetMeshesRef.current.get(body.id);
      if (meshData) {
        const pos = meshData.mesh.position;
        controls.target.copy(pos);
        camera.position.set(pos.x + body.radius * 3.5, pos.y + body.radius * 2, pos.z + body.radius * 4.5);
      }
    }, 2200);
  };

  const toggleMolecularView = () => {
    if (viewMode === 'molecular') {
      setViewMode('macro-galaxy');
      if (planetsGroupRef.current) planetsGroupRef.current.visible = true;
      if (molecularGroupRef.current) molecularGroupRef.current.visible = false;
      if (cameraRef.current && controlsRef.current) {
        cameraRef.current.position.set(0, 22, 42);
        controlsRef.current.target.set(0, 0, 0);
      }
    } else {
      setViewMode('molecular');
      if (planetsGroupRef.current) planetsGroupRef.current.visible = false;
      if (molecularGroupRef.current) molecularGroupRef.current.visible = true;
      if (cameraRef.current && controlsRef.current) {
        cameraRef.current.position.set(0, 4, 12);
        controlsRef.current.target.set(0, 0, 0);
      }
    }
  };

  const playCosmicHarmonic = (freq: number) => {
    if (!audioEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx();
      const ctx = audioCtxRef.current;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 1.8);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.0);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.0);
    } catch (e) {
      // Audio fallback
    }
  };

  return (
    <div className="relative w-full h-[820px] rounded-3xl overflow-hidden border border-amber-500/30 bg-[#02040a] shadow-2xl">
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Header Badge */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="pointer-events-auto bg-slate-900/85 backdrop-blur-md border border-amber-500/40 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3">
          <div className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-[0_0_12px_#f59e0b] animate-pulse" />
          <div>
            <div className="text-xs font-black text-amber-300 flex items-center gap-2">
              شبیه‌ساز سه‌بعدی کهکشان راه شیری و منظومه شمسی AIONVERSE
              <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-mono">
                {viewMode === 'molecular' ? 'مقیاس اتمی و مولکولی' : 'مقیاس کیهانی کلان'}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              مرکزیت خورشید • چرخش گرانشی سیارات • معمار: مهدی دل زنده (مهندس مهدی دل زنده)
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pointer-events-auto flex items-center gap-2 bg-slate-900/85 backdrop-blur-md border border-slate-700/80 p-1.5 rounded-2xl">
          <button
            onClick={toggleMolecularView}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
              viewMode === 'molecular'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-300 hover:text-white bg-slate-800'
            }`}
          >
            <Atom className="w-3.5 h-3.5 text-cyan-400" />
            {viewMode === 'molecular' ? 'بازگشت به کهکشان' : 'نمای مولکولی و میکروسکوپی'}
          </button>

          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition cursor-pointer ${
              isRotating ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            چرخش مداری
          </button>

          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`p-2 rounded-xl text-xs transition cursor-pointer ${
              audioEnabled ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 bg-slate-800 hover:text-white'
            }`}
            title="طنین کیهانی و فرکانس‌های گرانشی"
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Warp Drive / Wormhole Active Overlay Announcement */}
      {warpActive && (
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm z-30 flex flex-col items-center justify-center pointer-events-none animate-in fade-in zoom-in-95 duration-200">
          <div className="relative w-36 h-36 flex items-center justify-center mb-4">
            <div className="absolute inset-0 rounded-full border-2 border-amber-400 animate-spin" />
            <div className="absolute inset-3 rounded-full border border-cyan-400 animate-ping" />
            <Sparkles className="w-8 h-8 text-amber-300" />
          </div>
          <div className="text-base font-black text-amber-300 tracking-wider">
            گذر از تونل کرم‌چاله و میدان ذرات معلق نورانی...
          </div>
          <div className="text-xs text-cyan-300 mt-1 font-mono">
            ورود به مدارهای گرانشی {selectedBody?.nameFa}
          </div>
        </div>
      )}

      {/* Philosophical Decree Card (When a planet is selected) */}
      {selectedBody && !warpActive && (
        <div className="absolute top-20 right-6 z-20 max-w-sm rounded-2xl bg-slate-900/90 border border-amber-500/50 p-4 shadow-2xl backdrop-blur-xl animate-in slide-in-from-right-4 duration-300 space-y-2.5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="text-xs font-black text-amber-300 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedBody.particleColor }} />
              <span>{selectedBody.nameFa}</span>
            </div>
            <button
              onClick={() => setSelectedBody(null)}
              className="text-slate-400 hover:text-white font-mono text-xs"
            >
              ✕
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {selectedBody.description}
          </p>

          {/* Core Philosophical Transformation Wisdom */}
          <div className="bg-slate-950 p-3 rounded-xl border border-amber-500/30 text-[11px] text-amber-200/90 leading-relaxed font-serif italic space-y-1">
            <div className="text-[10px] text-amber-400 font-sans font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              حکمت بنیادین دگرگونی و تداوم آفرینش:
            </div>
            <p>"{selectedBody.wisdomText}"</p>
          </div>
        </div>
      )}

      {/* Unified Ergonomic Bottom Planet Dock (Zero Viewport Occlusion) */}
      <div
        className={`absolute bottom-5 left-1/2 -translate-x-1/2 w-[94%] max-w-4xl transition-all duration-300 pointer-events-auto z-20 ${
          isCollapsed ? 'translate-y-[calc(100%-42px)]' : 'translate-y-0'
        }`}
      >
        <div className="bg-slate-900/95 border border-slate-700/80 shadow-2xl rounded-2xl overflow-hidden backdrop-blur-md">
          {/* Top Dock Bar */}
          <div className="flex items-center justify-between px-5 py-2.5 bg-slate-950/70 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-300 font-bold">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>انتخاب سیاره و ورود به تونل ذرات معلق نورانی</span>
              <span className="text-[10px] text-slate-500 font-mono">Cosmic Wormhole Gate</span>
            </div>

            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-slate-400 hover:text-amber-400 p-1.5 rounded-lg hover:bg-slate-800 transition cursor-pointer"
              title={isCollapsed ? 'باز کردن پنل' : 'بستن پنل'}
            >
              {isCollapsed ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Planet Navigation Pills */}
          <div className="p-3.5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {celestialBodies.map((body) => {
              const isSelected = selectedBody?.id === body.id;
              return (
                <button
                  key={body.id}
                  onClick={() => handleSelectBody(body)}
                  className={`p-2.5 rounded-xl border text-right transition flex flex-col justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-500 shadow-md shadow-amber-500/20'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="w-3.5 h-3.5 rounded-full shadow-sm"
                      style={{ backgroundColor: body.particleColor }}
                    />
                    {isSelected && (
                      <span className="text-[9px] bg-amber-500/30 text-amber-300 px-1 py-0.2 rounded font-mono">
                        فوکوس
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-bold text-slate-200 group-hover:text-amber-300 transition line-clamp-1">
                    {body.nameFa.split(' ')[0]}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">{body.nameEn}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
