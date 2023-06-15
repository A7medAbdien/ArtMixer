import * as THREE from 'three'
import { useCursor, useVideoTexture } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { easing } from 'maath';
import { useRoute, useLocation } from 'wouter';
import { useControls } from 'leva';

// DOOR = "BlueRoom"
export const Frames = ({ Children, name, pointerMissDeactivate = false, bigImageFocusX = 0, bigImageFocus = -7, smallImageFocus = -10, basePOV = [0, -0.4, 1.3], images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) => {
    const ref = useRef()
    const clicked = useRef()
    const [, params] = useRoute('/:id')
    const [, setLocation] = useLocation()
    // const isActive = params.id == name
    // const isActive = (params.id).includes(name)
    console.log("ID", params.id);
    const isActive = name == "BlueRoom"
    console.log(isActive);
    const [activeRoom, setActiveRoom] = useState(null)

    useEffect(() => {
        clicked.current = ref.current.getObjectByName(params?.id)
        if (clicked.current) {
            isActive && setActiveRoom(name)
            console.log(activeRoom);
            clicked.current.updateWorldMatrix(true, true)
            clicked.current.localToWorld(p.set(bigImageFocusX, 0, 1))
            clicked.current.getWorldQuaternion(q)
        } else {
            // p.set(...basePOV)
            p.set(...[0, 0, -4])
            // p.set(...[0, 0, 2])
            q.identity()
        }
    })

    useFrame((state, dt) => {
        if (isActive && activeRoom == "BlueRoom") {
            // console.log("hi");
            easing.damp3(state.camera.position, p, 0.4, dt)
            easing.dampQ(state.camera.quaternion, q, 0.4, dt)
        }
    })

    return <>
        <group
            ref={ref}
            onClick={(e) => (e.stopPropagation(), setLocation(clicked.current === e.object ? `/${activeRoom}` : '/' + e.object.name))}
        // onPointerMissed={() => (!pointerMissDeactivate && setLocation('/'))}
        >

            {images.map((props, i) => <Children key={i} {...props} />)}
        </group >
    </>
}

export const HoverableFrame = ({ children, position, shrinkX = 0.9, shrinkY = 0.9, colorNotScale = false }) => {
    const meshRef = useRef()
    const [hovered, setHovered] = useState(false)

    useCursor(hovered)
    useFrame((state, dt) => {
        !colorNotScale && easing.damp3(meshRef.current.scale, [1 * (hovered ? shrinkX : 1), 1 * (hovered ? shrinkY : 1), 1], 0.1, dt)
        colorNotScale && easing.dampC(meshRef.current.children[0].material.color, hovered ? '#4f75ca' : '#3f3e3c')
    })

    return (
        <mesh
            ref={meshRef}
            onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
            onPointerOut={() => setHovered(false)}
            position={position}
        >
            {children}
        </mesh>
    )
}

export const ImageFrame = ({ url }) => {
    const image = useLoader(THREE.TextureLoader, url)
    return <meshBasicMaterial attach="material" map={image} toneMapped={false} />
}

export const VideoFrame = ({ url }) => {
    const texture = useVideoTexture(url)
    return <meshBasicMaterial map={texture} toneMapped={false} />
}