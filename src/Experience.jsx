import { AccumulativeShadows, Box, Center, Environment, OrbitControls, PerformanceMonitor, RandomizedLight, Text } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Rooms } from './components/Rooms';
import { useEffect } from 'react';
import { useState } from 'react';
import { Perf } from 'r3f-perf';

export default function Experience() {

    const [perfSucks, degrade] = useState(false)

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
            {/* <Perf position="top-left" /> */}
            <fog attach="fog" args={['#191920', 0, 15]} />
            <PerformanceMonitor onDecline={() => degrade(true)} />
            <color attach="background" args={['#201919']} />
            {/* <OrbitControls makeDefault /> */}
            {/* <axesHelper args={[2, 2, 2]} /> */}
            {/* <mesh scale={1.5}>
                <boxGeometry />
                <meshNormalMaterial />
            </mesh> */}

            <Rooms userId={userId} />
        </Canvas >
    </>
}