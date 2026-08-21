import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface HeroKaapu3DProps {
  scrollProgress: number; // 0 to 1
  onStartProject: () => void;
  onExplore: () => void;
}

export const HeroKaapu3D: React.FC<HeroKaapu3DProps> = ({
  scrollProgress,
  onStartProject,
  onExplore,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDraggingRef = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const [isExploded, setIsExploded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // References to keep Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const kaapuGroupRef = useRef<THREE.Group | null>(null);
  const infinityParticlesRef = useRef<THREE.Points | null>(null);
  const infinityRibbonRef = useRef<THREE.Mesh | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Inertial physics variables
  const angularVelocity = useRef({ x: 0.003, y: 0.015, z: 0.002 });
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });
  const scrollVelocityRef = useRef(0);
  const lastScrollProgressRef = useRef(scrollProgress);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.025);
    sceneRef.current = scene;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 2. Camera setup - Fixed studio perspective
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.1, 4.8);
    cameraRef.current = camera;

    // 3. Renderer with high color fidelity
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

    // 4. Studio Lighting Rig (Rolex / Apple watch product illumination)
    // Key Light - High contrast metallic top rim
    const keyLight = new THREE.DirectionalLight(0xffffff, 4.5);
    keyLight.position.set(4, 6, 4);
    scene.add(keyLight);

    // Rim Light - Sharp brushed edge reflection
    const rimLight = new THREE.DirectionalLight(0xd8e2ec, 3.8);
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    // Fill Light - Soft studio ambient
    const fillLight = new THREE.DirectionalLight(0x94a3b8, 2.0);
    fillLight.position.set(-4, 3, 3);
    scene.add(fillLight);

    // Bottom reflector light (molten steel bounce)
    const bottomLight = new THREE.PointLight(0xffffff, 2.0, 10);
    bottomLight.position.set(0, -3, 2);
    scene.add(bottomLight);

    // Subtle Ambient
    const ambientLight = new THREE.AmbientLight(0x222222, 1.2);
    scene.add(ambientLight);

    // 5. Environment Reflection Cube / Texture for brushed steel
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    // Create custom procedural environment for photorealistic brushed metal reflections
    const envScene = new THREE.Scene();
    const envLight1 = new THREE.DirectionalLight(0xffffff, 8);
    envLight1.position.set(1, 1, 1);
    envScene.add(envLight1);
    const envLight2 = new THREE.DirectionalLight(0xa0aec0, 5);
    envLight2.position.set(-1, -1, -1);
    envScene.add(envLight2);
    const envRenderTarget = pmremGenerator.fromScene(envScene);
    scene.environment = envRenderTarget.texture;

    // 6. BUILD THE 3D KAAPU (Brushed Stainless Steel Bangle Ring)
    const kaapuMasterGroup = new THREE.Group();
    kaapuGroupRef.current = kaapuMasterGroup;
    scene.add(kaapuMasterGroup);

    // Kaapu Main Torus with chamfered profile
    // We create a composite cross-section for the authentic heavy Sikh / Indian Kaapu
    const outerRadius = 1.32;
    const thickness = 0.14;
    const radialSegments = 120;
    const tubularSegments = 160;

    // Brushed Stainless Steel Material
    const steelMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xf0f2f5),
      metalness: 0.96,
      roughness: 0.18,
      envMapIntensity: 2.4,
      flatShading: false,
    });

    // Inner core material with subtle dark industrial laser etch
    const innerSteelMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x999999),
      metalness: 0.92,
      roughness: 0.3,
      envMapIntensity: 1.8,
    });

    // Outer primary ring
    const mainRingGeo = new THREE.TorusGeometry(outerRadius, thickness, radialSegments, tubularSegments);
    const mainRing = new THREE.Mesh(mainRingGeo, steelMaterial);
    kaapuMasterGroup.add(mainRing);

    // Chamfered / Beveled rim rings for razor-sharp specular highlights
    const bevelTopGeo = new THREE.TorusGeometry(outerRadius + 0.02, thickness * 0.45, 32, tubularSegments);
    const bevelTop = new THREE.Mesh(bevelTopGeo, steelMaterial);
    bevelTop.scale.set(1, 1, 0.95);
    kaapuMasterGroup.add(bevelTop);

    // Inner laser etched precision groove
    const innerGrooveGeo = new THREE.TorusGeometry(outerRadius - 0.03, thickness * 0.4, 32, tubularSegments);
    const innerGroove = new THREE.Mesh(innerGrooveGeo, innerSteelMaterial);
    kaapuMasterGroup.add(innerGroove);

    // Initial orientation matching the uploaded photo reference
    kaapuMasterGroup.rotation.x = 0.95;
    kaapuMasterGroup.rotation.y = 0.55;
    kaapuMasterGroup.rotation.z = -0.35;
    kaapuMasterGroup.position.set(0, 0.25, 0);

    // 7. BUILD THE INFINITY PATH & LIQUID CHROME PARTICLES / RIBBON
    // Mathematical Lemniscate of Bernoulli: r^2 = 2 * a^2 * cos(2*theta)
    const curvePoints: THREE.Vector3[] = [];
    const numPoints = 300;
    const scaleA = 2.8;

    for (let i = 0; i <= numPoints; i++) {
      const t = (i / numPoints) * Math.PI * 2;
      const denom = 1 + Math.sin(t) * Math.sin(t);
      const x = (scaleA * Math.cos(t)) / denom;
      const y = (scaleA * Math.sin(t) * Math.cos(t)) / denom * 0.85;
      const z = -0.55 + Math.sin(t * 2) * 0.15; // Sits just behind the Kaapu
      curvePoints.push(new THREE.Vector3(x, y, z));
    }

    const infinityCurve = new THREE.CatmullRomCurve3(curvePoints, true);

    // 7a. Liquid Chrome Continuous Glowing Ribbon
    const tubeGeometry = new THREE.TubeGeometry(infinityCurve, 200, 0.022, 16, true);
    const ribbonMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xffffff),
      emissive: new THREE.Color(0xcccccc),
      emissiveIntensity: 0.8,
      metalness: 0.98,
      roughness: 0.1,
      transparent: true,
      opacity: 0.65,
    });
    const infinityRibbon = new THREE.Mesh(tubeGeometry, ribbonMaterial);
    infinityRibbonRef.current = infinityRibbon;
    scene.add(infinityRibbon);

    // 7b. Molten Steel Liquid Particle Stream along the Infinity Path
    const particleCount = 600;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleOffsets = new Float32Array(particleCount);
    const particleSizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount;
      const point = infinityCurve.getPoint(t);
      particlePositions[i * 3] = point.x + (Math.random() - 0.5) * 0.06;
      particlePositions[i * 3 + 1] = point.y + (Math.random() - 0.5) * 0.06;
      particlePositions[i * 3 + 2] = point.z + (Math.random() - 0.5) * 0.06;
      particleOffsets[i] = t;
      particleSizes[i] = Math.random() * 2.5 + 1.0;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('offset', new THREE.BufferAttribute(particleOffsets, 1));

    // Particle Material
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.035,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const infinityParticles = new THREE.Points(particleGeo, particleMaterial);
    infinityParticlesRef.current = infinityParticles;
    scene.add(infinityParticles);

    // Mark loaded
    setIsLoaded(true);

    // 8. Animation Loop
    let clock = new THREE.Clock();
    let time = 0;

    const animate = () => {
      const delta = clock.getDelta();
      time += delta;

      // Inertial spin & wobble physics
      if (kaapuMasterGroup) {
        // Natural precession wobble
        const wobbleX = Math.sin(time * 1.2) * 0.03;
        const wobbleZ = Math.cos(time * 0.9) * 0.02;

        // Smooth mouse parallax lerp
        mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * 0.05;
        mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * 0.05;

        if (!isDraggingRef.current) {
          // Scroll influence + base inertial spin
          const scrollImpact = scrollVelocityRef.current * 0.08;
          kaapuMasterGroup.rotation.y += angularVelocity.current.y + scrollImpact;
          kaapuMasterGroup.rotation.x = 0.95 + wobbleX + mouseCurrent.current.y * 0.3;
          kaapuMasterGroup.rotation.z = -0.35 + wobbleZ + mouseCurrent.current.x * 0.3;

          // Damping scroll velocity
          scrollVelocityRef.current *= 0.92;
        }
      }

      // Continuous Liquid Chrome motion along the Infinity Loop
      if (infinityParticlesRef.current && infinityCurve) {
        const positions = infinityParticlesRef.current.geometry.attributes.position.array as Float32Array;
        const speed = 0.12; // Molten steel flow speed

        for (let i = 0; i < particleCount; i++) {
          let t = (particleOffsets[i] + time * speed) % 1;
          const pt = infinityCurve.getPoint(t);
          // Subtle fluid turbulence
          const jitter = Math.sin(time * 3 + i) * 0.02;
          positions[i * 3] = pt.x + jitter;
          positions[i * 3 + 1] = pt.y + jitter;
          positions[i * 3 + 2] = pt.z;
        }
        infinityParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Subtle pulse to the ribbon emissive glow
      if (infinityRibbonRef.current) {
        const mat = infinityRibbonRef.current.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 0.5 + Math.sin(time * 2) * 0.25;
      }

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // 9. Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      renderer.dispose();
      pmremGenerator.dispose();
    };
  }, []);

  // Update when scrollProgress changes (Scroll-driven 3D rotation)
  useEffect(() => {
    const diff = scrollProgress - lastScrollProgressRef.current;
    scrollVelocityRef.current = diff * 25;
    lastScrollProgressRef.current = scrollProgress;

    if (kaapuGroupRef.current) {
      // Dynamic camera/object response to scroll
      kaapuGroupRef.current.position.y = 0.25 - scrollProgress * 0.5;
      kaapuGroupRef.current.scale.setScalar(1 - scrollProgress * 0.12);
    }
  }, [scrollProgress]);

  // Mouse interaction for luxury tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseTarget.current = {
      x: (clientX / innerWidth - 0.5) * 1.2,
      y: (clientY / innerHeight - 0.5) * 1.2,
    };

    if (isDraggingRef.current && kaapuGroupRef.current) {
      const deltaX = clientX - previousMousePosition.current.x;
      const deltaY = clientY - previousMousePosition.current.y;
      kaapuGroupRef.current.rotation.y += deltaX * 0.01;
      kaapuGroupRef.current.rotation.x += deltaY * 0.01;
      previousMousePosition.current = { x: clientX, y: clientY };
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Calculate opacity reveals based on scroll
  const labelOpacity = Math.max(0, 1 - scrollProgress * 2.5);
  const headingOpacity = Math.max(0, 1 - scrollProgress * 2.0);
  const subtextOpacity = Math.max(0, 1 - scrollProgress * 1.8);
  const ctaOpacity = Math.max(0, 1 - scrollProgress * 1.5);

  return (
    <div
      ref={containerRef}
      id="hero-experience"
      className="relative w-full h-screen bg-black overflow-hidden select-none cursor-grab active:cursor-grabbing flex flex-col items-center justify-between py-12 px-6"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background Subtle Radial Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 45%, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.98) 75%)',
        }}
      />

      {/* 3D WebGL Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto"
      />

      {/* Top Header Label */}
      <div
        className="relative z-10 text-center transition-all duration-700 pointer-events-none mt-4 sm:mt-8"
        style={{ opacity: labelOpacity, transform: `translateY(-${scrollProgress * 40}px)` }}
      >
        <p className="font-syncopate uppercase text-[10px] sm:text-xs tracking-[0.4em] text-neutral-400 font-light flex items-center justify-center gap-3">
          <span>Premium Merchandise</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-500 opacity-60" />
          <span>Product Development</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-500 opacity-60" />
          <span>Sourcing</span>
        </p>
      </div>

      {/* Hero Center Overlay Text (Behind/Integrated with Kaapu) */}
      <div
        className="relative z-10 max-w-5xl text-center px-4 transition-all duration-700 pointer-events-none mt-auto mb-4"
        style={{
          opacity: headingOpacity,
          transform: `translateY(${scrollProgress * 30}px) scale(${1 - scrollProgress * 0.05})`,
        }}
      >
        <h2 className="font-cinzel text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-[0.2em] text-white leading-tight uppercase">
          <span className="block mb-2 text-steel-gradient">YOU HAVE THE IDEA</span>
          <span className="block text-neutral-300 font-light">WE'LL FIGURE OUT HOW TO BUILD IT</span>
        </h2>

        <p
          className="mt-6 font-normal text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed tracking-wide transition-opacity duration-700"
          style={{ opacity: subtextOpacity }}
        >
          Atlas Standards is a premium merchandise sourcing, product development, apparel manufacturing and supply chain partner for visionary brands and institutions.
        </p>
      </div>

      {/* Hero Action Buttons */}
      <div
        className="relative z-20 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 transition-all duration-700 pointer-events-auto mb-4"
        style={{
          opacity: ctaOpacity,
          transform: `translateY(${scrollProgress * 20}px)`,
        }}
      >
        <button
          id="hero-start-project-btn"
          onClick={onStartProject}
          className="group relative px-8 py-3.5 rounded-full bg-white text-black font-cinzel text-xs tracking-[0.25em] font-semibold uppercase overflow-hidden transition-all duration-500 hover:bg-neutral-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105"
        >
          <span className="relative z-10 flex items-center gap-2">
            START A PROJECT
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </button>

        <button
          id="hero-explore-btn"
          onClick={onExplore}
          className="group px-8 py-3.5 rounded-full border border-neutral-700 text-neutral-300 font-cinzel text-xs tracking-[0.25em] uppercase transition-all duration-500 hover:border-neutral-300 hover:text-white hover:bg-white/5 backdrop-blur-sm"
        >
          EXPLORE WHAT WE BUILD
        </button>
      </div>

      {/* Scroll Down Indicator */}
      <div
        className="relative z-10 flex flex-col items-center gap-2 text-neutral-500 transition-opacity duration-500 pointer-events-none"
        style={{ opacity: Math.max(0, 1 - scrollProgress * 3) }}
      >
        <span className="font-syncopate text-[9px] tracking-[0.3em] uppercase">SCROLL TO EXPERIENCE</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-neutral-400 via-neutral-600 to-transparent animate-pulse" />
      </div>
    </div>
  );
};
