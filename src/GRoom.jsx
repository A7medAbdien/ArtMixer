import { Center, OrbitControls, useGLTF, useTexture } from '@react-three/drei'


export default function GRoom() {


    const { nodes } = useGLTF('./model//GRoom/GRoom2.glb')
    const { nodes: jnodes } = useGLTF('./model/GRoom/Vase.glb')
    // console.log(nodes);
    // console.log(nodes);
    console.log(jnodes);

    const bakedTexture = useTexture('./model/GRoom/GRoom2.jpg')
    const jarsTexture = useTexture('./model/GRoom/Vase.jpg')
    bakedTexture.flipY = false
    jarsTexture.flipY = false

    return <>
        <color args={['#201919']} attach="background" />


        <Center>

            <mesh geometry={jnodes.Modern_White_Vase001.geometry}>
                <meshBasicMaterial map={jarsTexture} />
            </mesh>
            <mesh geometry={nodes.baked.geometry}>
                <meshBasicMaterial map={bakedTexture} />
            </mesh>
            {/* <mesh geometry={nodes.baked.geometry}>
                <meshBasicMaterial map={bakedTexture} />
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