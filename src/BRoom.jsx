import * as THREE from 'three'
import { Center, useGLTF, useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber';


export default function BRoom() {


    const { nodes } = useGLTF('./model//BRoom/BRoom.glb')
    console.log(nodes);

    const ImageA = useLoader(THREE.TextureLoader, 'https://images.pexels.com/photos/17137556/pexels-photo-17137556/free-photo-of-wood-animal-tree-lizard.jpeg')
    ImageA.flipY = false

    const bakedTexture = useTexture('./model/BRoom/BRoom.jpg')
    bakedTexture.flipY = false

    return <>
        <color args={['#201919']} attach="background" />


        <Center>
            <group rotation={[0, Math.PI / 2, 0]}>
                <mesh geometry={nodes.baked.geometry}>
                    <meshBasicMaterial map={bakedTexture} />
                </mesh>

                <mesh
                    geometry={nodes.ImageA.geometry}>
                    <meshBasicMaterial attach="material" map={ImageA} toneMapped={false} />
                </mesh>

            </group>
        </Center>
    </>
}