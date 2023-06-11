import * as THREE from 'three'
import { Center, useCursor, useGLTF, useTexture } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { easing } from 'maath';
import { useControls } from 'leva';
import { useRoute, useLocation } from 'wouter';

export default function BRoom({ q = new THREE.Quaternion(), p = new THREE.Vector3() }) {

    const { nodes } = useGLTF('./model/BRoom/BRoom.glb')
    const bakedTexture = useTexture('./model/BRoom/BRoom.jpg')
    const ImageA = useLoader(THREE.TextureLoader, 'https://images.pexels.com/photos/17137556/pexels-photo-17137556/free-photo-of-wood-animal-tree-lizard.jpeg')

    bakedTexture.flipY = false

    const images = [
        // Big Images
        { name: "ImageB", position: [-0.57, 1.245, 0.4], args: [0.76, 0.76], texture: ImageA },
        { name: "ImageE", position: [1.24, 1.245, 0.4], args: [0.76, 0.76], texture: ImageA },
        // Small Images
        { name: "ImageA", position: [-1.5, 1.27, 0.4], args: [0.58, 0.58], texture: ImageA },
        { name: "ImageC", position: [0.36, 1.71, 0.4], args: [0.58, 0.58], texture: ImageA },
        { name: "ImageD", position: [0.36, 1, 0.4], args: [0.58, 0.58], texture: ImageA }
    ]


    return <>
        <group position={[0, 0, 0]}>
            <Center>
                <mesh geometry={nodes.baked.geometry}>
                    <meshBasicMaterial map={bakedTexture} />
                </mesh>

                <Frames images={images} />
            </Center>
        </group>
    </>
}


const Frames = ({ images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) => {
    const ref = useRef()
    const clicked = useRef()
    const [, params] = useRoute('/:id')
    const [, setLocation] = useLocation()

    useEffect(() => {
        clicked.current = ref.current.getObjectByName(params?.id)
        if (clicked.current) {
            clicked.current.updateWorldMatrix(true, true)
            clicked.current.localToWorld(p.set(0, 0, (params?.id == "ImageB" || params?.id == "ImageE") ? 0.6 : 0.5))
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