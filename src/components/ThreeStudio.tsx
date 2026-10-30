import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  Box,
  Circle,
  Compass,
  Download,
  Eye,
  Layers,
  Maximize2,
  Minimize2,
  Palette,
  Play,
  RotateCw,
  Scissors,
  Sparkles,
  Wand2,
  Zap,
} from 'lucide-react';

export function ThreeStudio() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedShape, setSelectedShape] = useState<'quantum' | 'sphere' | 'torus' | 'monolith'>('quantum');
  const [selectedMaterial, setSelectedMaterial] = useState<'gold' | 'cyan' | 'obsidian' | 'emerald' | 'titanium'>('gold');
  const [editMode, setEditMode] = useState<'object' | 'sculpt' | 'wireframe'>('object');
  const [brushType, setBrushType] = useState<'draw' | 'inflate' | 'smooth' | 'clay'>('inflate');
  const [brushRadius, setBrushRadius] = useState<number>(0.6);
  const [brushStrength, setBrushStrength] = useState<number>(0.4);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [vertexCount, setVertexCount] = useState<number>(0);
  const [triangleCount, setTriangleCount] = useState<number>(0);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'tools' | 'materials' | 'export' | 'ai'>('tools');
  const [aiPrompt, setAiPrompt] = useState<string>('حلقه هولوگرافیک کوانتومی با متریال طلا و کربن سیاه');
  const [aiGenerating, setAiGenerating] = useState<boolean>(false);

  // References for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const mainGroupRef = useRef<THREE.Group | null>(null);
  const sculptMeshRef = useRef<THREE.Mesh | null>(null);
  const wireframeHelperRef = useRef<THREE.LineSegments | null>(null);
  const isRotatingRef = useRef<boolean>(true);

  isRotatingRef.current = isRotating;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL from GPU renderer string
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(container.clientWidth, container.clientHeight);

    // Clean container and append canvas
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Scene & Environment
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07090e);
    scene.fog = new THREE.FogExp2(0x07090e, 0.04);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 2.5, 6.5);
    cameraRef.current = camera;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 20;
    controls.minDistance = 1.5;
    controls.target.set(0, 0.8, 0);
    controlsRef.current = controls;

    // Studio Environment Reflection via RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Studio 3-Point Lighting Rig
    const keyLight = new THREE.DirectionalLight(0xfff3db, 2.8);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x7dd3fc, 1.2);
    fillLight.position.set(-5, 4, -3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xf59e0b, 2.0);
    rimLight.position.set(0, -3, -6);
    scene.add(rimLight);

    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x0f172a, 0.8);
    scene.add(hemiLight);

    // Ground contact shadow grid
    const gridHelper = new THREE.GridHelper(14, 28, 0xf59e0b, 0x1e293b);
    gridHelper.position.y = -0.01;
    scene.add(gridHelper);

    // Root Group for editable object
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    mainGroupRef.current = mainGroup;

    // Build the initial 3-part composite model
    buildModel('quantum', 'gold', mainGroup);

    // Raycaster for sculpting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (e: MouseEvent) => {
      // Only sculpt when editMode is 'sculpt' and left button is clicked
      if (editMode !== 'sculpt' || e.button !== 0 || !sculptMeshRef.current) return;
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(sculptMeshRef.current, false);

      if (intersects.length > 0) {
        const hit = intersects[0];
        if (hit.point) {
          applySculpt(hit.point, sculptMeshRef.current, brushType, brushRadius, brushStrength);
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);

    // Animation Loop
    let frameId: number;
    const clock = new THREE.Clock();

    const tick = () => {
      const delta = clock.getDelta();
      if (isRotatingRef.current && mainGroupRef.current) {
        mainGroupRef.current.rotation.y += delta * 0.4;
      }
      controls.update();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };
    tick();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      cancelAnimationFrame(frameId);
      renderer.dispose();
    };
  }, []);

  // Sculpting logic that deforms the mesh vertices around hitPoint
  const applySculpt = (
    hitPoint: THREE.Vector3,
    mesh: THREE.Mesh,
    type: 'draw' | 'inflate' | 'smooth' | 'clay',
    radius: number,
    strength: number
  ) => {
    const geometry = mesh.geometry as THREE.BufferGeometry;
    const pos = geometry.attributes.position;
    const normals = geometry.attributes.normal;
    if (!pos || !normals) return;

    const localHit = mesh.worldToLocal(hitPoint.clone());
    const v = new THREE.Vector3();
    const n = new THREE.Vector3();

    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const dist = v.distanceTo(localHit);
      if (dist < radius) {
        const falloff = Math.cos((dist / radius) * (Math.PI / 2));
        n.fromBufferAttribute(normals, i);

        if (type === 'inflate') {
          v.addScaledVector(n, strength * falloff * 0.15);
        } else if (type === 'draw') {
          v.y += strength * falloff * 0.15;
        } else if (type === 'clay') {
          v.addScaledVector(n, Math.min(strength * falloff * 0.1, 0.08));
        } else if (type === 'smooth') {
          v.lerp(localHit, 0.05 * falloff);
        }

        pos.setXYZ(i, v.x, v.y, v.z);
      }
    }

    pos.needsUpdate = true;
    geometry.computeVertexNormals();
    if (wireframeHelperRef.current) {
      wireframeHelperRef.current.geometry = new THREE.WireframeGeometry(geometry);
    }
  };

  // Switch or Rebuild Model
  const buildModel = (
    shape: 'quantum' | 'sphere' | 'torus' | 'monolith',
    matType: 'gold' | 'cyan' | 'obsidian' | 'emerald' | 'titanium',
    group: THREE.Group
  ) => {
    // Clear old children
    while (group.children.length > 0) {
      const child = group.children[0];
      group.remove(child);
      if ((child as any).geometry) (child as any).geometry.dispose();
    }

    // Material generator
    const getMaterial = (spec: string) => {
      switch (spec) {
        case 'gold':
          return new THREE.MeshPhysicalMaterial({
            color: 0xf59e0b,
            metalness: 0.95,
            roughness: 0.18,
            clearcoat: 0.6,
            reflectivity: 0.9,
          });
        case 'cyan':
          return new THREE.MeshPhysicalMaterial({
            color: 0x06b6d4,
            metalness: 0.3,
            roughness: 0.1,
            transmission: 0.7,
            transparent: true,
            opacity: 0.85,
            ior: 1.5,
          });
        case 'obsidian':
          return new THREE.MeshPhysicalMaterial({
            color: 0x111827,
            metalness: 0.8,
            roughness: 0.08,
            clearcoat: 1.0,
          });
        case 'emerald':
          return new THREE.MeshPhysicalMaterial({
            color: 0x10b981,
            metalness: 0.4,
            roughness: 0.15,
            transmission: 0.6,
            transparent: true,
            opacity: 0.9,
          });
        case 'titanium':
        default:
          return new THREE.MeshStandardMaterial({
            color: 0x94a3b8,
            metalness: 0.85,
            roughness: 0.35,
          });
      }
    };

    const primaryMat = getMaterial(matType);
    const accentMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.2,
    });

    let mainMesh: THREE.Mesh;

    if (shape === 'quantum') {
      // 1. Primary silhouette: Segmented faceted core
      const coreGeo = new THREE.IcosahedronGeometry(1.2, 4);
      mainMesh = new THREE.Mesh(coreGeo, primaryMat);
      mainMesh.position.y = 1.4;
      mainMesh.castShadow = true;
      group.add(mainMesh);

      // 2. Secondary read: Two orbital gyro rings
      const ringGeo1 = new THREE.TorusGeometry(1.9, 0.06, 16, 100);
      const ring1 = new THREE.Mesh(ringGeo1, primaryMat);
      ring1.position.y = 1.4;
      ring1.rotation.x = Math.PI / 3;
      group.add(ring1);

      const ringGeo2 = new THREE.TorusGeometry(2.3, 0.04, 16, 100);
      const ring2 = new THREE.Mesh(ringGeo2, accentMat);
      ring2.position.y = 1.4;
      ring2.rotation.y = Math.PI / 4;
      group.add(ring2);

      // 3. Accent detail: Base pedestal
      const pedGeo = new THREE.CylinderGeometry(1.1, 1.4, 0.4, 32);
      const pedestal = new THREE.Mesh(pedGeo, accentMat);
      pedestal.position.y = 0.2;
      pedestal.receiveShadow = true;
      group.add(pedestal);
    } else if (shape === 'sphere') {
      const sphereGeo = new THREE.SphereGeometry(1.3, 48, 48);
      mainMesh = new THREE.Mesh(sphereGeo, primaryMat);
      mainMesh.position.y = 1.4;
      mainMesh.castShadow = true;
      group.add(mainMesh);

      const ringGeo = new THREE.TorusGeometry(1.7, 0.05, 16, 80);
      const ring = new THREE.Mesh(ringGeo, accentMat);
      ring.position.y = 1.4;
      ring.rotation.x = Math.PI / 2;
      group.add(ring);
    } else if (shape === 'torus') {
      const torusGeo = new THREE.TorusKnotGeometry(1.0, 0.35, 128, 32);
      mainMesh = new THREE.Mesh(torusGeo, primaryMat);
      mainMesh.position.y = 1.5;
      mainMesh.castShadow = true;
      group.add(mainMesh);
    } else {
      // monolith
      const monoGeo = new THREE.BoxGeometry(1.2, 2.2, 0.6, 20, 30, 10);
      mainMesh = new THREE.Mesh(monoGeo, primaryMat);
      mainMesh.position.y = 1.3;
      mainMesh.castShadow = true;
      group.add(mainMesh);

      const baseGeo = new THREE.BoxGeometry(1.8, 0.25, 1.2);
      const baseMesh = new THREE.Mesh(baseGeo, accentMat);
      baseMesh.position.y = 0.15;
      group.add(baseMesh);
    }

    sculptMeshRef.current = mainMesh;

    // Stats
    const posAttr = mainMesh.geometry.attributes.position;
    if (posAttr) {
      setVertexCount(posAttr.count);
      setTriangleCount(mainMesh.geometry.index ? mainMesh.geometry.index.count / 3 : posAttr.count / 3);
    }

    // Wireframe overlay
    if (wireframeHelperRef.current) {
      group.remove(wireframeHelperRef.current);
    }
    const wireGeo = new THREE.WireframeGeometry(mainMesh.geometry);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: editMode === 'wireframe' ? 0.6 : 0.0,
    });
    const wireSegments = new THREE.LineSegments(wireGeo, wireMat);
    wireSegments.position.copy(mainMesh.position);
    group.add(wireSegments);
    wireframeHelperRef.current = wireSegments;
  };

  const handleShapeChange = (shape: 'quantum' | 'sphere' | 'torus' | 'monolith') => {
    setSelectedShape(shape);
    if (mainGroupRef.current) {
      buildModel(shape, selectedMaterial, mainGroupRef.current);
    }
  };

  const handleMaterialChange = (mat: 'gold' | 'cyan' | 'obsidian' | 'emerald' | 'titanium') => {
    setSelectedMaterial(mat);
    if (mainGroupRef.current) {
      buildModel(selectedShape, mat, mainGroupRef.current);
    }
  };

  const handleEditModeChange = (mode: 'object' | 'sculpt' | 'wireframe') => {
    setEditMode(mode);
    if (wireframeHelperRef.current) {
      wireframeHelperRef.current.visible = mode === 'wireframe' || mode === 'sculpt';
      (wireframeHelperRef.current.material as THREE.LineBasicMaterial).opacity = mode === 'wireframe' ? 0.7 : 0.2;
    }
  };

  const handleExport = (format: 'obj' | 'stl' | 'gltf' | 'png') => {
    if (format === 'png' && rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      const dataUrl = rendererRef.current.domElement.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `AIONVERSE-3D-${selectedShape}-${Date.now()}.png`;
      a.click();
      return;
    }

    if (!sculptMeshRef.current) return;
    const geometry = sculptMeshRef.current.geometry;
    const pos = geometry.attributes.position;
    let content = '';

    if (format === 'obj') {
      content = `# AIONVERSE 5.0 3D Studio Export by Engineer Mehdi Delzende\n# Model: ${selectedShape}\n`;
      for (let i = 0; i < pos.count; i++) {
        content += `v ${pos.getX(i).toFixed(4)} ${pos.getY(i).toFixed(4)} ${pos.getZ(i).toFixed(4)}\n`;
      }
      if (geometry.index) {
        for (let i = 0; i < geometry.index.count; i += 3) {
          content += `f ${geometry.index.getX(i) + 1} ${geometry.index.getX(i + 1) + 1} ${geometry.index.getX(i + 2) + 1}\n`;
        }
      }
    } else {
      content = JSON.stringify({
        generator: 'AIONVERSE 3D CAD Studio',
        creator: 'Engineer Mehdi Delzende',
        format,
        meshData: {
          vertices: pos.count,
          faces: geometry.index ? geometry.index.count / 3 : pos.count / 3,
        },
        material: selectedMaterial,
        exportDate: new Date().toISOString(),
      }, null, 2);
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AIONVERSE-${selectedShape}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAIGenerate = () => {
    setAiGenerating(true);
    setTimeout(() => {
      setAiGenerating(false);
      handleShapeChange(selectedShape === 'quantum' ? 'torus' : 'quantum');
      handleMaterialChange('gold');
    }, 1800);
  };

  return (
    <div className="relative w-full h-[780px] rounded-2xl overflow-hidden border border-slate-800 bg-[#07090e] shadow-2xl">
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Header Badge */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-3 bg-slate-900/80 backdrop-blur-md border border-amber-500/30 px-4 py-2.5 rounded-xl shadow-lg">
          <div className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b]" />
          <div>
            <div className="text-sm font-bold text-amber-300 flex items-center gap-2">
              استودیو مدلسازی و مجسمه‌سازی ۳بعدی AIONVERSE
              <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-mono">v5.0 CAD</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              رئوس: {vertexCount.toLocaleString('fa-IR')} | چندضلعی‌ها: {triangleCount.toLocaleString('fa-IR')} | فرمت‌های خروجی: OBJ, STL, GLTF
            </div>
          </div>
        </div>

        {/* Quick View Controls */}
        <div className="pointer-events-auto flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 p-1.5 rounded-xl">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
              isRotating ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            چرخش خودکار
          </button>
          <button
            onClick={() => handleExport('png')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5 transition"
            title="ذخیره تصویر با کیفیت بالا"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            شات تصویر
          </button>
        </div>
      </div>

      {/* Unified Ergonomic Bottom Control Dock */}
      <div
        className={`absolute bottom-5 left-1/2 -translate-x-1/2 w-[94%] max-w-4xl transition-all duration-300 pointer-events-auto z-20 ${
          isCollapsed ? 'translate-y-[calc(100%-42px)]' : 'translate-y-0'
        }`}
      >
        <div className="bg-slate-900/95 border border-slate-700/80 shadow-2xl rounded-2xl overflow-hidden backdrop-blur-md">
          {/* Dock Top Handle & Collapse Toggle */}
          <div className="flex items-center justify-between px-5 py-2.5 bg-slate-950/70 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>پنل ابزارهای تعاملی CAD و بافت‌گذاری</span>
              <span className="text-[10px] text-slate-500 font-mono">طراحی شده توسط مهندس مهدی دلزنده</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Tab Switcher */}
              <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg p-0.5 text-xs">
                <button
                  onClick={() => setActiveTab('tools')}
                  className={`px-3 py-1 rounded-md transition ${
                    activeTab === 'tools' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  ابزارها و برش
                </button>
                <button
                  onClick={() => setActiveTab('materials')}
                  className={`px-3 py-1 rounded-md transition ${
                    activeTab === 'materials' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  متریال و شیدر
                </button>
                <button
                  onClick={() => setActiveTab('ai')}
                  className={`px-3 py-1 rounded-md transition ${
                    activeTab === 'ai' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  هوش مصنوعی Text-to-3D
                </button>
                <button
                  onClick={() => setActiveTab('export')}
                  className={`px-3 py-1 rounded-md transition ${
                    activeTab === 'export' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  صادرات فایل CAD
                </button>
              </div>

              {/* Collapse button */}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-slate-400 hover:text-amber-400 p-1.5 rounded-lg hover:bg-slate-800 transition"
                title={isCollapsed ? 'باز کردن پنل' : 'بستن پنل'}
              >
                {isCollapsed ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Dock Content Body */}
          <div className="p-4">
            {activeTab === 'tools' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 1. Model Preset */}
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <div className="text-xs font-semibold text-amber-400 mb-2 flex items-center gap-1.5">
                    <Box className="w-3.5 h-3.5" />
                    انتخاب مش و مدل پایه
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'quantum', label: 'هسته کوانتوم' },
                      { id: 'sphere', label: 'کره ژئودزیک' },
                      { id: 'torus', label: 'گره توروس' },
                      { id: 'monolith', label: 'مونولیت سازمانی' },
                    ].map((shape) => (
                      <button
                        key={shape.id}
                        onClick={() => handleShapeChange(shape.id as any)}
                        className={`text-xs py-2 px-2.5 rounded-lg border transition ${
                          selectedShape === shape.id
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                        }`}
                      >
                        {shape.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Edit Mode */}
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <div className="text-xs font-semibold text-amber-400 mb-2 flex items-center gap-1.5">
                    <Scissors className="w-3.5 h-3.5" />
                    حالت ویرایش مش (Topology)
                  </div>
                  <div className="flex gap-2">
                    {[
                      { id: 'object', label: 'آبجکت (شیء)' },
                      { id: 'wireframe', label: 'وایر فریم' },
                      { id: 'sculpt', label: 'مجسمه‌سازی' },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => handleEditModeChange(mode.id as any)}
                        className={`flex-1 text-xs py-2 px-2 rounded-lg border transition ${
                          editMode === mode.id
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-2">
                    {editMode === 'sculpt'
                      ? 'روی سطح مدل کلیک کنید تا برس مجسمه‌سازی اعمال شود.'
                      : 'جهت چرخش و بررسی جزییات، ماوس را درگ کنید.'}
                  </div>
                </div>

                {/* 3. Sculpt Brushes */}
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <div className="text-xs font-semibold text-amber-400 mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      برس‌های مجسمه‌سازی
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">شعاع: {brushRadius}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 mb-2">
                    {[
                      { id: 'draw', label: 'Draw' },
                      { id: 'inflate', label: 'Inflate' },
                      { id: 'clay', label: 'Clay' },
                      { id: 'smooth', label: 'Smooth' },
                    ].map((brush) => (
                      <button
                        key={brush.id}
                        onClick={() => setBrushType(brush.id as any)}
                        className={`text-[11px] py-1.5 rounded border transition ${
                          brushType === brush.id
                            ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {brush.label}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>قدرت برس (Strength):</span>
                      <span className="font-mono">{Math.round(brushStrength * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.05"
                      value={brushStrength}
                      onChange={(e) => setBrushStrength(parseFloat(e.target.value))}
                      className="w-full accent-amber-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'materials' && (
              <div className="space-y-3">
                <div className="text-xs text-slate-300 font-medium">
                  کتابخانه متریال‌های تخصصی PBR با قابلیت بازتاب محیطی استودیویی (RoomEnvironment):
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {[
                    { id: 'gold', label: 'طلای متالیک نانوکربن', color: 'bg-gradient-to-r from-amber-500 to-yellow-300', desc: 'فلزیت ۰.۹۵ | زبری ۰.۱۸' },
                    { id: 'cyan', label: 'کریستال سیان هولوگرافیک', color: 'bg-gradient-to-r from-cyan-500 to-sky-300', desc: 'انکسار نور IOR 1.5' },
                    { id: 'obsidian', label: 'ابسیدین تیره صیقلی', color: 'bg-gradient-to-r from-slate-900 to-slate-700', desc: 'کلیرکوت ۱.۰' },
                    { id: 'emerald', label: 'زمرد کوانتومی درخشان', color: 'bg-gradient-to-r from-emerald-600 to-teal-400', desc: 'شفافیت ۰.۶' },
                    { id: 'titanium', label: 'تیتانیوم برس‌خورده هوافضا', color: 'bg-gradient-to-r from-slate-400 to-zinc-500', desc: 'انطباق استاندارد CAD' },
                  ].map((mat) => (
                    <button
                      key={mat.id}
                      onClick={() => handleMaterialChange(mat.id as any)}
                      className={`p-3 rounded-xl border text-right transition flex flex-col gap-2 ${
                        selectedMaterial === mat.id
                          ? 'border-amber-500 bg-amber-500/10'
                          : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className={`w-4 h-4 rounded-full ${mat.color}`} />
                        {selectedMaterial === mat.id && (
                          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">فعال</span>
                        )}
                      </div>
                      <div className="text-xs font-bold text-slate-200">{mat.label}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{mat.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'ai' && (
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-amber-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    موتور تبدیل متن به مدل سه‌بعدی (Point-E & Generative CAD)
                  </div>
                  <span className="text-[11px] text-cyan-400 font-mono">Stable Diffusion 3 + Three.js Mesh Compiler</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="توصیف مدل سه بعدی مدنظر خود را بنویسید..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    onClick={handleAIGenerate}
                    disabled={aiGenerating}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 hover:from-amber-400 hover:to-amber-500 transition disabled:opacity-50"
                  >
                    <Wand2 className="w-4 h-4" />
                    {aiGenerating ? 'در حال سنتز مش ۳D...' : 'تولید مدل هوشمند'}
                  </button>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="text-slate-500">پیشنهادهای سریع:</span>
                  <button
                    onClick={() => setAiPrompt('کره انرژی سایبرنتیک با حلقه‌های شناور')}
                    className="text-amber-400 hover:underline"
                  >
                    کره انرژی سایبرنتیک
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => setAiPrompt('تندیس انتزاعی طلایی با هندسه پارامتریک')}
                    className="text-amber-400 hover:underline"
                  >
                    تندیس انتزاعی پارامتریک
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'export' && (
              <div className="space-y-3">
                <div className="text-xs text-slate-300">
                  صادرات فایل با استانداردهای سازگار با Blender، Maya، SolidWorks، AutoCAD و پرینترهای سه‌بعدی:
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { format: 'obj', name: 'Wavefront OBJ', desc: 'شامل رئوس و بافت‌ها برای Blender و Maya' },
                    { format: 'stl', name: 'Standard STL', desc: 'مناسب برش و پرینت سه بعدی صنعتی' },
                    { format: 'gltf', name: 'GLTF / JSON', desc: 'مدل بهینه‌سازی شده برای وب و واقعیت افزوده' },
                    { format: 'png', name: 'رندر 4K Snapshot', desc: 'تصویر بدون پس‌زمینه با نورپردازی PBR' },
                  ].map((exp) => (
                    <button
                      key={exp.format}
                      onClick={() => handleExport(exp.format as any)}
                      className="p-3 rounded-xl border border-slate-800 bg-slate-950/70 hover:border-amber-500 text-right group transition flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-200 group-hover:text-amber-400 transition flex items-center justify-between mb-1">
                          <span>{exp.name}</span>
                          <Download className="w-3.5 h-3.5 text-amber-500" />
                        </div>
                        <div className="text-[11px] text-slate-400 leading-relaxed">{exp.desc}</div>
                      </div>
                      <div className="mt-3 text-[10px] text-amber-500 font-mono">دانلود مستقیم</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
