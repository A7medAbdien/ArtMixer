import { Box, Center } from '@react-three/drei'
import gsap from 'gsap';
import { createRef, useRef } from 'react';

import Kitchen from './Rooms/Kitchen'
import GRoom from './Rooms/GRoom'
import BRoom from './Rooms/BRoom'
import WRoom from './Rooms/WRoom'
import { useState } from 'react';
import { useLocation } from 'wouter';
import { useEffect } from 'react';
import { Arrows } from './Arrows';
import { cloneElement } from 'react';


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

export const Rooms = ({ userId }) => {

    // to identify the active room and stop the camera fight
    const [, setLocation] = useLocation()

    /**
     * Rotation Action
     */
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

        // the active room changes with each roll action
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

    // Default Room
    useEffect(() => {
        setLocation(roomList[activeRoomIndex].name)
    }, [])


    return <>


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
                    {cloneElement(roomList[i].component, { userId: userId })}
                </Center>
            </group>
        })}
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

