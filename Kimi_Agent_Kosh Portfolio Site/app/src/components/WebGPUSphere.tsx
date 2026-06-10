import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export default function WebGPUSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [webgpuFailed, setWebgpuFailed] = useState(false);
  const animRef = useRef<number>(0);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Check WebGPU support
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(navigator as any).gpu) {
      setWebgpuFailed(true);
      return;
    }

    let renderer: THREE.WebGLRenderer;
    let composer: EffectComposer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let sphere: THREE.Mesh;

    try {
      // Scene setup
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        100
      );
      camera.position.z = 3;

      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;

      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight(0xfff0dd, 2.0);
      dirLight.position.set(5, 5, 5);
      scene.add(dirLight);

      const pointLight1 = new THREE.PointLight(0xe8d5a3, 1.5, 10);
      pointLight1.position.set(-3, 2, 4);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0xc9a84c, 0.8, 10);
      pointLight2.position.set(3, -2, 3);
      scene.add(pointLight2);

      // Gold material with custom shader-like appearance
      const geometry = new THREE.SphereGeometry(1, 128, 128);

      // Create a metallic gold material using MeshPhysicalMaterial
      const material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#c9a84c'),
        metalness: 1.0,
        roughness: 0.25,
        emissive: new THREE.Color('#8a6f2a'),
        emissiveIntensity: 0.15,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        reflectivity: 1.0,
        envMapIntensity: 1.5,
      });

      // Add iridescence for that thin-film look
      material.iridescence = 1.0;
      material.iridescenceIOR = 2.2;
      material.iridescenceThicknessRange = [100, 800];

      sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);

      // Create an environment map for reflections
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      const envScene = new THREE.Scene();
      envScene.background = new THREE.Color('#1a1a18');

      // Add some bright spots to the env map for interesting reflections
      const envLight1 = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xe8d5a3 })
      );
      envLight1.position.set(5, 5, 5);
      envScene.add(envLight1);

      const envLight2 = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xfff0dd })
      );
      envLight2.position.set(-5, 3, 4);
      envScene.add(envLight2);

      const envLight3 = new THREE.Mesh(
        new THREE.SphereGeometry(0.4, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xd4af37 })
      );
      envLight3.position.set(0, -5, 5);
      envScene.add(envLight3);

      const envMap = pmremGenerator.fromScene(envScene, 0.04).texture;
      scene.environment = envMap;
      material.envMap = envMap;

      // Post-processing bloom
      const renderPass = new RenderPass(scene, camera);
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(container.clientWidth, container.clientHeight),
        0.4, // strength
        0.2, // radius
        0.9 // threshold
      );

      composer = new EffectComposer(renderer);
      composer.addPass(renderPass);
      composer.addPass(bloomPass);

      // Animation
      const clock = new THREE.Clock();

      const animate = () => {
        animRef.current = requestAnimationFrame(animate);

        if (!isVisibleRef.current) return;

        const elapsed = clock.getElapsedTime();

        // Slow rotation
        sphere.rotation.y = elapsed * 0.15;
        sphere.rotation.x = Math.sin(elapsed * 0.08) * 0.1;

        // Breathing pulse (subtle scale)
        const pulse = 1.0 + Math.sin(elapsed * 1.5) * 0.04;
        sphere.scale.setScalar(pulse);

        // Subtle position wobble for liquid feel
        sphere.position.y = Math.sin(elapsed * 0.5) * 0.02;
        sphere.position.x = Math.cos(elapsed * 0.3) * 0.01;

        composer.render();
      };

      animate();

      // Handle resize
      const onResize = () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        composer.setSize(w, h);
      };

      window.addEventListener('resize', onResize);

      // IntersectionObserver for pausing
      const observer = new IntersectionObserver(
        ([entry]) => {
          isVisibleRef.current = entry.isIntersecting;
        },
        { threshold: 0.05 }
      );
      observer.observe(container);

      // Fade in
      canvas.style.opacity = '0';
      setTimeout(() => {
        canvas.style.transition = 'opacity 1s ease';
        canvas.style.opacity = '1';
      }, 400);

      return () => {
        cancelAnimationFrame(animRef.current);
        window.removeEventListener('resize', onResize);
        observer.disconnect();
        renderer.dispose();
        geometry.dispose();
        material.dispose();
        pmremGenerator.dispose();
      };
    } catch (err) {
      console.warn('WebGL setup failed, falling back to CSS:', err);
      setWebgpuFailed(true);
    }
  }, []);

  if (webgpuFailed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="rounded-full animate-pulse-soft"
          style={{
            width: '55vh',
            height: '55vh',
            background:
              'radial-gradient(circle at center, #e8d5a3 0%, #c9a84c 40%, #8a6f2a 70%, transparent 100%)',
            filter: 'blur(1px)',
          }}
        />
        <div className="absolute bottom-8 left-8 font-mono text-[10px] text-white-primary/20 animate-fade-out">
          WebGPU not available — fallback mode
        </div>
        <style>{`
          @keyframes fade-out {
            0% { opacity: 1; }
            70% { opacity: 1; }
            100% { opacity: 0; }
          }
          .animate-fade-out {
            animation: fade-out 3s ease forwards;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0,
        }}
      />
    </div>
  );
}
