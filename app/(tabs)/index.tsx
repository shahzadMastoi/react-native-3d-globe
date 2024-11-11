import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { Asset } from 'expo-asset';

// Sample Globe Material
const EarthMaterial = () => {
  const texturePath = Asset.fromModule(require('../../assets/images/Earth_diff.jpg')).uri;
  const texture = new THREE.TextureLoader().load(texturePath);
  return <meshStandardMaterial attach="material" map={texture} />;
};

// Globe Component
const RotatingGlobe: React.FC = () => {
  const globeRef = useRef<THREE.Mesh>(null); // Ensure ref starts as null and is typed correctly

  // Rotate the globe automatically
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.007; // Adjust the speed of the rotation
    }
  });

  return (
    <Sphere args={[2, 32, 32]} ref={globeRef}>
      <EarthMaterial />
    </Sphere>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* Add controls for zoom and rotation */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={2}
          maxDistance={10}  // Zoom limits
          dampingFactor={0.05} // Smoothen rotation
          rotateSpeed={0.8} // Adjust drag rotation speed
        />

        {/* Rotating globe */}
        <RotatingGlobe />
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4e4d4d', // Dark background for a space effect
    justifyContent: 'center',
  },
});
