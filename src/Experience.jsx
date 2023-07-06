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
import { Arrows } from './components/Arrows/Arrows';
import { useRoute } from 'wouter';
import { Overlay } from './components/Overlay/Overlay';
import { Intro } from './components/Intro/Intro';

const roomsText = [
    { title: "Upload images", instructions: ["Click the images to see the upload button"] },
    { title: "Run mixer", instructions: ["Click the images to see the instructions"] },
    { title: "Please wait", instructions: ["Your images are being processed."] },
    { title: "Preview your mix", instructions: ["Your mix is ready!"] },
    { title: "Credits", instructions: null },
]

export default function Experience() {

    /**
     * handel intro
     */
    const [introDone, setIntroDone] = useState(false)
    const [areRoomsReady, setAreRoomsReady] = useState(false)


    /**
     * set background color
     */
    const base = '#201919'
    const colorA = '#000'
    const [colorB, setColorB] = useState('#937855')


    /**
     * handel degrade in performance
     */
    const [perfSucks, degrade] = useState(false)


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


    /**
     * needed so when any images get focused 
     */
    const [, params] = useRoute('/:id')


    /**
     * handel arrows action
    */
    const [activeRoomIndex, setActiveRoomIndex] = useState(0)
    const roomsRef = useRef()
    const rollNext = () => {
        roomsRef.current.rollNext();
    };
    const rollBack = () => {
        roomsRef.current.rollBack();
    };


    return <>
        {/* <Leva hidden /> */}

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
            {/* <OrbitControls makeDefault /> */}
            <PerformanceMonitor onDecline={() => degrade(true)} />

            <Bg base={base} colorA={colorA} colorB={colorB} />

            <Suspense fallback={<Box />}>
                <Rooms
                    ref={roomsRef}
                    userId={userId}
                    setColorB={setColorB}
                    introDone={introDone}
                    setAreRoomsReady={setAreRoomsReady}
                    activeRoomIndex={activeRoomIndex}
                    setActiveRoomIndex={setActiveRoomIndex}
                />
            </Suspense >

        </Canvas >

        {!params && <Arrows rightAction={rollNext} leftAction={rollBack} color={colorB} />}
        {!params && <Overlay color={colorB} text={roomsText[activeRoomIndex]} />}

        <Intro introDone={introDone} setIntroDone={setIntroDone} areRoomsReady={areRoomsReady} />
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