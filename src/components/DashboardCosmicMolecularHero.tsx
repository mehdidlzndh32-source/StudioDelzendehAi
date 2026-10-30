import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {
  Sparkles,
  Atom,
  Globe,
  RotateCw,
  Maximize2,
  Volume2,
  VolumeX,
  Compass,
  Layers,
  ArrowRight
} from 'lucide-react';

interface Props {
  onOpenFullStudio: () => void;
  lang: 'fa' | 'en' | 'ar';
}

export function DashboardCosmicMolecularHero({ onOpenFullStudio, lang }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<'macro' | 'molecular' | 'wormhole'>('macro');
  const [isRotating, setIsRotating] = useState(true);
  const [audioActive, setAudioActive] = useState(false);
  const [activeTelemetry, setActiveTelemetry] = useState({
    scale: '10^21 m (Astrophysical Macro-Scale)',
    coreElement: 'Helium-4 Fusion / Solar Corona',
    quantumFrequency: '528.0 Hz (Solfeggio Harmonic)',
    planckConst: '6.626 × 10^-34 J·s',
    entropyRate: 'ΔS > 0 (Self-Renewing Dynamic Balance)'
  });

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);

  const macroGroupRef = useRef<THREE.Group | null>(null);
  const molecularGroupRef = useRef<THREE.Group | null>(null);
  const wormholeGroupRef = useRef<THREE.Points | null>(null);
  const rotatingPlanetsRef = useRef<Array<{ mesh: THREE.Mesh; orbit: number; speed: number; angle: number }>>([]);
  const rotatingElectronsRef = useRef<Array<{ mesh: THREE.Mesh; orbitGroup: THREE.Group; speed: number }>>([]);

  const modeRef = useRef<'macro' | 'molecular' | 'wormhole'>(mode);
  modeRef.current = mode;
  const isRotatingRef = useRef<boolean>(isRotating);
  isRotatingRef.current = isRotating;

  // Toggle Quantum Harmonic Audio
  const toggleAudio = () => {
    if (!audioActive) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(mode === 'molecular' ? 528 : 432, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 1.5);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        audioCtxRef.current = ctx;
        oscRef.current = osc;
        setAudioActive(true);
      } catch {
        // Audio might be blocked by browser policy until interaction
      }
    } else {
      if (oscRef.current) {
        oscRef.current.stop();
        oscRef.current.disconnect();
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
      setAudioActive(false);
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070c);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 18, 38);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    container.replaceChildren(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 120;
    controls.minDistance = 5;
    controlsRef.current = controls;

    // Ambient and Point Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(0xffaa00, 3, 100);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // ==========================================
    // A. MACRO-COSMIC GALAXY & SOLAR SYSTEM
    // ==========================================
    const macroGroup = new THREE.Group();
    scene.add(macroGroup);
    macroGroupRef.current = macroGroup;

    // Starfield Background
    const starCount = 1800;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const radius = 60 + Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi);

      const colorVariance = Math.random();
      if (colorVariance > 0.6) {
        starColors[i * 3] = 0.96; starColors[i * 3 + 1] = 0.62; starColors[i * 3 + 2] = 0.04; // Gold
      } else if (colorVariance > 0.3) {
        starColors[i * 3] = 0.22; starColors[i * 3 + 1] = 0.74; starColors[i * 3 + 2] = 0.97; // Cyan
      } else {
        starColors[i * 3] = 0.9; starColors[i * 3 + 1] = 0.9; starColors[i * 3 + 2] = 1.0;   // White
      }
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({ size: 1.4, vertexColors: true, transparent: true, opacity: 0.85 });
    const starField = new THREE.Points(starGeo, starMat);
    macroGroup.add(starField);

    // Central Radiant Sun
    const sunGeo = new THREE.SphereGeometry(2.4, 32, 32);
    const sunMat = new THREE.MeshStandardMaterial({
      color: 0xffaa00,
      emissive: 0xff6600,
      emissiveIntensity: 3.0,
      roughness: 0.1,
      metalness: 0.1
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    macroGroup.add(sunMesh);

    // Sun Pulsating Corona
    const coronaGeo = new THREE.SphereGeometry(3.1, 32, 32);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.3,
      wireframe: true
    });
    const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    sunMesh.add(coronaMesh);

    // Planets Configuration (True relative speed & vibrant PBR shaders)
    const planetConfigs = [
      { name: 'Mercury', r: 0.45, dist: 5.2, speed: 1.6, color: 0x94a3b8, rough: 0.8 },
      { name: 'Venus', r: 0.75, dist: 7.5, speed: 1.2, color: 0xfbbf24, rough: 0.4 },
      { name: 'Earth', r: 0.85, dist: 10.5, speed: 1.0, color: 0x38bdf8, rough: 0.3, hasMoon: true },
      { name: 'Mars', r: 0.6, dist: 13.5, speed: 0.8, color: 0xf43f5e, rough: 0.6 },
      { name: 'Jupiter', r: 1.7, dist: 18.0, speed: 0.5, color: 0xf97316, rough: 0.4 },
      { name: 'Saturn', r: 1.3, dist: 23.0, speed: 0.35, color: 0xfde047, rough: 0.5, hasRing: true },
      { name: 'Uranus', r: 1.0, dist: 28.0, speed: 0.25, color: 0x2dd4bf, rough: 0.3 },
      { name: 'Neptune', r: 0.95, dist: 32.5, speed: 0.18, color: 0x6366f1, rough: 0.3 },
      { name: 'AIONVERSE Core', r: 0.7, dist: 36.5, speed: 0.15, color: 0xa855f7, emissive: 0x7c3aed, rough: 0.2 }
    ];

    const planetList: Array<{ mesh: THREE.Mesh; orbit: number; speed: number; angle: number }> = [];

    planetConfigs.forEach((cfg) => {
      // Orbital Path Line
      const orbitCurve = new THREE.EllipseCurve(0, 0, cfg.dist, cfg.dist, 0, 2 * Math.PI, false, 0);
      const points = orbitCurve.getPoints(100);
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(points);
      orbitGeo.rotateX(Math.PI / 2);
      const orbitMat = new THREE.LineBasicMaterial({ color: 0x334155, transparent: true, opacity: 0.35 });
      const orbitLine = new THREE.Line(orbitGeo, orbitMat);
      macroGroup.add(orbitLine);

      // Planet Mesh
      const pGeo = new THREE.SphereGeometry(cfg.r, 24, 24);
      const pMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        emissive: cfg.emissive || 0x000000,
        emissiveIntensity: cfg.emissive ? 1.5 : 0,
        roughness: cfg.rough,
        metalness: 0.2
      });
      const pMesh = new THREE.Mesh(pGeo, pMat);
      const initAngle = Math.random() * Math.PI * 2;
      pMesh.position.set(Math.cos(initAngle) * cfg.dist, 0, Math.sin(initAngle) * cfg.dist);

      // Saturn Rings
      if (cfg.hasRing) {
        const ringGeo = new THREE.RingGeometry(1.6, 2.7, 48);
        const ringMat = new THREE.MeshStandardMaterial({
          color: 0xe2e8f0,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.75,
          roughness: 0.3
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2.3;
        pMesh.add(ringMesh);
      }

      // Earth Moon
      if (cfg.hasMoon) {
        const moonGeo = new THREE.SphereGeometry(0.2, 16, 16);
        const moonMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.9 });
        const moonMesh = new THREE.Mesh(moonGeo, moonMat);
        moonMesh.position.set(1.5, 0.1, 0);
        pMesh.add(moonMesh);
      }

      macroGroup.add(pMesh);
      planetList.push({ mesh: pMesh, orbit: cfg.dist, speed: cfg.speed, angle: initAngle });
    });
    rotatingPlanetsRef.current = planetList;

    // Asteroid Belt between Mars (13.5) and Jupiter (18.0)
    const asteroidCount = 350;
    const asteroidGeo = new THREE.BufferGeometry();
    const asteroidPos = new Float32Array(asteroidCount * 3);
    for (let i = 0; i < asteroidCount; i++) {
      const dist = 15.0 + (Math.random() - 0.5) * 2.2;
      const angle = Math.random() * Math.PI * 2;
      const ySpread = (Math.random() - 0.5) * 0.8;
      asteroidPos[i * 3] = Math.cos(angle) * dist;
      asteroidPos[i * 3 + 1] = ySpread;
      asteroidPos[i * 3 + 2] = Math.sin(angle) * dist;
    }
    asteroidGeo.setAttribute('position', new THREE.BufferAttribute(asteroidPos, 3));
    const asteroidMat = new THREE.PointsMaterial({ size: 0.7, color: 0x94a3b8, transparent: true, opacity: 0.6 });
    const asteroidBelt = new THREE.Points(asteroidGeo, asteroidMat);
    macroGroup.add(asteroidBelt);

    // ==========================================
    // B. QUANTUM MOLECULAR & SUBATOMIC LATTICE
    // ==========================================
    const molecularGroup = new THREE.Group();
    molecularGroup.visible = false;
    scene.add(molecularGroup);
    molecularGroupRef.current = molecularGroup;

    // Multi-atom Hexagonal Graphene / Fullerene Nanoring
    const atomCount = 7;
    const ringRadius = 5.0;
    const atomMeshes: THREE.Mesh[] = [];

    // Central Quantum Core Atom
    const centralNucleusGeo = new THREE.SphereGeometry(1.4, 32, 32);
    const centralNucleusMat = new THREE.MeshPhysicalMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.1,
      clearcoat: 1.0,
      emissive: 0xd97706,
      emissiveIntensity: 0.8
    });
    const centralAtom = new THREE.Mesh(centralNucleusGeo, centralNucleusMat);
    molecularGroup.add(centralAtom);

    // Protons & Neutrons clustered inside central nucleus
    for (let p = 0; p < 8; p++) {
      const nucleonGeo = new THREE.SphereGeometry(0.35, 16, 16);
      const isProton = p % 2 === 0;
      const nucleonMat = new THREE.MeshStandardMaterial({
        color: isProton ? 0xef4444 : 0x06b6d4,
        emissive: isProton ? 0xb91c1c : 0x0891b2,
        emissiveIntensity: 0.5
      });
      const nucleon = new THREE.Mesh(nucleonGeo, nucleonMat);
      const ang = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const dist = 0.6;
      nucleon.position.set(dist * Math.sin(phi) * Math.cos(ang), dist * Math.sin(phi) * Math.sin(ang), dist * Math.cos(phi));
      centralAtom.add(nucleon);
    }

    // Outer 6 Hexagonal Atoms + Covalent Bonds
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const x = Math.cos(angle) * ringRadius;
      const z = Math.sin(angle) * ringRadius;

      // Carbon Atom
      const cGeo = new THREE.SphereGeometry(0.85, 24, 24);
      const cMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.4,
        roughness: 0.2,
        metalness: 0.8
      });
      const cMesh = new THREE.Mesh(cGeo, cMat);
      cMesh.position.set(x, 0, z);
      molecularGroup.add(cMesh);
      atomMeshes.push(cMesh);

      // Covalent Bond to Center (Cylinder)
      const bondLength = ringRadius;
      const bondGeo = new THREE.CylinderGeometry(0.08, 0.08, bondLength, 12);
      const bondMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.6, roughness: 0.3 });
      const bond = new THREE.Mesh(bondGeo, bondMat);
      bond.position.set(x / 2, 0, z / 2);
      bond.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(x, 0, z).normalize());
      molecularGroup.add(bond);

      // Outer Perimeter Bond
      const nextAngle = ((i + 1) / 6) * Math.PI * 2;
      const nx = Math.cos(nextAngle) * ringRadius;
      const nz = Math.sin(nextAngle) * ringRadius;
      const pBondLength = Math.hypot(nx - x, nz - z);
      const pBondGeo = new THREE.CylinderGeometry(0.06, 0.06, pBondLength, 12);
      const pBond = new THREE.Mesh(pBondGeo, bondMat);
      pBond.position.set((x + nx) / 2, 0, (z + nz) / 2);
      pBond.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(nx - x, 0, nz - z).normalize());
      molecularGroup.add(pBond);
    }

    // Orbiting Electron Energy Shells (Torus + Quantum Probability Spheres)
    const electrons: Array<{ mesh: THREE.Mesh; orbitGroup: THREE.Group; speed: number }> = [];
    const shellRadii = [2.8, 4.2, 6.8, 8.6];

    shellRadii.forEach((rad, sIndex) => {
      const shellGroup = new THREE.Group();
      shellGroup.rotation.x = Math.PI / (2.2 + sIndex * 0.4);
      shellGroup.rotation.z = Math.PI / (1.8 + sIndex * 0.5);

      // Torus Orbit Ring
      const ringGeo = new THREE.TorusGeometry(rad, 0.03, 16, 90);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.4 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      shellGroup.add(ring);

      // Electron Sphere with Glow
      const eGeo = new THREE.SphereGeometry(0.22, 16, 16);
      const eMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const eMesh = new THREE.Mesh(eGeo, eMat);
      eMesh.position.set(rad, 0, 0);
      shellGroup.add(eMesh);

      molecularGroup.add(shellGroup);
      electrons.push({ mesh: eMesh, orbitGroup: shellGroup, speed: (4 - sIndex) * 1.5 });
    });
    rotatingElectronsRef.current = electrons;

    // de Broglie Probability Cloud Particles
    const probCount = 800;
    const probGeo = new THREE.BufferGeometry();
    const probPos = new Float32Array(probCount * 3);
    for (let i = 0; i < probCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.5 + Math.random() * 6.5;
      probPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      probPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      probPos[i * 3 + 2] = r * Math.cos(phi);
    }
    probGeo.setAttribute('position', new THREE.BufferAttribute(probPos, 3));
    const probMat = new THREE.PointsMaterial({ size: 1.1, color: 0x38bdf8, transparent: true, opacity: 0.25 });
    const probCloud = new THREE.Points(probGeo, probMat);
    molecularGroup.add(probCloud);

    // ==========================================
    // C. WORMHOLE / BLACK HOLE FLUX TUNNEL
    // ==========================================
    const wormholeCount = 1800;
    const wormholeGeo = new THREE.BufferGeometry();
    const wormholePos = new Float32Array(wormholeCount * 3);
    const wormholeColors = new Float32Array(wormholeCount * 3);

    for (let i = 0; i < wormholeCount; i++) {
      const z = (Math.random() - 0.5) * 80;
      const r = 1.8 + Math.random() * 8.0;
      const ang = Math.random() * Math.PI * 2;
      wormholePos[i * 3] = Math.cos(ang) * r;
      wormholePos[i * 3 + 1] = Math.sin(ang) * r;
      wormholePos[i * 3 + 2] = z;

      wormholeColors[i * 3] = 0.96;
      wormholeColors[i * 3 + 1] = 0.62;
      wormholeColors[i * 3 + 2] = 0.04;
    }
    wormholeGeo.setAttribute('position', new THREE.BufferAttribute(wormholePos, 3));
    wormholeGeo.setAttribute('color', new THREE.BufferAttribute(wormholeColors, 3));
    const wormholeMat = new THREE.PointsMaterial({ size: 1.6, vertexColors: true, transparent: true, opacity: 0.75 });
    const wormholePoints = new THREE.Points(wormholeGeo, wormholeMat);
    wormholePoints.visible = false;
    scene.add(wormholePoints);
    wormholeGroupRef.current = wormholePoints;

    // ==========================================
    // D. ANIMATION LOOP (60 FPS Smooth Tick)
    // ==========================================
    let frameId: number;
    const clock = new THREE.Clock();

    const tick = () => {
      const delta = clock.getDelta();

      // Slow background rotation
      starField.rotation.y += delta * 0.015;

      // Mode: Macro
      if (modeRef.current === 'macro' && isRotatingRef.current) {
        rotatingPlanetsRef.current.forEach((item) => {
          item.angle += item.speed * delta * 0.35;
          item.mesh.position.x = Math.cos(item.angle) * item.orbit;
          item.mesh.position.z = Math.sin(item.angle) * item.orbit;
          item.mesh.rotation.y += delta * 0.7;
        });
        sunMesh.rotation.y += delta * 0.2;
        coronaMesh.rotation.z += delta * 0.15;
      }

      // Mode: Molecular
      if (modeRef.current === 'molecular') {
        molecularGroup.rotation.y += delta * 0.4;
        molecularGroup.rotation.x += delta * 0.2;

        // Animate electron probability speeds
        rotatingElectronsRef.current.forEach((item) => {
          item.orbitGroup.rotation.y += delta * item.speed;
        });
      }

      // Mode: Wormhole
      if (modeRef.current === 'wormhole' && wormholeGroupRef.current) {
        const pAttr = wormholeGroupRef.current.geometry.attributes.position;
        for (let i = 0; i < pAttr.count; i++) {
          let z = pAttr.getZ(i);
          z += delta * 32;
          if (z > 40) z = -40;
          pAttr.setZ(i, z);
        }
        pAttr.needsUpdate = true;
        wormholeGroupRef.current.rotation.z += delta * 0.3;
      }

      controls.update();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };

    tick();

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
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  // Switch Scene Mode
  const handleModeSwitch = (newMode: 'macro' | 'molecular' | 'wormhole') => {
    setMode(newMode);
    const camera = cameraRef.current;
    const controls = controlsRef.current;

    if (!camera || !controls) return;

    if (newMode === 'macro') {
      if (macroGroupRef.current) macroGroupRef.current.visible = true;
      if (molecularGroupRef.current) molecularGroupRef.current.visible = false;
      if (wormholeGroupRef.current) wormholeGroupRef.current.visible = false;
      camera.position.set(0, 18, 38);
      controls.target.set(0, 0, 0);

      setActiveTelemetry({
        scale: '10^21 m (Astrophysical Macro-Scale)',
        coreElement: 'Helium-4 Fusion / Solar Corona',
        quantumFrequency: '432.0 Hz (Cosmic Ground State)',
        planckConst: '6.626 × 10^-34 J·s',
        entropyRate: 'ΔS > 0 (Self-Renewing Dynamic Balance)'
      });

      if (oscRef.current && audioCtxRef.current) {
        oscRef.current.frequency.setValueAtTime(432, audioCtxRef.current.currentTime);
      }
    } else if (newMode === 'molecular') {
      if (macroGroupRef.current) macroGroupRef.current.visible = false;
      if (molecularGroupRef.current) molecularGroupRef.current.visible = true;
      if (wormholeGroupRef.current) wormholeGroupRef.current.visible = false;
      camera.position.set(0, 10, 22);
      controls.target.set(0, 0, 0);

      setActiveTelemetry({
        scale: '10^-10 m (Angstrom Subatomic Lattice)',
        coreElement: 'Carbon-12 Fullerene & Quantum Core',
        quantumFrequency: '528.0 Hz (Solfeggio Harmonic)',
        planckConst: 'h = 6.62607015 × 10^-34',
        entropyRate: 'ΔE·Δt ≥ ℏ/2 (Heisenberg Uncertainty)'
      });

      if (oscRef.current && audioCtxRef.current) {
        oscRef.current.frequency.setValueAtTime(528, audioCtxRef.current.currentTime);
      }
    } else if (newMode === 'wormhole') {
      if (macroGroupRef.current) macroGroupRef.current.visible = false;
      if (molecularGroupRef.current) molecularGroupRef.current.visible = false;
      if (wormholeGroupRef.current) wormholeGroupRef.current.visible = true;
      camera.position.set(0, 0, 25);
      controls.target.set(0, 0, 0);

      setActiveTelemetry({
        scale: 'Space-Time Singularity (Event Horizon)',
        coreElement: 'Photonic Flux Debris (Zero Gravity)',
        quantumFrequency: '741.0 Hz (Intuition & Awakening)',
        planckConst: 'Einstein-Rosen Bridge Metric',
        entropyRate: 'Bekenstein-Hawking Black Hole Entropy'
      });

      if (oscRef.current && audioCtxRef.current) {
        oscRef.current.frequency.setValueAtTime(741, audioCtxRef.current.currentTime);
      }
    }
  };

  const isEn = lang === 'en';
  const isAr = lang === 'ar';

  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-950 border border-amber-500/40 shadow-2xl transition group">
      {/* 3D WebGL Canvas Viewport */}
      <div ref={mountRef} className="w-full h-80 sm:h-96 md:h-[430px] cursor-grab active:cursor-grabbing" />

      {/* Top Floating Controls Bar */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-slate-700/80 p-1.5 rounded-2xl shadow-xl">
          <button
            onClick={() => handleModeSwitch('macro')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              mode === 'macro'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{isEn ? 'Solar Galaxy' : isAr ? 'المجرة والنظام الشمسي' : 'منظومه شمسی و کهکشان'}</span>
          </button>

          <button
            onClick={() => handleModeSwitch('molecular')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              mode === 'molecular'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Atom className="w-3.5 h-3.5" />
            <span>{isEn ? 'Molecular Lattice' : isAr ? 'الشبكة الجزيئية' : 'نمای مولکولی و اتمی'}</span>
          </button>

          <button
            onClick={() => handleModeSwitch('wormhole')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              mode === 'wormhole'
                ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isEn ? 'Wormhole Flux' : isAr ? 'نفق الجسيمات' : 'تونل ذرات سیاه‌چاله'}</span>
          </button>
        </div>

        <div className="pointer-events-auto flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-slate-700/80 p-1.5 rounded-2xl shadow-xl">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`p-2 rounded-xl text-xs transition cursor-pointer ${
              isRotating ? 'bg-slate-800 text-amber-400' : 'bg-slate-950 text-slate-500'
            }`}
            title="چرخش پیوسته مداری"
          >
            <RotateCw className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '10s' }} />
          </button>

          <button
            onClick={toggleAudio}
            className={`p-2 rounded-xl text-xs transition cursor-pointer ${
              audioActive ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-800 text-slate-400'
            }`}
            title="فرکانس هارمونیک کوانتومی"
          >
            {audioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenFullStudio}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center gap-1.5 transition cursor-pointer shadow-lg shadow-amber-500/20"
          >
            <span>{isEn ? 'Full 3D Studio' : 'ورود به استودیو تمام‌صفحه'}</span>
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Philosophical Transformation Decree Banner */}
      <div className="absolute bottom-4 left-4 right-4 pointer-events-none flex flex-col md:flex-row items-center justify-between gap-3 bg-slate-950/85 backdrop-blur-md border border-amber-500/30 p-4 rounded-2xl shadow-2xl">
        <div className="space-y-1 text-center md:text-right">
          <div className="flex items-center justify-center md:justify-start gap-2 text-[11px] text-amber-400 font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>حکمت تحول کیهانی و کوانتومی — اثری از مهدی دل زنده (مهندس مهدی دل زنده):</span>
          </div>
          <p className="text-xs sm:text-sm font-black text-slate-100 tracking-tight leading-relaxed">
            «هر تغییری در زندگی حاکی از فنا و نابودی نیست، بلکه آغاز یک مسیر نو با ویژگی‌ها و افق‌های دیگر است.»
          </p>
        </div>

        {/* Live Scientific Telemetry Bar */}
        <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400 shrink-0 border-t md:border-t-0 md:border-r border-slate-800 pt-2 md:pt-0 md:pr-4">
          <div>
            <span className="text-slate-500 block">مقیاس شبیه‌سازی:</span>
            <span className="text-cyan-300 font-bold">{activeTelemetry.scale}</span>
          </div>
          <div className="hidden sm:block">
            <span className="text-slate-500 block">فرکانس تشدید:</span>
            <span className="text-amber-400 font-bold">{activeTelemetry.quantumFrequency}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
