import { Box, Center, Environment, OrbitControls, Text } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { Leva } from 'leva'
import gsap from 'gsap';
import { createRef, useRef } from 'react';
// import { Box } from './Boxes'
import { Arrows } from './components/Arrows';

import Kitchen from './components/Rooms/Kitchen'
import GRoom from './components/Rooms/GRoom'
import BRoom from './components/Rooms/BRoom'
import WRoom from './components/Rooms/WRoom'
import { useState } from 'react';
import { useLocation } from 'wouter';
import { useEffect } from 'react';


// base theta shows the room on the right + rolling goes in the oboist direction of theta or i
const roomList = [
    {
        id: 1,
        name: 'Kitchen',
        component: <GRoom />,
    },
    {
        id: 2,
        name: 'GreenRoom',
        component: <Kitchen />,
    },
    {
        id: 3,
        name: 'Thanks',
        component: <BRoom />,
    },
    {
        id: 4,
        name: 'WhiteRoom',
        component: <WRoom />,
    },
    {
        id: 5,
        name: 'BlueRoom',
        component: <Box />,
    },
];

export default function Experience() {

    const [, setLocation] = useLocation()

    const count = 5
    const baseTheta = 360 / count
    const [boxesTheta, setBoxesTheta] = useState(Array.from({ length: count }).map((_, i) => i * baseTheta))
    const [isRolling, setRolling] = useState(false)
    const [activeRoomIndex, setActiveRoomIndex] = useState(0)

    const refs = useRef(
        Array.from({ length: count }).map(() => createRef())
    )

    const rollAll = (direction) => {

        // 1. hold rolling action until the first one is done
        setRolling(true)

        setActiveRoom(direction)
        // 2. rolling
        //if direction is true to right, if false to left
        const temp = Array.from({ length: count })
        boxesTheta.map((theta, i) =>
            temp[i] = direction ? (theta + 360 / 5) % 360 : (theta - 360 / 5) % 360
        )
        setBoxesTheta(temp)
        refs.current.map((ref, i) => roll(temp[i], ref))

        // 3. allow rolling
        setTimeout(() => {
            setRolling(false)
        }, DURATION * 900);
    }

    const setActiveRoom = (direction) => {
        const temp = direction ? (activeRoomIndex + 1) % roomList.length : (roomList.length + (activeRoomIndex - 1)) % roomList.length
        setActiveRoomIndex(temp)
        setLocation(roomList[temp].name)
    }
    useEffect(() => {
        setLocation(roomList[activeRoomIndex].name)
    }, [])

    return <>
        {/* <Leva hidden /> */}
        {/* [0, -0.4, 1.3] */}
        <Canvas
            flat dpr={[1, 1.5]}
            camera={{
                fov: 75,
                position: [0, 0, 4]
            }}
        >
            {/* <Perf position="top-left" /> */}
            <fog attach="fog" args={['#191920', 0, 15]} />
            <color args={['#201919']} attach="background" />
            {/* <OrbitControls makeDefault /> */}
            {/* <axesHelper args={[2, 2, 2]} /> */}
            {/* <mesh scale={1.5}>
                <boxGeometry />
                <meshNormalMaterial />
            </mesh> */}


            {/* <Kitchen /> */}
            {/* <group position={[3, 0, -6]}>
                <Center>
                    <BRoom />
                </Center>
            </group>
            <group position={[-3, 0, -6]}>
                <Center>
                    <GRoom />
                </Center>
            </group> */}
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
                    // name={i}
                    position={[x, 0, y]}
                    rotation-y={x / 2}
                >
                    < Center >
                        {roomList[i].component}
                    </Center>
                </group>
            })}
        </Canvas >
    </>
}



const DURATION = 2.5
const getCoordinates = (angle, distance = 6) => {
    angle *= Math.PI / 180
    let x = -distance * Math.cos(angle + 0.02) + 1.75,
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
