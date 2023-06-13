import * as THREE from 'three'
import { useCursor, useVideoTexture } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { easing } from 'maath';
import { useRoute, useLocation } from 'wouter';
import { useControls } from 'leva';


export const Frames = ({ Children, pointerMissDeactivate = false, bigImageFocusX = 0, bigImageFocus = 0.6, smallImageFocus = 0.5, basePOV = [0, -0.4, 1.3], images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) => {
    const ref = useRef()
    const clicked = useRef()
    const [, params] = useRoute('/:id')
    const [, setLocation] = useLocation()


    useEffect(() => {
        clicked.current = ref.current.getObjectByName(params?.id)
        if (clicked.current) {
            clicked.current.updateWorldMatrix(true, true)
            clicked.current.localToWorld(p.set(bigImageFocusX, 0, (params?.id[0] == params?.id[0].toUpperCase()) ? bigImageFocus : smallImageFocus))
            clicked.current.getWorldQuaternion(q)
        } else {
            p.set(...basePOV)
            q.identity()
        }
    })

    useFrame((state, dt) => {
        easing.damp3(state.camera.position, p, 0.4, dt)
        easing.dampQ(state.camera.quaternion, q, 0.4, dt)
    })

    return <>
        <group
            ref={ref}
            onClick={(e) => (e.stopPropagation(), setLocation(clicked.current === e.object ? '/' : '/' + e.object.name))}
            onPointerMissed={() => (!pointerMissDeactivate && setLocation('/'))}>

            {images.map((props, i) => <Children key={i} {...props} />)}
        </group>
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