import * as THREE from 'three'
import { Center, useCursor, useGLTF, useTexture } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { easing } from 'maath';
import { useControls } from 'leva';

export default function BRoom() {


    const { nodes } = useGLTF('./model/BRoom/BRoom.glb')
    const bakedTexture = useTexture('./model/BRoom/BRoom.jpg')
    const ImageA = useLoader(THREE.TextureLoader, 'https://images.pexels.com/photos/17137556/pexels-photo-17137556/free-photo-of-wood-animal-tree-lizard.jpeg')
    console.log(nodes);
    bakedTexture.flipY = false
    // ImageA.flipY = false


    const images = [
        // Big ones
        { position: [-0.57, 1.245, 0.4], args: [0.76, 0.76], texture: ImageA },
        { position: [1.24, 1.245, 0.4], args: [0.76, 0.76], texture: ImageA },
        // Small ones
        { position: [-1.5, 1.27, 0.4], args: [0.58, 0.58], texture: ImageA },
        { position: [0.36, 1.71, 0.4], args: [0.58, 0.58], texture: ImageA },
        { position: [0.36, 1, 0.4], args: [0.58, 0.58], texture: ImageA }
    ]


    return <>
        <Center>
            <group rotation={[0, 0, 0]}>
                <mesh geometry={nodes.baked.geometry}>
                    <meshBasicMaterial map={bakedTexture} />
                </mesh>

                <Frame {...images[3]} />
            </group>
        </Center>
    </>
}


const Frame = ({ position, args, texture }) => {
    const image = useRef()
    const [hovered, hover] = useState(false)

    useCursor(hovered)
    useFrame((state, dt) => {

        easing.damp3(image.current.scale, [1 * (hovered ? 0.9 : 1), 1 * (hovered ? 0.9 : 1), 1], 0.1, dt)

    })

    return <>
        <mesh
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