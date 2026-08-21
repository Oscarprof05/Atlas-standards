import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Layers,
  Factory,
  MapPin,
  CheckCircle2,
  ChevronDown,
  Compass,
  Eye,
} from 'lucide-react';

interface KaapuStoryExperienceProps {
  onStartProject: () => void;
  onExploreDeep: () => void;
}

interface KaapuKeyframe {
  progress: number;
  posDesktop: [number, number, number];
  posMobile: [number, number, number];
  rot: [number, number, number]; // [rotX, rotY, rotZ]
  scale: number;
}

const KEYFRAMES: KaapuKeyframe[] = [
  // 0. Hero (0%): Completely still, resting center pose
  {
    progress: 0.0,
    posDesktop: [0, 0.15, 0],
    posMobile: [0, 0.15, 0],
    rot: [0.95, 0.55, -0.35],
    scale: 1.0,
  },
  // Hold still during initial hero reading
  {
    progress: 0.09,
    posDesktop: [0, 0.15, 0],
    posMobile: [0, 0.15, 0],
    rot: [0.95, 0.55, -0.35],
    scale: 1.0,
  },
  // 1. Brands & Startups (20%): Glides smoothly to the right, gentle tilt catching rim light
  {
    progress: 0.20,
    posDesktop: [1.15, 0.05, 0.15],
    posMobile: [0, -0.35, -0.3],
    rot: [1.05, 0.25, -0.15],
    scale: 1.05,
  },
  // 2. Idea to Product (37%): Glides across to the left, showing inner precision cross-section
  {
    progress: 0.37,
    posDesktop: [-1.15, -0.05, 0.15],
    posMobile: [0, -0.35, -0.3],
    rot: [0.75, 0.85, -0.45],
    scale: 1.05,
  },
  // 3. Product Development / Specs (54%): Centers, comes slightly closer to camera for macro spec tags
  {
    progress: 0.54,
    posDesktop: [0, 0.02, 0.65],
    posMobile: [0, 0.05, 0.1],
    rot: [0.60, 0.50, -0.20],
    scale: 1.18,
  },
  // 4. Manufacturing & AQL 1.5 Quality (71%): Glides to the right, solid structural perspective
  {
    progress: 0.71,
    posDesktop: [1.15, -0.05, 0.15],
    posMobile: [0, -0.35, -0.3],
    rot: [1.20, 0.65, -0.30],
    scale: 1.05,
  },
  // 5. Sourcing Network & Hubs (86%): Glides to the left, elevated compass viewpoint
  {
    progress: 0.86,
    posDesktop: [-1.15, 0.08, 0.15],
    posMobile: [0, -0.35, -0.3],
    rot: [0.85, 0.35, -0.20],
    scale: 1.05,
  },
  // 6. Settle & Initiate Project (100%): Gracefully glides back to center horizon
  {
    progress: 1.0,
    posDesktop: [0, 0.18, 0.05],
    posMobile: [0, 0.15, 0],
    rot: [0.95, 0.55, -0.35],
    scale: 1.0,
  },
];

function smoothstep(min: number, max: number, value: number) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

function interpolateKeyframes(p: number, isMobile: boolean) {
  const clampedP = Math.max(0, Math.min(1, p));
  let prev = KEYFRAMES[0];
  let next = KEYFRAMES[KEYFRAMES.length - 1];

  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    if (clampedP >= KEYFRAMES[i].progress && clampedP <= KEYFRAMES[i + 1].progress) {
      prev = KEYFRAMES[i];
      next = KEYFRAMES[i + 1];
      break;
    }
  }

  const range = next.progress - prev.progress;
  const factor = range === 0 ? 0 : smoothstep(prev.progress, next.progress, clampedP);

  const prevPos = isMobile ? prev.posMobile : prev.posDesktop;
  const nextPos = isMobile ? next.posMobile : next.posDesktop;

  const posX = prevPos[0] + (nextPos[0] - prevPos[0]) * factor;
  const posY = prevPos[1] + (nextPos[1] - prevPos[1]) * factor;
  const posZ = prevPos[2] + (nextPos[2] - prevPos[2]) * factor;

  const rotX = prev.rot[0] + (next.rot[0] - prev.rot[0]) * factor;
  const rotY = prev.rot[1] + (next.rot[1] - prev.rot[1]) * factor;
  const rotZ = prev.rot[2] + (next.rot[2] - prev.rot[2]) * factor;

  const scale = prev.scale + (next.scale - prev.scale) * factor;

  return { posX, posY, posZ, rotX, rotY, rotZ, scale };
}

