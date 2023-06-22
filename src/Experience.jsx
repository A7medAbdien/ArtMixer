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
import WRoom from './components/Rooms/WRoom';
import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';

export default function Experience() {

    const [perfSucks, degrade] = useState(false)

    // const props = useControls({
    //     base: { value: '#201919' },
    //     colorA: { value: '#000' },
    //     colorB: { value: RoomColors[activeRoomIndex] } // B 27455f - G 275e3f - W 386f7c
    // })
    const base = '#201919'
    const colorA = '#000'
    const [colorB, setColorB] = useState('#937855')
    const test = useRef()

    /**
     * Set User Identifier
     */
    const newDate = new Date()
    const date = Math.floor(newDate.getTime() / 1000)
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        const savedValue = sessionStorage.getItem("ID");
        if (!savedValue) {
            const newValue = date;
            sessionStorage.setItem("ID", newValue);
            setUserId(newValue);
        } else {
            setUserId(savedValue);
        }
    }, []);

    const rollNext = () => {
        test.current.rollNext();
    };
    const rollBack = () => {
        // test.current.rollBack();
    };

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
            <PerformanceMonitor onDecline={() => degrade(true)} />
            {/* <Environment frames={perfSucks ? 1 : Infinity} resolution={256} background blur={0.8} preset="city" /> */}
            {/* <OrbitControls makeDefault /> */}
            {/* <axesHelper args={[2, 2, 2]} /> */}
            {/* <mesh scale={1.5}>
                <boxGeometry />
                <meshNormalMaterial />
            </mesh> */}

            <Bg base={base} colorA={colorA} colorB={colorB} />
            {/* <Child ref={test} /> */}
            <Rooms ref={test} userId={userId} setColorB={setColorB} />
        </Canvas >
        <div onClick={rollNext} className="char"
            style={{ bottom: 80, right: 100, fontSize: '50px', fontWeight: 600, letterSpacing: 2 }}
        >
            Next..
        </div>
    </>
}

function Bg({ base, colorA, colorB }) {
    const mesh = useRef()
    const color = useRef()
    useFrame((state, delta) => {
        mesh.current.rotation.x = mesh.current.rotation.y = mesh.current.rotation.z += delta / 4.5
    })
    return (
        <mesh ref={mesh} scale={100}>
            <sphereGeometry args={[1, 64, 64]} />
            <LayerMaterial attach="material" side={THREE.BackSide}>
                <Color color={base} alpha={1} mode="normal" />
                <Depth ref={color} colorA={colorB} colorB={colorA} alpha={0.5} mode="normal" near={0} far={300} origin={[100, 100, 100]} />
            </LayerMaterial>
        </mesh>
    )
}