import { Environment, OrbitControls, useVideoTexture } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { Leva } from 'leva'
import gsap from 'gsap';
import { createRef, useRef } from 'react';
import { Box } from './Boxes'
import { Arrows } from './Arrows';

import Kitchen from './components/Rooms/Kitchen'
import GRoom from './components/Rooms/GRoom'
import BRoom from './components/Rooms/BRoom'
import WRoom from './components/Rooms/WRoom'

const roomList = [
    {
        id: 1,
        name: 'Kitchen',
        component: <Kitchen />,
        ref: null
    },
    {
        id: 2,
        name: 'Green Room',
        component: <GRoom />,
        ref: null
    },
    {
        id: 3,
        name: 'Blue Room',
        component: <BRoom />,
        ref: null
    },
    {
        id: 4,
        name: 'White',
        component: <WRoom />,
        ref: null
    },
];

export default function Experience() {
    const count = 5
    const baseTheta = 360 / count
    let boxesTheta = Array.from({ length: count }).map((_, i) => i * baseTheta)
    let isRolling = false

    const refs = useRef(
        Array.from({ length: count }).map(() => createRef())
    )

    const rollAll = (direction) => {
        // 1. hold rolling action until the first one is done
        isRolling = true

        // 2. rolling
        //if direction is true to right, if false to left
        boxesTheta.map((theta, i) =>
            boxesTheta[i] = direction ? (theta + 360 / 5) % 360 : (theta - 360 / 5) % 360
        )
        refs.current.map((ref, i) => roll(boxesTheta[i], ref))

        // 3. allow rolling
        setTimeout(() => {
            isRolling = false
        }, DURATION * 1000);
    }


    return <>
        {/* <Leva hidden /> */}
        {/* [0, -0.4, 1.3] */}
        <Canvas
            flat dpr={[1, 1.5]}
            camera={{
                fov: 75,
                position: [0, 0, 2]
            }}
        >
            {/* <Perf position="top-left" /> */}
            <fog attach="fog" args={['#191920', 0, 15]} />
            <color args={['#201919']} attach="background" />
            <OrbitControls makeDefault />
            <axesHelper args={[2, 2, 2]} />
            {/* <mesh scale={1.5}>
                <boxGeometry />
                <meshNormalMaterial />
            </mesh> */}


            {/* <Kitchen /> */}
            {/* <GRoom /> */}
            {/* <BRoom /> */}
            {/* <WRoom /> */}


            <Arrows
                rightAction={(e) => !isRolling && rollAll(true)}
                leftAction={(e) => !isRolling && rollAll(false)}
            />

            {refs.current.map((ref, i) => {
                let { x, y } = getCoordinates(i * baseTheta)

                return <group
                    key={i}
                    ref={ref}
                    position={[x, 0, y]}
                    rotation-y={x / 2}
                >
                    <mesh>
                        <boxGeometry args={[2, 2.5, 1]} />
                        <meshBasicMaterial color={`rgb(${i * baseTheta + 100},0,0)`} />
                    </mesh>
                </group>
            })}

        </Canvas>
    </>
}



const DURATION = 2.5
const getCoordinates = (angle, distance = 6) => {
    angle *= Math.PI / 180
    let x = -distance * Math.cos(angle) + 1.75,
        y = -distance * Math.sin(angle)

    return { x, y, distance }
}

const roll = (theta, ref) => {
    const { x, y: z } = getCoordinates(theta)
    gsap.to(
        ref.current.rotation,
        {
            duration: DURATION,
            ease: 'power2.inOut',
            y: x / 2,
        }
    )
    gsap.to(
        ref.current.position,
        {
            duration: DURATION,
            ease: 'power2.inOut',
            x: x,
            z: z
        }
    )
}
