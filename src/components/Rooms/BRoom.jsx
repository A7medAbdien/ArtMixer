import * as THREE from 'three'
import { Center, useGLTF, useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber';
import { Frames } from '../Frames';

export default function BRoom() {

    const { nodes } = useGLTF('./model/BRoom/BRoom.glb')
    const bakedTexture = useTexture('./model/BRoom/BRoom.jpg')
    const ImageA = useLoader(THREE.TextureLoader, 'https://images.pexels.com/photos/3934093/pexels-photo-3934093.jpeg')

    bakedTexture.flipY = false

    const images = [
        // Big Images
        { name: "ImageB", position: [-0.57, 1.245, 0.4], args: [0.76, 0.76], texture: ImageA },
        { name: "ImageE", position: [1.24, 1.245, 0.4], args: [0.76, 0.76], texture: ImageA },
        // Small Images
        { name: "imageA", position: [-1.5, 1.27, 0.4], args: [0.58, 0.58], texture: ImageA },
        { name: "imageC", position: [0.36, 1.71, 0.4], args: [0.58, 0.58], texture: ImageA },
        { name: "imageD", position: [0.36, 1, 0.4], args: [0.58, 0.58], texture: ImageA }
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

