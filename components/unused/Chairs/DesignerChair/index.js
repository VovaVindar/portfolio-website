import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

const DesignerChair = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const width = mountRef.current?.clientWidth || 0;
    const height = mountRef.current?.clientHeight || 0;

    let scene, camera, renderer, controls;
    let group;

    function init() {
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(40, width / height, 1, 1000);
      camera.position.set(0, 40, 170); // Position camera
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({
        powerPreference: "high-performance",
        antialias: true,
        precision: "lowp",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0xeff0f0, 1); // Background color
      mountRef.current.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.03; // Smoothness of rotation
      controls.enablePan = false; // Disable panning
      controls.enableZoom = false; // Disable zooming
      controls.maxPolarAngle = Math.PI / 2; // Limit vertical rotation
      controls.minPolarAngle = Math.PI / 2; // Limit vertical rotation
      controls.autoRotate = true; // Enable auto-rotation
      controls.autoRotateSpeed = -1; // Speed of auto-rotation
    }

    function addLighting() {
      // Ambient light for general illumination
      const ambientLight = new THREE.AmbientLight(0x404040, 0.75); // Color and intensity
      scene.add(ambientLight);

      // Directional light for focused lighting
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.75); // Color and intensity
      directionalLight.position.set(5, 10, 7.5).normalize(); // Position and normalize direction
      scene.add(directionalLight);
    }

    function animate() {
      requestAnimationFrame(animate);
      if (controls) controls.update(); // Update controls
      if (renderer && camera) renderer.render(scene, camera); // Render scene
    }

    init();
    addLighting();

    new OBJLoader().load(
      "/3d/chair.obj",
      (obj) => {
        group = new THREE.Group();
        group.add(obj);
        scene.add(group);

        // Move model down
        obj.position.y -= 38; // Adjust as needed
      },
      (xhr) => {
        // Optionally show loading progress
      },
      (err) => console.error(err)
    );

    animate();

    // Handle window resize
    function onWindowResize() {
      const width = mountRef.current?.clientWidth || 0;
      const height = mountRef.current?.clientHeight || 0;

      renderer.setSize(width, height);
    }

    window.addEventListener("resize", onWindowResize, false);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", onWindowResize, false);

      if (renderer) {
        renderer.dispose();
      }
      if (controls) {
        controls.dispose();
      }
      if (group) {
        group.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach((mat) => mat.dispose());
              } else {
                child.material.dispose();
              }
            }
          }
        });
      }
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100%",
      }}
      className={"mf-hidden"}
    ></div>
  );
};

export default DesignerChair;
