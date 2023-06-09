import { Center, OrbitControls, useGLTF, useTexture } from '@react-three/drei'


export default function BRoom() {


    const { nodes } = useGLTF('./model//BRoom/BRoom.glb')
    // const { nodes: jnodes } = useGLTF('./model/BRoom/Vase.glb')
    // console.log(nodes);
    // console.log(nodes);
    // console.log(jnodes);

    const bakedTexture = useTexture('./model/BRoom/BRoom.jpg')
    // const jarsTexture = useTexture('./model/BRoom/Vase.jpg')
    bakedTexture.flipY = false
    // jarsTexture.flipY = false

    return <>
        <color args={['#201919']} attach="background" />


        <Center>

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