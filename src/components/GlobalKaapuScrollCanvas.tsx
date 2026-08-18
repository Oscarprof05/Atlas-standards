import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const GlobalKaapuScrollCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Three.js Core Instances
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // Hierarchy
  const sceneCompositionRef = useRef<THREE.Group | null>(null);
  const kaapuGroupRef = useRef<THREE.Group | null>(null);
  const infinityGroupRef = useRef<THREE.Group | null>(null);
  const infinityParticlesRef = useRef<THREE.Points | null>(null);
  const infinityRibbonRef = useRef<THREE.Mesh | null>(null);
  const infinityCurveRef = useRef<THREE.CatmullRomCurve3 | null>(null);

  const animationFrameRef = useRef<number | null>(null);

  // Dedicated Scroll Progress Reference (Pure Scroll-Driven, 0% Mouse Influence)
  const baseScrollProgress = useRef(0);
  const targetScrollProgress = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.025);
    sceneRef.current = scene;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // 2. Studio Camera with Clean 20°/25° Three-Quarter Perspective matching original Atlas Logo
    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.0);
    cameraRef.current = camera;

    // 3. WebGL Renderer with High-End Tone Mapping & Precision
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.38;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;

    // 4. Studio Lighting Rig - Precision Brushed Silver Stainless Steel Studio Rig
    // Dynamic directional lighting with brilliant neutral specular highlights moving across the surface
    const keyLight = new THREE.DirectionalLight(0xffffff, 6.8);
    keyLight.position.set(4.2, 5.5, 4.8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xf8fafc, 5.6);
    rimLight.position.set(-4.5, -1.0, -3.2);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xe2e8f0, 2.4);
    fillLight.position.set(-3.2, 2.8, 3.8);
    scene.add(fillLight);

    const topAccent = new THREE.DirectionalLight(0xffffff, 5.0);
    topAccent.position.set(0, 6.5, 1.8);
    scene.add(topAccent);

    const ambientLight = new THREE.AmbientLight(0x2d3748, 1.4);
    scene.add(ambientLight);

    // Realistic Neutral Studio Specular Environment for rich metallic sheen sweeps
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envScene = new THREE.Scene();
    
    // Key reflective strip (crisp white ribbon across chamfer)
    const envLight1 = new THREE.DirectionalLight(0xffffff, 14);
    envLight1.position.set(2.5, 3.8, 2.8);
    envScene.add(envLight1);
    
    // Polished silver sheen strip
    const envLight2 = new THREE.DirectionalLight(0xe2e8f0, 9);
    envLight2.position.set(-3.0, -1.6, -1.4);
    envScene.add(envLight2);
    
    // Pure specular rim highlight
    const envLight3 = new THREE.DirectionalLight(0xffffff, 8);
    envLight3.position.set(0, 5.2, -2.6);
    envScene.add(envLight3);

    const envRenderTarget = pmremGenerator.fromScene(envScene);
    scene.environment = envRenderTarget.texture;

    // 5. Unified Scene Composition Master Group (Travels smoothly together)
    const sceneComposition = new THREE.Group();
    sceneCompositionRef.current = sceneComposition;
    scene.add(sceneComposition);

    // 6. PERMANENT BACKGROUND INFINITY ELEMENT (Silky dual-loop energy ribbon matching the logo)
    const infinityGroup = new THREE.Group();
    infinityGroup.position.set(0, 0, 0); // Perfectly co-centered with the Kaapu
    infinityGroupRef.current = infinityGroup;
    sceneComposition.add(infinityGroup);

    const curvePoints: THREE.Vector3[] = [];
    const numPoints = 320;
    // Infinity loop scale matching the logo proportions
    const scaleA = 2.35;

    for (let i = 0; i <= numPoints; i++) {
      const t = (i / numPoints) * Math.PI * 2;
      const denom = 1 + Math.sin(t) * Math.sin(t);
      const x = (scaleA * Math.cos(t)) / denom;
      const y = ((scaleA * Math.sin(t) * Math.cos(t)) / denom) * 0.82;
      const z = -0.15 + Math.sin(t * 2) * 0.08; // Flows organically just behind/through the center plane
      curvePoints.push(new THREE.Vector3(x, y, z));
    }

    const infinityCurve = new THREE.CatmullRomCurve3(curvePoints, true);
    infinityCurveRef.current = infinityCurve;

    const tubeGeometry = new THREE.TubeGeometry(infinityCurve, 240, 0.013, 16, true);
    const ribbonMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xffffff),
      emissive: new THREE.Color(0xcccccc),
      emissiveIntensity: 0.50,
      metalness: 0.95,
      roughness: 0.18,
      transparent: true,
      opacity: 0.40,
    });
    const infinityRibbon = new THREE.Mesh(tubeGeometry, ribbonMaterial);
    infinityRibbonRef.current = infinityRibbon;
    infinityGroup.add(infinityRibbon);

    // Continuous gentle ambient energy particles along the infinity path
    const particleCount = 500;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleOffsets = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount;
      const pt = infinityCurve.getPoint(t);
      particlePositions[i * 3] = pt.x + (Math.random() - 0.5) * 0.025;
      particlePositions[i * 3 + 1] = pt.y + (Math.random() - 0.5) * 0.025;
      particlePositions[i * 3 + 2] = pt.z + (Math.random() - 0.5) * 0.025;
      particleOffsets[i] = t;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('offset', new THREE.BufferAttribute(particleOffsets, 1));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.025,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const infinityParticles = new THREE.Points(particleGeo, particleMaterial);
    infinityParticlesRef.current = infinityParticles;
    infinityGroup.add(infinityParticles);

    // 7. PRECISION-MACHINED TITANIUM KAAPU RING (Refined Dimensions & Balance)
    // Geometry: Preserved large inner aperture with +14% radial wall thickness and +12% front profile face
    const kaapuMasterGroup = new THREE.Group();
    kaapuMasterGroup.position.set(0, 0, 0); // Shared exact co-center with infinity symbol
    kaapuGroupRef.current = kaapuMasterGroup;
    sceneComposition.add(kaapuMasterGroup);

    // Precision Machined Ring Dimensions:
    // Outer Radius = 1.125 (stable outer diameter)
    // Inner Radius = 1.025 (large inner aperture preserved, wall thickness increased from 0.087 to 0.100 -> ~15% increase)
    // Band Half-Height = 0.044 (front face depth increased by ~13% for solid luxury titanium feel)
    // Precision Chamfers = 0.012 on inner & outer bevels for crisp specular highlight catching
    const rIn = 1.025;
    const rOut = 1.125;
    const hHalf = 0.044;
    const chamfer = 0.012;

    const profilePoints: THREE.Vector2[] = [
      new THREE.Vector2(rIn + chamfer, -hHalf),            // Bottom-inner chamfer start
      new THREE.Vector2(rOut - chamfer, -hHalf),           // Bottom flat outer chamfer start
      new THREE.Vector2(rOut, -hHalf + chamfer),           // Bottom-outer chamfer corner
      new THREE.Vector2(rOut, hHalf - chamfer),            // Outer cylindrical face top
      new THREE.Vector2(rOut - chamfer, hHalf),            // Top-outer chamfer corner
      new THREE.Vector2(rIn + chamfer, hHalf),             // Top flat inner chamfer start
      new THREE.Vector2(rIn, hHalf - chamfer),             // Top-inner chamfer corner
      new THREE.Vector2(rIn, -hHalf + chamfer),            // Inner cylindrical face bottom
      new THREE.Vector2(rIn + chamfer, -hHalf),            // Close cross-section profile
    ];

    // Ultra-smooth 256 radial segments for flawless CNC lathe finish and continuous silver specular sweeps
    const latheGeo = new THREE.LatheGeometry(profilePoints, 256);
    latheGeo.computeVertexNormals();

    // Material: Original Precision Brushed Stainless Steel / Satin Silver (Atlas Typography Silver Match)
    // Color: #D6DAE0 (pure luxury satin silver), Metalness: 0.92, Roughness: 0.22 (delicate anisotropic-style micro-brush)
    const silverSteelMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xd6dae0),
      metalness: 0.92,
      roughness: 0.22,
      envMapIntensity: 2.8, // Soft white luminous edge reflections
    });

    const kaapuMesh = new THREE.Mesh(latheGeo, silverSteelMaterial);
    kaapuMesh.rotation.x = Math.PI / 2;
    kaapuMasterGroup.add(kaapuMesh);

    // Initial load pose: Exact 28°–32° Dynamic Perspective Tilt matching original Atlas Logo
    // Slightly rotated toward viewer so both inner and outer chamfered bevels are visible
    // Balanced naturally with the infinity symbol instead of standing upright
    const initialPitch = 0.52; // ~29.8° vertical perspective tilt (28°–32° range)
    const initialYaw = 0.50;   // ~28.6° three-quarter viewer rotation showcasing both bevels
    const initialRoll = -0.32; // ~-18.3° diagonal alignment balanced with the infinity ribbon
    kaapuMasterGroup.rotation.set(initialPitch, initialYaw, initialRoll);

    // 8. SCROLL STORYTELLING & COMPOSITION (100% Scroll-Driven, 0% Mouse Interaction)
    // Apple Vision Pro / Rolex luxury physical mass interaction:
    // Heavy, luxurious feel with +20-25% faster rotational travel and velvety fluid scrub (0.4s)
    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.4,
      onUpdate: (self) => {
        targetScrollProgress.current = self.progress;
      },
    });

    // 9. ANIMATION RENDER LOOP (Zero Mouse Jitter, Gyroscopic Precision Scroll Motion)
    const clock = new THREE.Clock();
    let time = 0;
    let currentSmoothScroll = 0;

    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.1);
      time += delta;

      // Heavy luxury damping (0.10 factor): velvety, confident gyro-motion that glides and settles with premium mass
      currentSmoothScroll += (targetScrollProgress.current - currentSmoothScroll) * 0.10;

      // +20–25% faster rotation speed on one constant gyroscopic axis (~8.8 * PI total rotation)
      // Fast scroll = faster rotation, slow scroll = slower rotation, stops when scrolling stops
      const rotationY = initialYaw + currentSmoothScroll * (Math.PI * 8.8);

      if (kaapuMasterGroup) {
        // Rock-solid fixed orientation angles: X and Z never change, wobble, or flip
        kaapuMasterGroup.rotation.x = initialPitch;
        kaapuMasterGroup.rotation.y = rotationY;
        kaapuMasterGroup.rotation.z = initialRoll;
      }

      // Continuous gentle particle flow along the infinity path in background
      if (infinityParticlesRef.current && infinityCurveRef.current) {
        const positions = infinityParticlesRef.current.geometry.attributes.position.array as Float32Array;
        const flowSpeed = 0.06;

        for (let i = 0; i < particleCount; i++) {
          const t = (particleOffsets[i] + time * flowSpeed) % 1;
          const pt = infinityCurveRef.current.getPoint(t);
          positions[i * 3] = pt.x;
          positions[i * 3 + 1] = pt.y;
          positions[i * 3 + 2] = pt.z;
        }
        infinityParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Soft glow pulsation on infinity ribbon
      if (infinityRibbonRef.current) {
        const mat = infinityRibbonRef.current.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 0.45 + Math.sin(time * 1.4) * 0.12;
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
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      scrollTriggerInstance.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-10 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/80 pointer-events-none" />
    </div>
  );
};
