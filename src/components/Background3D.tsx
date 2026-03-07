"use client";
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
// @ts-expect-error - missing types for maath module
import * as random from 'maath/random/dist/maath-random.esm';

function Starfield(props: any) {
    const ref = useRef<any>(null);
    // 5000 stars distributed in a sphere
    const sphere = useMemo(() => random.inSphere(new Float32Array(15000), { radius: 1.5 }) as Float32Array, []);

    useFrame((state, delta) => {
        if (ref.current) {
            // Very slow, elegant rotation
            ref.current.rotation.x -= delta / 30;
            ref.current.rotation.y -= delta / 40;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#4ade80" // slight cyan/green tint to match the site's neon pops
                    size={0.0025}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                />
            </Points>
        </group>
    );
}

const Background3D = () => {
    return (
        <div className="fixed inset-0 w-full h-screen z-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, #0B1120 0%, #030712 100%)' }}>
            <Canvas camera={{ position: [0, 0, 1] }}>
                {/* Single, highly elegant rotating starfield */}
                <Starfield />

                {/* Optional subtle ambient colored lights for depth */}
                <ambientLight intensity={0.2} />
                <directionalLight position={[0, 0, 5]} intensity={0.5} color="#0ea5e9" />
            </Canvas>
        </div>
    );
};

export default Background3D;
