import * as THREE from 'three'
import { useCursor } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { easing } from 'maath';
import { useRoute, useLocation } from 'wouter';
import { useControls } from 'leva';


export const Frames = ({ images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) => {
    const ref = useRef()
    const clicked = useRef()
    const [, params] = useRoute('/:id')
    const [, setLocation] = useLocation()

    useEffect(() => {
        clicked.current = ref.current.getObjectByName(params?.id)
        if (clicked.current) {
            clicked.current.updateWorldMatrix(true, true)
            clicked.current.localToWorld(p.set(0, 0, (params?.id[0] == params?.id[0].toUpperCase()) ? 0.6 : 0.5))
            clicked.current.getWorldQuaternion(q)
        } else {
            p.set(0, -0.4, 1.3)
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
            onPointerMissed={() => setLocation('/')}>

            {images.map((props) => <Frame {...props} />)}
        </group>
    </>
}

const Frame = ({ name, position, args, texture }) => {
    const image = useRef()
    const [hovered, hover] = useState(false)

    useCursor(hovered)
    useFrame((state, dt) => {

        easing.damp3(image.current.scale, [1 * (hovered ? 0.9 : 1), 1 * (hovered ? 0.9 : 1), 1], 0.1, dt)

    })

    return <>
        <mesh
            name={name}
            ref={image}
            onPointerOver={(e) => (e.stopPropagation(), hover(true))}
            onPointerOut={() => hover(false)}
            position={position}
        >
            <planeGeometry args={args} />
            <meshBasicMaterial attach="material" map={texture} toneMapped={false} />
        </mesh>
    </>
}