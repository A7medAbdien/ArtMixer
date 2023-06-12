import * as THREE from 'three'
import { Center, OrbitControls, useGLTF, useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber';
import { Frames } from '../Frames';


export default function Kitchen() {


    const url = 'https://images.pexels.com/photos/3934093/pexels-photo-3934093.jpeg'

    const images = [
        // Big Images
        { name: "ContentImage", position: [-0.45, 1.11, 0.5], args: [0.46, 0.46], url: url, waitingTime: 2000 },
        { name: "StyleImage", position: [0.32, 1.11, 0.5], args: [0.46, 0.46], url: url, waitingTime: 2000 },
        // Small Images
        { name: "topImage", position: [-0.07, 1.242, 0.5], args: [0.21, 0.21], url: url, waitingTime: 3000 },
        { name: "bottomImage", position: [-0.07, 0.978, 0.5], args: [0.21, 0.21], url: url, waitingTime: 3000 },
    ]



    // Loading GLTF models
    const { nodes } = useGLTF('./model/Kitchen/MyKitchen2.glb')
    const { nodes: canisterNodes } = useGLTF('./model/Kitchen/jars.glb')
    const bakedTexture = useTexture('./model/Kitchen/kBacked.jpg')
    const canisterTexture = useTexture('./model/Kitchen/jars.jpg')
    bakedTexture.flipY = false
    canisterTexture.flipY = false

    return <>


        <Center>
            <group scale={1.8}>
                <mesh geometry={canisterNodes.KCanister.geometry}>
                    <meshBasicMaterial map={canisterTexture} />
                </mesh>

                <mesh geometry={nodes.baked.geometry}>
                    <meshBasicMaterial map={bakedTexture} />
                </mesh>

                <Frames smallImageFocus={0.2} basePOV={[0, -0.44, 1.9]} images={images} />
            </group>
        </Center>
    </>
}