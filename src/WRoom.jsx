import { Center, OrbitControls, useGLTF, useTexture } from '@react-three/drei'


export default function WRoom() {


    const { nodes } = useGLTF('./model//WRoom/WRoom.glb')
    // const { nodes: jnodes } = useGLTF('./model/WRoom/Vase.glb')
    console.log(nodes);
    // console.log(nodes);
    // console.log(jnodes);

    const bakedTexture = useTexture('./model/WRoom/WRoom.jpg')
    // const jarsTexture = useTexture('./model/WRoom/Vase.jpg')
    bakedTexture.flipY = false
    // jarsTexture.flipY = false

    return <>
        <color args={['#201919']} attach="background" />


        <Center>

            <mesh geometry={nodes.baked.geometry}>
                <meshBasicMaterial map={bakedTexture} />
            </mesh>
            <mesh geometry={nodes.image.geometry}>
                <meshBasicMaterial />
            </mesh>



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