export const KaapuStoryExperience: React.FC<KaapuStoryExperienceProps> = ({
  onStartProject,
  onExploreDeep,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Story scroll progress (0.0 to 1.0)
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isCanvasLoaded, setIsCanvasLoaded] = useState(false);

  // Three.js References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const kaapuGroupRef = useRef<THREE.Group | null>(null);
  const infinityParticlesRef = useRef<THREE.Points | null>(null);
  const infinityRibbonRef = useRef<THREE.Mesh | null>(null);
  const infinityCurveRef = useRef<THREE.CatmullRomCurve3 | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Inertial and spatial targets
  const targetRotationYRef = useRef(0.55);
  const currentRotationYRef = useRef(0.55);
  const targetRotationXRef = useRef(0.95);
  const currentRotationXRef = useRef(0.95);
  const targetRotationZRef = useRef(-0.35);
  const currentRotationZRef = useRef(-0.35);

  const targetPosXRef = useRef(0);
  const currentPosXRef = useRef(0);
  const targetPosYRef = useRef(0.15);
  const currentPosYRef = useRef(0.15);
  const targetPosZRef = useRef(0);
  const currentPosZRef = useRef(0);
  const targetScaleRef = useRef(1.0);
  const currentScaleRef = useRef(1.0);

  const mouseOffset = useRef({ x: 0, y: 0 });
  const mouseTarget = useRef({ x: 0, y: 0 });

  // Story Stages Definition
  const stages = [
    {
      id: 'origin',
      step: '00',
      label: 'HERO',
      title: 'THE ORIGIN',
      range: [0.0, 0.12],
    },
    {
      id: 'brands',
      step: '01',
      label: 'BRANDS & STARTUPS',
      title: 'BUILT FOR VISIONARIES',
      range: [0.13, 0.28],
    },
    {
      id: 'pipeline',
      step: '02',
      label: 'IDEA TO PRODUCT',
      title: 'THE PIPELINE',
      range: [0.29, 0.45],
    },
    {
      id: 'specs',
      step: '03',
      label: 'PRODUCT DEVELOPMENT',
      title: 'FABRIC & SPECIFICATIONS',
      range: [0.46, 0.62],
    },
    {
      id: 'manufacturing',
      step: '04',
      label: 'MANUFACTURING',
      title: 'AQL 1.5 AUDIT PROTOCOLS',
      range: [0.63, 0.78],
    },
    {
      id: 'network',
      step: '05',
      label: 'NETWORK',
      title: 'PRODUCTION CLUSTERS',
      range: [0.79, 0.92],
    },
    {
      id: 'contact',
      step: '06',
      label: 'CONTACT',
      title: 'INITIATE PRODUCTION',
      range: [0.93, 1.0],
    },
  ];

  // 1. Scroll tracking inside pinned track
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.min(1, Math.max(0, -rect.top / totalScrollable));
      setScrollProgress(progress);

      // Determine active stage
      const stageIdx = stages.findIndex(
        (s) => progress >= s.range[0] && progress <= s.range[1]
      );
      if (stageIdx !== -1) {
        setCurrentStageIndex(stageIdx);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Mouse Parallax Handler
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseTarget.current.x = (clientX / innerWidth - 0.5) * 2;
    mouseTarget.current.y = (clientY / innerHeight - 0.5) * 2;
  };

  // Jump directly to a stage
  const jumpToStage = (stageIdx: number) => {
    if (!containerRef.current) return;
    const targetRange = stages[stageIdx].range;
    const targetProgress = (targetRange[0] + targetRange[1]) / 2;
    const containerTop = containerRef.current.offsetTop;
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
    const scrollTarget = containerTop + targetProgress * totalScrollable;

    window.scrollTo({
      top: scrollTarget,
      behavior: 'smooth',
    });
  };

  // 3. Three.js Engine Setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.02);
    sceneRef.current = scene;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Fixed Studio Perspective Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.1, 4.8);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;

    // Studio Lighting Rig
    const keyLight = new THREE.DirectionalLight(0xffffff, 4.5);
    keyLight.position.set(4, 6, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd8e2ec, 4.0);
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x94a3b8, 2.2);
    fillLight.position.set(-4, 3, 3);
    scene.add(fillLight);

    const bottomBounce = new THREE.PointLight(0xffffff, 2.2, 12);
    bottomBounce.position.set(0, -3, 2);
    scene.add(bottomBounce);

    const ambientLight = new THREE.AmbientLight(0x222222, 1.2);
    scene.add(ambientLight);

    // Procedural HDR reflections for authentic brushed stainless steel
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envScene = new THREE.Scene();
    const envLight1 = new THREE.DirectionalLight(0xffffff, 8);
    envLight1.position.set(1, 1, 1);
    envScene.add(envLight1);
    const envLight2 = new THREE.DirectionalLight(0xa0aec0, 5);
    envLight2.position.set(-1, -1, -1);
    envScene.add(envLight2);
    const envRenderTarget = pmremGenerator.fromScene(envScene);
    scene.environment = envRenderTarget.texture;

    // BUILD THE 3D KAAPU (Master Torus + Chamfers + Inner Laser Engraving)
    const kaapuMasterGroup = new THREE.Group();
    kaapuGroupRef.current = kaapuMasterGroup;
    scene.add(kaapuMasterGroup);

    const outerRadius = 1.32;
    const thickness = 0.14;
    const radialSegments = 128;
    const tubularSegments = 180;

    // Brushed Stainless Steel Material
    const steelMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xf2f4f8),
      metalness: 0.98,
      roughness: 0.16,
      envMapIntensity: 2.6,
      flatShading: false,
    });

    const innerSteelMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x888888),
      metalness: 0.94,
      roughness: 0.28,
      envMapIntensity: 1.8,
    });

    // Main ring body
    const mainRingGeo = new THREE.TorusGeometry(outerRadius, thickness, radialSegments, tubularSegments);
    const mainRing = new THREE.Mesh(mainRingGeo, steelMaterial);
    kaapuMasterGroup.add(mainRing);

    // Specular highlight bevel rim
    const bevelTopGeo = new THREE.TorusGeometry(outerRadius + 0.02, thickness * 0.45, 32, tubularSegments);
    const bevelTop = new THREE.Mesh(bevelTopGeo, steelMaterial);
    bevelTop.scale.set(1, 1, 0.95);
    kaapuMasterGroup.add(bevelTop);

    // Inner laser etched precision groove
    const innerGrooveGeo = new THREE.TorusGeometry(outerRadius - 0.03, thickness * 0.4, 32, tubularSegments);
    const innerGroove = new THREE.Mesh(innerGrooveGeo, innerSteelMaterial);
    kaapuMasterGroup.add(innerGroove);

    // Initial Stationary Orientation (Reference Pose)
    kaapuMasterGroup.rotation.x = 0.95;
    kaapuMasterGroup.rotation.y = 0.55;
    kaapuMasterGroup.rotation.z = -0.35;
    kaapuMasterGroup.position.set(0, 0.15, 0);

    // BUILD THE INFINITY LIQUID CHROME PATH & CONTINUOUS PARTICLES
    const curvePoints: THREE.Vector3[] = [];
    const numPoints = 320;
    const scaleA = 2.85;

    for (let i = 0; i <= numPoints; i++) {
      const t = (i / numPoints) * Math.PI * 2;
      const denom = 1 + Math.sin(t) * Math.sin(t);
      const x = (scaleA * Math.cos(t)) / denom;
      const y = ((scaleA * Math.sin(t) * Math.cos(t)) / denom) * 0.85;
      const z = -0.55 + Math.sin(t * 2) * 0.15;
      curvePoints.push(new THREE.Vector3(x, y, z));
    }

    const infinityCurve = new THREE.CatmullRomCurve3(curvePoints, true);
    infinityCurveRef.current = infinityCurve;

    // Glowing Liquid Chrome Ribbon
    const tubeGeometry = new THREE.TubeGeometry(infinityCurve, 220, 0.022, 16, true);
    const ribbonMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xffffff),
      emissive: new THREE.Color(0xdddddd),
      emissiveIntensity: 0.75,
      metalness: 0.98,
      roughness: 0.1,
      transparent: true,
      opacity: 0.65,
    });
    const infinityRibbon = new THREE.Mesh(tubeGeometry, ribbonMaterial);
    infinityRibbonRef.current = infinityRibbon;
    scene.add(infinityRibbon);

    // Continuous Molten Steel Particles Flowing Along Infinity Path
    const particleCount = 700;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleOffsets = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount;
      const pt = infinityCurve.getPoint(t);
      particlePositions[i * 3] = pt.x + (Math.random() - 0.5) * 0.05;
      particlePositions[i * 3 + 1] = pt.y + (Math.random() - 0.5) * 0.05;
      particlePositions[i * 3 + 2] = pt.z + (Math.random() - 0.5) * 0.05;
      particleOffsets[i] = t;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('offset', new THREE.BufferAttribute(particleOffsets, 1));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.038,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const infinityParticles = new THREE.Points(particleGeo, particleMaterial);
    infinityParticlesRef.current = infinityParticles;
    scene.add(infinityParticles);

    setIsCanvasLoaded(true);

    // ANIMATION LOOP
    const clock = new THREE.Clock();
    let time = 0;

    const animate = () => {
      const delta = clock.getDelta();
      time += delta;

      // Subtle mouse Parallax Lerp
      mouseOffset.current.x += (mouseTarget.current.x - mouseOffset.current.x) * 0.05;
      mouseOffset.current.y += (mouseTarget.current.y - mouseOffset.current.y) * 0.05;

      // KAAPU TRANSFORMS: Smoothly Glide to Narrative Spatial Keyframes
      if (kaapuMasterGroup) {
        // Interpolate rotation, positions, and scale with smooth cinematic damping
        currentRotationYRef.current += (targetRotationYRef.current - currentRotationYRef.current) * 0.07;
        currentRotationXRef.current += (targetRotationXRef.current - currentRotationXRef.current) * 0.07;
        currentRotationZRef.current += (targetRotationZRef.current - currentRotationZRef.current) * 0.07;

        currentPosXRef.current += (targetPosXRef.current - currentPosXRef.current) * 0.07;
        currentPosYRef.current += (targetPosYRef.current - currentPosYRef.current) * 0.07;
        currentPosZRef.current += (targetPosZRef.current - currentPosZRef.current) * 0.07;

        currentScaleRef.current += (targetScaleRef.current - currentScaleRef.current) * 0.07;

        // Apply transforms with subtle mouse parallax response
        kaapuMasterGroup.rotation.y = currentRotationYRef.current + mouseOffset.current.x * 0.08;
        kaapuMasterGroup.rotation.x = currentRotationXRef.current + mouseOffset.current.y * 0.08;
        kaapuMasterGroup.rotation.z = currentRotationZRef.current;

        kaapuMasterGroup.position.x = currentPosXRef.current + mouseOffset.current.x * 0.06;
        kaapuMasterGroup.position.y = currentPosYRef.current - mouseOffset.current.y * 0.06;
        kaapuMasterGroup.position.z = currentPosZRef.current;

        kaapuMasterGroup.scale.setScalar(currentScaleRef.current);
      }

      // INFINITY LIQUID CHROME FLOW (Always continuously alive in background)
      if (infinityParticlesRef.current && infinityCurveRef.current) {
        const positions = infinityParticlesRef.current.geometry.attributes.position.array as Float32Array;
        const flowSpeed = 0.12;

        for (let i = 0; i < particleCount; i++) {
          const t = (particleOffsets[i] + time * flowSpeed) % 1;
          const pt = infinityCurveRef.current.getPoint(t);
          const jitter = Math.sin(time * 3 + i) * 0.015;
          positions[i * 3] = pt.x + jitter;
          positions[i * 3 + 1] = pt.y + jitter;
          positions[i * 3 + 2] = pt.z;
        }
        infinityParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Subtle pulse to ribbon emissive glow
      if (infinityRibbonRef.current) {
        const mat = infinityRibbonRef.current.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 0.6 + Math.sin(time * 2) * 0.25;
      }

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!renderer || !camera) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      renderer.dispose();
    };
  }, []);

  // 4. SYNCHRONIZE KAAPU SPATIAL POSITION & ANGLE WITH SCROLL PROGRESS
  // Follows Apple-style scene traveling: stationary at hero, translating across scenes as a guide
  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    const interpolated = interpolateKeyframes(scrollProgress, isMobile);

    targetPosXRef.current = interpolated.posX;
    targetPosYRef.current = interpolated.posY;
    targetPosZRef.current = interpolated.posZ;

    targetRotationXRef.current = interpolated.rotX;
    targetRotationYRef.current = interpolated.rotY;
    targetRotationZRef.current = interpolated.rotZ;

    targetScaleRef.current = interpolated.scale;
  }, [scrollProgress]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[650vh] bg-black text-white"
    >
      {/* PINNED STICKY VIEWPORT (100vh) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* 3D WebGL Canvas Layer */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />

        {/* Ambient Vignette & Lighting Shimmer */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/90 pointer-events-none z-10" />

        {/* ========================================================================= */}
        {/* STORY OVERLAYS SYNCHRONIZED TO KAAPU SCROLL PROGRESS */}
        {/* ========================================================================= */}

        {/* ----------------------------------------------------------------------- */}
        {/* STAGE 0: HERO (0% - 12%) — Kaapu stationary, infinity flowing */}
        {/* ----------------------------------------------------------------------- */}
        <div
          className={`absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-12 transition-all duration-700 pointer-events-none ${
            scrollProgress <= 0.12
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 -translate-y-8 scale-95'
          }`}
        >
          {/* Top Label */}
          <div className="text-center pt-24 sm:pt-28">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-800 bg-neutral-950/80 backdrop-blur-md text-[10px] font-syncopate tracking-[0.35em] text-neutral-400 uppercase shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              ATLAS STANDARDS • MERCHANDISE SOURCING & MANUFACTURING
            </span>
          </div>

          {/* Central Hero Typography */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <h1 className="font-cinzel text-3xl sm:text-5xl md:text-7xl font-light tracking-[0.12em] uppercase text-white leading-tight">
              YOU HAVE THE IDEA
              <span className="block font-medium text-steel-gradient mt-1 sm:mt-2">
                WE'LL FIGURE OUT HOW TO BUILD IT
              </span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-neutral-400 font-light max-w-xl mx-auto tracking-wide leading-relaxed">
              From bespoke yarn formulation and precision tech packs to Tier-1 factory production. The Kaapu guides our uncompromising standard.
            </p>
          </div>

          {/* Bottom Action Prompts */}
          <div className="flex flex-col items-center pb-8 sm:pb-12 pointer-events-auto space-y-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onStartProject}
                className="group relative px-8 py-3.5 rounded-full bg-white text-black font-cinzel text-xs tracking-[0.25em] uppercase font-bold overflow-hidden transition-all duration-500 hover:bg-neutral-200 hover:scale-105 flex items-center gap-2"
              >
                <span>Start Project</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => jumpToStage(1)}
                className="px-6 py-3.5 rounded-full border border-neutral-800 bg-neutral-950/80 backdrop-blur-md text-neutral-300 font-cinzel text-xs tracking-[0.2em] uppercase hover:text-white hover:border-neutral-600 transition-colors"
              >
                Scroll To Begin
              </button>
            </div>

            {/* Scroll Indicator */}
            <div className="flex items-center gap-2 text-[10px] font-syncopate tracking-[0.25em] text-neutral-500 uppercase pt-2 animate-bounce">
              <ChevronDown className="w-3.5 h-3.5" />
              <span>SCROLL TO GUIDE EXPERIENCE</span>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* STAGE 1: BRANDS & STARTUPS (13% - 28%) — Kaapu glides smoothly to right */}
        {/* ----------------------------------------------------------------------- */}
        <div
          className={`absolute inset-0 z-20 flex items-center px-6 sm:px-16 md:px-24 transition-all duration-700 pointer-events-none ${
            scrollProgress >= 0.13 && scrollProgress <= 0.28
              ? 'opacity-100 translate-x-0'
              : scrollProgress < 0.13
              ? 'opacity-0 translate-y-12'
              : 'opacity-0 -translate-y-12'
          }`}
        >
          <div className="max-w-xl space-y-6 pointer-events-auto">
            <div className="flex items-center gap-2">
              <span className="font-syncopate text-[10px] tracking-[0.35em] text-neutral-500 uppercase">
                01 / FOR AMBITIOUS LABELS
              </span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-light tracking-[0.08em] uppercase text-white leading-tight">
              BUILDING A BRAND?
              <span className="block font-medium text-steel-gradient">START WITH THE PRODUCT</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              Don't let supply chain gatekeepers dilute your vision. Atlas gives emerging brands, independent founders, and creator labels direct institutional factory access without the punishing enterprise minimums.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-sm bg-neutral-950/80 border border-neutral-800 backdrop-blur-md space-y-1">
                <div className="font-cinzel text-sm font-semibold text-white">50+ UNIT STARTING MOQS</div>
                <p className="text-[11px] text-neutral-400 font-light">
                  From 50 pieces for core apparel, scaling flexibly to 150+ for bespoke fabrications.
                </p>
              </div>
              <div className="p-4 rounded-sm bg-neutral-950/80 border border-neutral-800 backdrop-blur-md space-y-1">
                <div className="font-cinzel text-sm font-semibold text-white">DIRECT ECONOMICS</div>
                <p className="text-[11px] text-neutral-400 font-light">
                  Eliminate multi-tier middlemen and preserve 65–75% healthy gross margins.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* STAGE 2: IDEA TO PRODUCT PIPELINE (29% - 45%) — Kaapu glides across to left */}
        {/* ----------------------------------------------------------------------- */}
        <div
          className={`absolute inset-0 z-20 flex items-center justify-end px-6 sm:px-16 md:px-24 transition-all duration-700 pointer-events-none ${
            scrollProgress >= 0.29 && scrollProgress <= 0.45
              ? 'opacity-100 translate-x-0'
              : scrollProgress < 0.29
              ? 'opacity-0 translate-y-12'
              : 'opacity-0 -translate-y-12'
          }`}
        >
          <div className="max-w-xl space-y-6 pointer-events-auto">
            <div className="flex items-center gap-2">
              <span className="font-syncopate text-[10px] tracking-[0.35em] text-neutral-500 uppercase">
                02 / THE ARCHITECTURE
              </span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-light tracking-[0.08em] uppercase text-white leading-tight">
              FROM RAW CONCEPT
              <span className="block font-medium text-steel-gradient">TO PACKAGED BULK</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              Every detail is engineered with mathematical rigor. We translate your moodboards into production-grade CAD tech packs, sample iterations, and seamless factory execution.
            </p>

            <div className="space-y-2.5 pt-2">
              {[
                { step: '01', title: 'Tech Pack & Fit Engineering', desc: 'Precision grading, seam geometry, and Pantone TCX matching.' },
                { step: '02', title: 'Custom Yarn Spinning & Knitting', desc: 'Pre-combed yarns, custom GSM weights (280–520 GSM), anti-pilling wash.' },
                { step: '03', title: 'Rapid Physical Sampling', desc: '10–14 day sample dispatch for hands-on fitting & trim validation.' },
                { step: '04', title: 'Bulk AQL 1.5 Manufacturing', desc: 'Strict in-line inspection and global doorstep export logistics.' },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex items-start gap-3 p-3 rounded-sm bg-neutral-950/80 border border-neutral-800/90 backdrop-blur-md"
                >
                  <span className="font-syncopate text-[10px] font-bold text-neutral-400 pt-0.5">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="font-cinzel text-xs font-semibold text-white tracking-wide">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-neutral-400 font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* STAGE 3: PRODUCT DEVELOPMENT & SPECS (46% - 62%) — Kaapu centers, closer to camera */}
        {/* ----------------------------------------------------------------------- */}
        <div
          className={`absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-12 transition-all duration-700 pointer-events-none ${
            scrollProgress >= 0.46 && scrollProgress <= 0.62
              ? 'opacity-100 scale-100'
              : scrollProgress < 0.46
              ? 'opacity-0 translate-y-12'
              : 'opacity-0 -translate-y-12'
          }`}
        >
          {/* Top Title */}
          <div className="text-center max-w-2xl mx-auto pt-16 sm:pt-20">
            <span className="font-syncopate text-[10px] tracking-[0.35em] text-neutral-500 uppercase block mb-2">
              03 / TECHNICAL SPECIFICATIONS
            </span>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-light tracking-[0.08em] uppercase text-white leading-tight">
              280 TO 520 GSM
              <span className="block font-medium text-steel-gradient">ZERO COMPROMISE</span>
            </h2>
          </div>

          {/* Floating Spec Callout Tags Around The Kaapu */}
          <div className="relative w-full max-w-6xl mx-auto h-[40vh] hidden md:block">
            {/* Tag 1: Top Left */}
            <div className="absolute top-4 left-4 p-4 rounded-sm bg-neutral-950/90 border border-neutral-800 backdrop-blur-md max-w-xs space-y-1 shadow-2xl">
              <span className="font-syncopate text-[9px] tracking-[0.25em] text-neutral-400 uppercase">
                YARN FORMULATION
              </span>
              <h4 className="font-cinzel text-sm font-semibold text-white">
                100% Combed Compact Cotton
              </h4>
              <p className="text-[11px] text-neutral-400 font-light">
                High-twist ring-spun fibers for razor-sharp structure and zero surface fuzz.
              </p>
            </div>

            {/* Tag 2: Top Right */}
            <div className="absolute top-4 right-4 p-4 rounded-sm bg-neutral-950/90 border border-neutral-800 backdrop-blur-md max-w-xs space-y-1 shadow-2xl">
              <span className="font-syncopate text-[9px] tracking-[0.25em] text-neutral-400 uppercase">
                WEIGHT & LOOPBACK
              </span>
              <h4 className="font-cinzel text-sm font-semibold text-white">
                480+ GSM Heavy Fleece
              </h4>
              <p className="text-[11px] text-neutral-400 font-light">
                Dense unbrushed French terry engineered for structured, architectural draping.
              </p>
            </div>

            {/* Tag 3: Bottom Left */}
            <div className="absolute bottom-4 left-4 p-4 rounded-sm bg-neutral-950/90 border border-neutral-800 backdrop-blur-md max-w-xs space-y-1 shadow-2xl">
              <span className="font-syncopate text-[9px] tracking-[0.25em] text-neutral-400 uppercase">
                APPLICATION CRAFT
              </span>
              <h4 className="font-cinzel text-sm font-semibold text-white">
                Discharge & 3D HD Puff
              </h4>
              <p className="text-[11px] text-neutral-400 font-light">
                Zero-hand discharge dye extractions and razor-sharp 3D micro-embossed prints.
              </p>
            </div>

            {/* Tag 4: Bottom Right */}
            <div className="absolute bottom-4 right-4 p-4 rounded-sm bg-neutral-950/90 border border-neutral-800 backdrop-blur-md max-w-xs space-y-1 shadow-2xl">
              <span className="font-syncopate text-[9px] tracking-[0.25em] text-neutral-400 uppercase">
                BESPOKE TRIMS
              </span>
              <h4 className="font-cinzel text-sm font-semibold text-white">
                Custom Matte Metal Hardware
              </h4>
              <p className="text-[11px] text-neutral-400 font-light">
                Laser-engraved stainless steel aglets, heavy #8 zippers, and woven damask labels.
              </p>
            </div>
          </div>

          {/* Mobile Spec Summary Card */}
          <div className="md:hidden max-w-md mx-auto p-4 rounded-sm bg-neutral-950/90 border border-neutral-800 backdrop-blur-md space-y-2">
            <div className="font-cinzel text-xs font-semibold text-white">
              ENGINEERED HEAVYWEIGHTS
            </div>
            <p className="text-[11px] text-neutral-400 font-light">
              280–520 GSM Compact Cotton, 480+ GSM French Terry, Discharge Prints, and Custom Matte Hardware.
            </p>
          </div>

          <div className="text-center pb-6">
            <span className="text-[10px] font-syncopate tracking-[0.25em] text-neutral-500 uppercase">
              PRE-SHRUNK & ENZYME WASHED • ZERO WARPING
            </span>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* STAGE 4: MANUFACTURING & QUALITY (63% - 78%) — Kaapu glides to right */}
        {/* ----------------------------------------------------------------------- */}
        <div
          className={`absolute inset-0 z-20 flex items-center px-6 sm:px-16 md:px-24 transition-all duration-700 pointer-events-none ${
            scrollProgress >= 0.63 && scrollProgress <= 0.78
              ? 'opacity-100 translate-x-0'
              : scrollProgress < 0.63
              ? 'opacity-0 translate-y-12'
              : 'opacity-0 -translate-y-12'
          }`}
        >
          <div className="max-w-xl space-y-6 pointer-events-auto">
            <div className="flex items-center gap-2">
              <span className="font-syncopate text-[10px] tracking-[0.35em] text-neutral-500 uppercase">
                04 / INSTITUTIONAL QUALITY
              </span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-light tracking-[0.08em] uppercase text-white leading-tight">
              AQL 1.5 AUDIT PROTOCOLS
              <span className="block font-medium text-steel-gradient">ZERO CUT CORNERS</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              We operate proprietary in-line inspection gates at every stage of production. From raw yarn lot testing to final carton audits, your garments undergo strict institutional scrutiny before dispatch.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-sm bg-neutral-950/80 border border-neutral-800 backdrop-blur-md flex items-center gap-4">
                <ShieldCheck className="w-8 h-8 text-white shrink-0 stroke-[1.5]" />
                <div>
                  <h4 className="font-cinzel text-xs font-semibold text-white">
                    100% In-Line Defect Tracking
                  </h4>
                  <p className="text-[11px] text-neutral-400 font-light">
                    Documented tolerance audits for measurements, stitch density, and colorfastness.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-sm bg-neutral-950/80 border border-neutral-800 backdrop-blur-md flex items-center gap-4">
                <Factory className="w-8 h-8 text-white shrink-0 stroke-[1.5]" />
                <div>
                  <h4 className="font-cinzel text-xs font-semibold text-white">
                    Tier-1 Certified Facilities
                  </h4>
                  <p className="text-[11px] text-neutral-400 font-light">
                    SEDEX, OEKO-TEX, and WRAP compliant manufacturing hubs adhering to living wage standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* STAGE 5: SOURCING NETWORK (79% - 92%) — Kaapu glides to left */}
        {/* ----------------------------------------------------------------------- */}
        <div
          className={`absolute inset-0 z-20 flex items-center justify-end px-6 sm:px-16 md:px-24 transition-all duration-700 pointer-events-none ${
            scrollProgress >= 0.79 && scrollProgress <= 0.92
              ? 'opacity-100 translate-x-0'
              : scrollProgress < 0.79
              ? 'opacity-0 translate-y-12'
              : 'opacity-0 -translate-y-12'
          }`}
        >
          <div className="max-w-xl space-y-6 pointer-events-auto">
            <div className="flex items-center gap-2">
              <span className="font-syncopate text-[10px] tracking-[0.35em] text-neutral-500 uppercase">
                05 / MANUFACTURING GEOGRAPHY
              </span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-light tracking-[0.08em] uppercase text-white leading-tight">
              FOUR SPECIALIZED
              <span className="block font-medium text-steel-gradient">PRODUCTION CLUSTERS</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              We route each garment to its optimal geographic manufacturing cluster in India, matching specialized machinery with artisan craftsmanship.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-sm bg-neutral-950/80 border border-neutral-800/90 backdrop-blur-md">
                <div className="flex items-center gap-2 text-white font-cinzel text-xs font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Tiruppur Hub</span>
                </div>
                <p className="text-[11px] text-neutral-400 font-light mt-1">
                  Heavyweight knits, fleece spinning, garment pigment dyeing, and discharge prints.
                </p>
              </div>

              <div className="p-3.5 rounded-sm bg-neutral-950/80 border border-neutral-800/90 backdrop-blur-md">
                <div className="flex items-center gap-2 text-white font-cinzel text-xs font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Bengaluru Hub</span>
                </div>
                <p className="text-[11px] text-neutral-400 font-light mt-1">
                  Technical outerwear, bound waterproof seams, varsity silhouettes, and laser cutting.
                </p>
              </div>

              <div className="p-3.5 rounded-sm bg-neutral-950/80 border border-neutral-800/90 backdrop-blur-md">
                <div className="flex items-center gap-2 text-white font-cinzel text-xs font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Chennai Hub</span>
                </div>
                <p className="text-[11px] text-neutral-400 font-light mt-1">
                  High-count wovens, tailored shirting, custom canvas, and luxury leather craft.
                </p>
              </div>

              <div className="p-3.5 rounded-sm bg-neutral-950/80 border border-neutral-800/90 backdrop-blur-md">
                <div className="flex items-center gap-2 text-white font-cinzel text-xs font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Ludhiana Hub</span>
                </div>
                <p className="text-[11px] text-neutral-400 font-light mt-1">
                  Engineered jacquards, high-gauge sweaters, and premium merino/cashmere blends.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* STAGE 6: CONTACT & SETTLE (93% - 100%) — Kaapu settles in center horizon */}
        {/* ----------------------------------------------------------------------- */}
        <div
          className={`absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-12 transition-all duration-700 pointer-events-none ${
            scrollProgress >= 0.93
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-8 scale-95'
          }`}
        >
          {/* Top Label */}
          <div className="text-center pt-20 sm:pt-24">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-800 bg-neutral-950/80 backdrop-blur-md text-[10px] font-syncopate tracking-[0.35em] text-neutral-400 uppercase">
              06 / PRODUCTION READINESS
            </span>
          </div>

          {/* Central Settle Typography */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-light tracking-[0.1em] uppercase text-white leading-tight">
              READY TO BUILD
              <span className="block font-medium text-steel-gradient">YOUR NEXT COLLECTION?</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-neutral-300 font-light max-w-lg mx-auto leading-relaxed">
              Connect with an Atlas sourcing engineer. We provide complete technical feasibility, BOM cost estimates, and prototype timelines within 24 hours.
            </p>
          </div>

          {/* Bottom Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pb-12 sm:pb-16 pointer-events-auto">
            <button
              onClick={onStartProject}
              className="group relative px-9 py-4 rounded-full bg-white text-black font-cinzel text-xs tracking-[0.25em] uppercase font-bold overflow-hidden transition-all duration-500 hover:bg-neutral-200 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] flex items-center gap-3"
            >
              <span>START PROJECT INQUIRY</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onExploreDeep}
              className="px-8 py-4 rounded-full border border-neutral-700 bg-neutral-950/80 backdrop-blur-md text-white font-cinzel text-xs tracking-[0.2em] uppercase hover:bg-neutral-900 hover:border-neutral-500 transition-colors flex items-center gap-2"
            >
              <span>EXPLORE DEEP CATALOG & SPECS</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* REFINED APPLE-STYLE CHAPTER CONTROLLER AT BOTTOM */}
        {/* ========================================================================= */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-auto">
          {/* Progress Bar & Stage Ticks */}
          <div className="flex items-center gap-1.5 sm:gap-2 px-4 py-2 rounded-full border border-neutral-800/90 bg-black/85 backdrop-blur-md shadow-2xl">
            {stages.map((stage, idx) => {
              const isActive = currentStageIndex === idx;
              return (
                <button
                  key={stage.id}
                  onClick={() => jumpToStage(idx)}
                  className={`group flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-syncopate uppercase tracking-[0.2em] transition-all duration-300 ${
                    isActive
                      ? 'bg-white text-black font-bold shadow-md'
                      : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  <span>{stage.step}</span>
                  <span className="hidden md:inline">{stage.label}</span>
                </button>
              );
            })}
          </div>

          {/* Chapter Status Indicator */}
          <div className="flex items-center gap-2 text-[9px] font-syncopate tracking-[0.25em] text-neutral-500 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
            <span>SCENE {stages[currentStageIndex]?.step} • {stages[currentStageIndex]?.title}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
