import * as THREE from 'three'
import { Center, useCursor, useGLTF, useTexture } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { easing } from 'maath';
import { useControls } from 'leva';


export default function BRoom() {

    const { position, scale } = useControls('GRoom',
        {
            position:
            {
                value: { x: 0.36, y: 1 },
                step: 0.01,
                joystick: 'invertY'
            },
            // {"position":{"x":0.205600048828125,"y":1.123200004577637}}
            scale:
            {

                value: { x: 0.58, y: 0.58 },
                // value: { x: -349.2, y: -246.0 },
                step: 0.01,
                joystick: 'invertY'
            },
            // {"scale":{"x":-349.20000000000016,"y":-246.0599983215332}}
        })
    const images = {
        b: { position: { x: -0.57, y: 1.245 }, args: { x: 0.76, y: 0.76 } },
        e: { position: { x: 1.24, y: 1.245 }, args: { x: 0.76, y: 0.76 } },
        a: { position: { x: -1.5, y: 1.27 }, args: { x: 0.58, y: 0.58 } },
        c: { position: { x: 0.36, y: 1.71 }, args: { x: 0.58, y: 0.58 } },
        d: { position: { x: 0.36, y: 1 }, args: { x: 0.58, y: 0.58 } },
    }

    const { nodes } = useGLTF('./model//BRoom/BRoom.glb')
    const bakedTexture = useTexture('./model/BRoom/BRoom.jpg')
    const ImageA = useLoader(THREE.TextureLoader, 'https://images.pexels.com/photos/17137556/pexels-photo-17137556/free-photo-of-wood-animal-tree-lizard.jpeg')
    console.log(nodes);
    bakedTexture.flipY = false
    // ImageA.flipY = false


    const image = useRef()
    const [hovered, hover] = useState(false)

    useCursor(hovered)
    useFrame((state, dt) => {

        easing.damp3(image.current.scale, [1 * (hovered ? 0.9 : 1), 1 * (hovered ? 0.9 : 1), 1], 0.1, dt)

    })

    return <>


        <Center>
            <group rotation={[0, 0, 0]}>
                <mesh geometry={nodes.baked.geometry}>
                    <meshBasicMaterial map={bakedTexture} />
                </mesh>


                <mesh
                    ref={image}
                    onPointerOver={(e) => (e.stopPropagation(), hover(true))}
                    onPointerOut={() => hover(false)}
                    position={[position.x, position.y, 0.4]}
                // scale={[1, 0]}
                >
                    <planeGeometry args={[scale.x, scale.y]} />
                    <meshBasicMaterial attach="material" map={ImageA} toneMapped={false} />
                </mesh>

            </group>
        </Center>
    </>
}