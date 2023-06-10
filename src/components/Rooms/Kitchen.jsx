import * as THREE from 'three'
import { Center, OrbitControls, useGLTF, useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber';


export default function Kitchen() {

    const { nodes } = useGLTF('./model/Kitchen/MyKitchen2.glb')
    const { nodes: jnodes } = useGLTF('./model/Kitchen/jars.glb')
    // console.log(nodes);
    console.log(nodes);


    const bakedTexture = useTexture('./model/Kitchen/kBacked.jpg')
    const jarsTexture = useTexture('./model/Kitchen/jars.jpg')
    const contentImage = useLoader(THREE.TextureLoader, 'https://images.pexels.com/photos/17137556/pexels-photo-17137556/free-photo-of-wood-animal-tree-lizard.jpeg')
    bakedTexture.flipY = false
    jarsTexture.flipY = false
    contentImage.flipY = false

    return <>
        <color args={['#201919']} attach="background" />

        <OrbitControls makeDefault />

        <Center>
            <group scale={2}>
                <mesh geometry={jnodes.KCanister.geometry}
                    position={jnodes.KCanister.position}
                >
                    <meshBasicMaterial map={jarsTexture} />
                </mesh>

                <mesh geometry={nodes.baked.geometry}>
                    <meshBasicMaterial map={bakedTexture} />
                </mesh>

                <mesh geometry={nodes.contentImage.geometry}>
                    <meshBasicMaterial attach="material" map={contentImage} toneMapped={false} />
                </mesh>
                {/* 
                <mesh geometry={nodes.styleImage.geometry}>
                    <meshBasicMaterial />
                </mesh>

                <mesh geometry={nodes.upImage.geometry}>
                    <meshBasicMaterial />
                </mesh>

                <mesh geometry={nodes.downImage.geometry}>
                    <meshBasicMaterial />
                </mesh> */}
            </group>
        </Center>
    </>
}