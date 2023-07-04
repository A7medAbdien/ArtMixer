import { Box, Center } from '@react-three/drei'
import gsap from 'gsap';
import { createRef, useRef } from 'react';

import Kitchen from './Rooms/Kitchen'
import GRoom from './Rooms/GRoom'
import BRoom from './Rooms/BRoom'
import WRoom from './Rooms/WRoom'
import { useState } from 'react';
import { useLocation, useRoute } from 'wouter';
import { useEffect } from 'react';
import { Arrows } from './Arrows';
import { cloneElement } from 'react';
import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';
import Thanks from './Rooms/Thanks';


export const Rooms = forwardRef(({ setAreRoomsReady, userId, setColorB, activeRoomIndex, setActiveRoomIndex, introDone }, ref) => {

    /**
     * Rotation Action
     */
    const count = 5
    const baseTheta = 360 / count
    const [boxesTheta, setBoxesTheta] = useState(Array.from({ length: count }).map((_, i) => i * baseTheta))
    const [isRolling, setRolling] = useState(false)
    // const [activeRoomIndex, setActiveRoomIndex] = useState(0)
    const [activeRoomName, setActiveRoomName] = useState("init")

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
        setTimeout(() => {
            setColorB(roomList[alignIndexWithTheta(temp)].color)
        }, (DURATION * 900) / 2);
        setActiveRoomName(roomList[alignIndexWithTheta(temp)].name)
    }

    useImperativeHandle(ref, () => ({
        rollNext() {
            !isRolling && rollAll(true)
        },
        rollBack() {
            !isRolling && rollAll(false)
        },
    }));

    // Default Room
    useEffect(() => {
        introDone && setActiveRoomName(roomList[alignIndexWithTheta(0)].name)
    }, [introDone])


    const [isContentImageUploaded, setIsContentImageUploaded] = useState(false)
    const [isStyleImageUploaded, setIsStyleImageUploaded] = useState(false)
    const [isNotebookOpened, setIsNotebookOpened] = useState(false)
    const [isNotebookExecuted, setIsNotebookExecuted] = useState(false)
    const RoomColors = [
        '#937855', // K
        '#275e3f', // G
        '#937855', // T
        '#386f7c', // W
        '#27455f', // B
    ]
    // base theta shows the room on the right + rolling goes in the oboist direction of theta or i
    const roomList = [
        {
            id: 2,
            name: 'GreenRoom',
            color: '#275e3f',
            component: <GRoom />,
            props: {
                activeRoomName: activeRoomName,
                setIsNotebookOpened: setIsNotebookOpened, setIsNotebookExecuted: setIsNotebookExecuted,
                isContentImageUploaded: isContentImageUploaded, isStyleImageUploaded: isStyleImageUploaded
            }
        },
        {
            id: 1,
            name: 'Kitchen',
            color: '#937855',
            component: <Kitchen />,
            props: {
                activeRoomName: activeRoomName, userId: userId,
                setIsContentImageUploaded: setIsContentImageUploaded, setIsStyleImageUploaded: setIsStyleImageUploaded,
                setAreRoomsReady: setAreRoomsReady, introDone: introDone
            }
        },
        {
            id: 5,
            name: 'Thanks',
            color: '#8f2a2a',
            component: <Thanks />,
            props: { activeRoomName: activeRoomName }
        },
        {
            id: 4,
            name: 'BlueRoom',
            color: '#27455f',
            component: <BRoom />,
            props: {
                activeRoomName: activeRoomName, userId: userId,
                isNotebookExecuted: isNotebookExecuted, isNotebookOpened: isNotebookOpened,
                isContentImageUploaded: isContentImageUploaded, isStyleImageUploaded: isStyleImageUploaded
            }
        },
        {
            id: 3,
            name: 'WhiteRoom',
            color: '#386f7c',
            component: <WRoom />,
            props: { activeRoomName: activeRoomName }
        },
    ];

    return <>
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
                    {cloneElement(roomList[i].component, roomList[i].props)}
                </Center>
            </group>
        })}
    </>
})


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

/** I think the theta is not aligned with the i so 
 * either to fix the theta or to align i with the theta
 * (4-i)%5 to move in the opposite direction
 * + 2 to add padding
 */
const alignIndexWithTheta = (i) => (4 - i + 2) % 5