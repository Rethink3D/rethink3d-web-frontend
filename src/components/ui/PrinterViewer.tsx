import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage } from "@react-three/drei";
import * as THREE from "three";
import { useInView } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import styles from "./PrinterViewer.module.css";

const RealPrinterModel = () => {
  const { scene } = useGLTF("/models/printer.glb");
  const { theme } = useTheme();
  const isLightMode = theme === "light";

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.envMapIntensity = 1.5;
          mat.needsUpdate = true;

          if (
            mat.name.toLowerCase().includes("metal") ||
            mat.name.toLowerCase().includes("frame")
          ) {
            mat.metalness = 0.8;
            mat.roughness = 0.2;
            mat.color.set(isLightMode ? "#2a2a2a" : "#ffffff");
          } else {
            mat.roughness = 0.3;
          }
        }
      }
    });
  }, [scene, isLightMode]);

  return <primitive object={scene} />;
};

export const PrinterViewer = React.memo(() => {
  const { theme } = useTheme();
  const isLightMode = theme === "light";
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.1 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <Canvas
        camera={{ position: [6, 6, 8], fov: 40 }}
        dpr={[1, 1.5]}
        frameloop={isInView ? "always" : "never"}
        gl={{ preserveDrawingBuffer: true }}
        style={{
          touchAction: "pan-y",
          pointerEvents: isMobile ? "none" : "auto",
        }}
      >
        <ambientLight intensity={isLightMode ? 0.7 : 0.6} />
        <pointLight
          position={[10, 10, 10]}
          intensity={isLightMode ? 1.2 : 1.5}
        />
        <spotLight
          position={[-10, 10, 5]}
          intensity={1}
          angle={0.4}
          penumbra={1}
          castShadow
        />

        <Suspense fallback={null}>
          <Stage
            environment={isLightMode ? "city" : "city"}
            intensity={isLightMode ? 0.7 : 1}
            shadows={false}
            preset="rembrandt"
            adjustCamera={1.4}
          >
            <RealPrinterModel />
          </Stage>
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enableRotate={!isMobile}
          autoRotate={isInView}
          autoRotateSpeed={1.5}
          makeDefault
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 1.75}
        />
      </Canvas>
    </div>
  );
});

useGLTF.preload("/models/printer.glb");
