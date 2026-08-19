import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  const targetScrollProgress = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Immediately compute initial scroll progress on mount to prevent any entrance sliding/jumping
    const currentScrollY = window.scrollY;
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const initialProgress = Math.min(Math.max(currentScrollY / maxScroll, 0), 1);
    targetScrollProgress.current = initialProgress;

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
    
    const envLight1 = new THREE.DirectionalLight(0xffffff, 14);
    envLight1.position.set(2.5, 3.8, 2.8);
    envScene.add(envLight1);
    
    const envLight2 = new THREE.DirectionalLight(0xe2e8f0, 9);
    envLight2.position.set(-3.0, -1.6, -1.4);
    envScene.add(envLight2);
    
    const envLight3 = new THREE.DirectionalLight(0xffffff, 8);
    envLight3.position.set(0, 5.2, -2.6);
    envScene.add(envLight3);

    const envRenderTarget = pmremGenerator.fromScene(envScene);
    scene.environment = envRenderTarget.texture;

    // 5. Unified Scene Composition Master Group (Moved up slightly by ~10-15px)
    const sceneComposition = new THREE.Group();
    sceneComposition.position.set(0, 0.08, 0); // Precise vertical framing
    sceneCompositionRef.current = sceneComposition;
    scene.add(sceneComposition);

    // 6. PERMANENT BACKGROUND INFINITY ELEMENT (Original fixed background guide)
    const infinityGroup = new THREE.Group();
    infinityGroup.position.set(0, 0, 0);
    infinityGroupRef.current = infinityGroup;
    sceneComposition.add(infinityGroup);

    const curvePoints: THREE.Vector3[] = [];
    const numPoints = 320;
    const scaleA = 2.35; // Original infinity loop scale

    for (let i = 0; i <= numPoints; i++) {
      const t = (i / numPoints) * Math.PI * 2;
      const denom = 1 + Math.sin(t) * Math.sin(t);
      const x = (scaleA * Math.cos(t)) / denom;
      const y = ((scaleA * Math.sin(t) * Math.cos(t)) / denom) * 0.82;
      const z = -0.15 + Math.sin(t * 2) * 0.08;
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

    // Ambient energy particles along the infinity path
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

    // 7. PRECISION REFINED TITANIUM KAAPU RING (~8-10% reduced size, 100% preserved thickness)
    const kaapuMasterGroup = new THREE.Group();
    kaapuMasterGroup.position.set(0, 0, 0);
    kaapuGroupRef.current = kaapuMasterGroup;
    sceneComposition.add(kaapuMasterGroup);

    const rIn = 0.935;
    const rOut = 1.035;
    const hHalf = 0.044;
    const chamfer = 0.011;

    const profilePoints: THREE.Vector2[] = [
      new THREE.Vector2(rIn + chamfer, -hHalf),
      new THREE.Vector2(rOut - chamfer, -hHalf),
      new THREE.Vector2(rOut, -hHalf + chamfer),
      new THREE.Vector2(rOut, hHalf - chamfer),
      new THREE.Vector2(rOut - chamfer, hHalf),
      new THREE.Vector2(rIn + chamfer, hHalf),
      new THREE.Vector2(rIn, hHalf - chamfer),
      new THREE.Vector2(rIn, -hHalf + chamfer),
      new THREE.Vector2(rIn + chamfer, -hHalf),
    ];

    const latheGeo = new THREE.LatheGeometry(profilePoints, 256);
    latheGeo.computeVertexNormals();

    // Material: Original Precision Brushed Stainless Steel / Satin Silver (#D6DAE0)
    const silverSteelMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xd6dae0),
      metalness: 0.92,
      roughness: 0.22,
      envMapIntensity: 2.8,
    });

    const kaapuMesh = new THREE.Mesh(latheGeo, silverSteelMaterial);
    kaapuMesh.rotation.x = Math.PI / 2;
    kaapuMasterGroup.add(kaapuMesh);

    // Initial load pose: Exact 28°–32° Dynamic Perspective Tilt matching original Atlas Logo
    const initialPitch = 0.52; // ~29.8° vertical perspective tilt
    const initialYaw = 0.50;   // ~28.6° three-quarter viewer rotation
    const initialRoll = -0.32; // ~-18.3° diagonal alignment

    // Immediately set rotation on load so it renders in place instantly
    const initialRotationY = initialYaw + initialProgress * (Math.PI * 8.8);
    kaapuMasterGroup.rotation.set(initialPitch, initialRotationY, initialRoll);

    // 8. SCROLL STORYTELLING & COMPOSITION (Original 100% Scroll-Driven Mechanism)
    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.4,
      onUpdate: (self) => {
        targetScrollProgress.current = self.progress;
      },
    });

    // 9. ANIMATION RENDER LOOP (Original working behavior restored - zero translation/drift)
    const clock = new THREE.Clock();
    let time = 0;
    let currentSmoothScroll = initialProgress;

    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.1);
      time += delta;

      // Original smooth inertia-based damping (0.10 factor)
      currentSmoothScroll += (targetScrollProgress.current - currentSmoothScroll) * 0.10;

      // Original constant gyroscopic axis rotation
      const rotationY = initialYaw + currentSmoothScroll * (Math.PI * 8.8);

      if (kaapuMasterGroup) {
        // Rock-solid fixed orientation angles: X and Z never wobble or flip
        kaapuMasterGroup.rotation.x = initialPitch;
        kaapuMasterGroup.rotation.y = rotationY;
        kaapuMasterGroup.rotation.z = initialRoll;
      }

      // Continuous gentle particle flow along infinity path in background
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
