import { AccumulativeShadows, Box, Center, Environment, OrbitControls, PerformanceMonitor, RandomizedLight, Text } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Rooms } from './components/Rooms';
import { useEffect } from 'react';
import { useState } from 'react';
import { Perf } from 'r3f-perf';
import { LayerMaterial, Depth, Color } from 'lamina'
import { useControls } from 'leva';
import { useRef } from 'react';
import * as THREE from 'three'

export default function Experience() {

    const [perfSucks, degrade] = useState(false)
    const props = useControls({
        base: { value: '#201919' },
        colorA: { value: '#000' },
        colorB: { value: '#ceaa7c' } // B 27455f - G 275e3f - W 386f7c
    })
    /**
     * Set User Identifier
     */
    const newDate = new Date()
    const date = Math.floor(newDate.getTime() / 1000)
    const [userId, setUserId] = useState(null)

    // Set the value if it does not exist in local storage
    useEffect(() => {
        const savedValue = localStorage.getItem("ID");
        if (!savedValue) {
            const newValue = date;
            localStorage.setItem("ID", newValue);
            setUserId(newValue);
        } else {
            setUserId(savedValue);
        }
    }, []);

    return <>
        {/* <Leva hidden /> */}
        {/* [0, -0.4, 1.3] */}
        <Canvas
            flat
            dpr={[1, perfSucks ? 1.5 : 2]}
            eventSource={document.getElementById('root')}
            eventPrefix="client"
            camera={{
                fov: 75,
                position: [0, 0, 4]
            }}
        >

            <Perf position="top-left" />
            {/* <fog attach="fog" args={['#191920', 0, 15]} /> */}
            <PerformanceMonitor onDecline={() => degrade(true)} />
            {/* <color attach="background" args={['#201919']} /> */}
            {/* <OrbitControls makeDefault /> */}
            {/* <axesHelper args={[2, 2, 2]} /> */}
            {/* <mesh scale={1.5}>
                <boxGeometry />
                <meshNormalMaterial />
            </mesh> */}

            <Bg {...props} />
            <Environment frames={perfSucks ? 1 : Infinity} resolution={256} background blur={0.8} preset="warehouse" />
            <Rooms userId={userId} />
        </Canvas >
    </>
}

function Bg({ base, colorA, colorB }) {
    const mesh = useRef()
    useFrame((state, delta) => {
        mesh.current.rotation.x = mesh.current.rotation.y = mesh.current.rotation.z += delta / 3
    })
    return (
        <mesh ref={mesh} scale={100}>
            <sphereGeometry args={[1, 64, 64]} />
            <LayerMaterial attach="material" side={THREE.BackSide}>
                <Color color={base} alpha={1} mode="normal" />
                <Depth colorA={colorB} colorB={colorA} alpha={0.5} mode="normal" near={0} far={300} origin={[100, 100, 100]} />
            </LayerMaterial>
        </mesh>
    )
}