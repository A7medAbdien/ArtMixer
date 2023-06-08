import { Center, OrbitControls, useGLTF, useTexture } from '@react-three/drei'


export default function Model() {

    const { nodes } = useGLTF('./model/MyKitchen2.glb')
    const { nodes: jnodes } = useGLTF('./model/jars.glb')
    // console.log(nodes);
    console.log(jnodes);

    const bakedTexture = useTexture('./model/kBacked.jpg')
    const jarsTexture = useTexture('./model/jars.jpg')
    bakedTexture.flipY = false
    jarsTexture.flipY = false

    return <>
        <color args={['#201919']} attach="background" />

        <OrbitControls makeDefault />

        <Center>
            <mesh geometry={jnodes.KCanister.geometry}
                position={jnodes.KCanister.position}
            >
                <meshBasicMaterial map={jarsTexture} />
            </mesh>

            <mesh geometry={nodes.baked.geometry}>
                <meshBasicMaterial map={bakedTexture} />
            </mesh>

            <mesh geometry={nodes.contentImage.geometry}>
                <meshBasicMaterial map={bakedTexture} />
            </mesh>

            <mesh geometry={nodes.styleImage.geometry}>
                <meshBasicMaterial map={bakedTexture} />
            </mesh>

            <mesh geometry={nodes.upImage.geometry}>
                <meshBasicMaterial map={bakedTexture} />
            </mesh>

            <mesh geometry={nodes.downImage.geometry}>
                <meshBasicMaterial map={bakedTexture} />
            </mesh>

            {/*<mesh
                geometry={nodes.poleLightB.geometry}
                position={nodes.poleLightB.position}
            >
                <meshBasicMaterial color={'#ffffe5'} />
            </mesh> */}



            {/* <Sparkles
                size={5}
                scale={[4, 2, 4]}
                position-y={1}
                speed={0.5}
                count={40}
            /> */}

        </Center>
    </>
}