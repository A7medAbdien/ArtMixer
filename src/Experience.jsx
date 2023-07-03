import { AccumulativeShadows, Box, Center, Environment, OrbitControls, PerformanceMonitor, RandomizedLight, Text } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Rooms } from './components/Rooms';
import { Suspense, useEffect } from 'react';
import { useState } from 'react';
import { Perf } from 'r3f-perf';
import { LayerMaterial, Depth, Color } from 'lamina'
import { useControls } from 'leva';
import { useRef } from 'react';
import * as THREE from 'three'
import WRoom from './components/Rooms/WRoom';
import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';
import { Arrows } from './components/Arrows';
import { useRoute } from 'wouter';
import { Overlay } from './Overlay';
import { Intro } from './components/Intro';

const roomsText = [
    { title: "Upload images", instructions: ["Click the images to see the upload button"] },
    { title: "Run mixer", instructions: ["Click the images to see the instructions"] },
    { title: "Please wait", instructions: ["Your images are being processed."] },
    { title: "Preview your mix", instructions: ["Your mix is ready!"] },
    { title: "Credits Room", instructions: [""] },
]

export default function Experience() {

    const [introDone, setIntroDone] = useState(false)
    const [areRoomsReady, setAreRoomsReady] = useState(false)
    const [perfSucks, degrade] = useState(false)

    // const props = useControls({
    //     base: { value: '#201919' },
    //     colorA: { value: '#000' },
    //     colorB: { value: RoomColors[activeRoomIndex] } // B 27455f - G 275e3f - W 386f7c
    // })

    const [, params] = useRoute('/:id')
    const base = '#201919'
    const colorA = '#000'
    const [colorB, setColorB] = useState('#937855')
    const roomsRef = useRef()

    const [activeRoomIndex, setActiveRoomIndex] = useState(0)

    /**
     * Set User Identifier
     */
    const newDate = new Date()
    const date = Math.floor(newDate.getTime() / 1000)
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        setAreRoomsReady(true)
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
        roomsRef.current.rollNext();
    };
    const rollBack = () => {
        roomsRef.current.rollBack();
    };

    return <>
        {/* <Leva hidden /> */}
        {/* [0, -0.4, 1.3] */}

        {/* {!introDone && <Intro setIntroDone={setIntroDone} areRoomsReady={areRoomsReady} />} */}
        <Canvas
            flat
            dpr={[1, perfSucks ? 1.5 : 2]}
            eventSource={document.getElementById('root')}
            eventPrefix="client"
            camera={{
                fov: 75,
                position: [0, 10, 4]
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
            <Suspense fallback={<Box />}>
                {/* {setAreRoomsReady(true)} */}
                <Rooms ref={roomsRef} setAreRoomsReady={setAreRoomsReady} userId={userId} setColorB={setColorB} activeRoomIndex={activeRoomIndex} setActiveRoomIndex={setActiveRoomIndex} introDone={introDone} />
            </Suspense >
        </Canvas >
        !params && <Arrows rightAction={rollNext} leftAction={rollBack} color={colorB} />
        !params && <Overlay color={colorB} text={roomsText[activeRoomIndex]} />

        {!introDone && <Intro setIntroDone={setIntroDone} areRoomsReady={areRoomsReady} />}

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