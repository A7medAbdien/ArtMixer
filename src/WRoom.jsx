import { Center, Float, MeshReflectorMaterial, OrbitControls, useGLTF, useTexture } from '@react-three/drei'


export default function WRoom() {


    const { nodes } = useGLTF('./model//WRoom/Floor.glb')

    console.log(nodes);
    // console.log(nodes);
    // console.log(jnodes);

    const bakedTexture = useTexture('./model/WRoom/WRoom.jpg')

    bakedTexture.flipY = false
    // jarsTexture.flipY = false

    return <>
        <color args={['#201919']} attach="background" />


        <Center>

            <mesh geometry={nodes.Floor001.geometry}>
                <MeshReflectorMaterial
                    blur={[300, 100]}
                    resolution={2048 / 4}
                    mixBlur={1}
                    mixStrength={50}
                    roughness={1}
                    depthScale={1.2}
                    minDepthThreshold={0.4}
                    maxDepthThreshold={1.4}
                    color="Red"
                    metalness={0.5}
                />
            </mesh>
            <Float>
                <mesh geometry={nodes.image.geometry}>
                    <meshStandardMaterial />
                </mesh>
            </Float>


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