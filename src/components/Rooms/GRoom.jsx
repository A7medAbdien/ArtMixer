import { Center, Html, useGLTF, useTexture, useVideoTexture } from '@react-three/drei'
import { useControls } from 'leva';


export default function GRoom() {

    const { position, scale } = useControls('GRoom',
        {
            position:
            {
                value: { x: 0.2056, y: 1.123 },
                step: 0.001,
                joystick: 'invertY'
            },
            // {"position":{"x":0.205600048828125,"y":1.123200004577637}}
            scale:
            {

                value: { x: 2.4, y: 1.5 },
                // value: { x: -349.2, y: -246.0 },
                step: 0.1,
                joystick: 'invertY'
            },
            // {"scale":{"x":-349.20000000000016,"y":-246.0599983215332}}
        })


    const { nodes } = useGLTF('./model//GRoom/GRoom2.glb')
    const { nodes: jnodes } = useGLTF('./model/GRoom/Vase.glb')
    console.log(nodes);

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

            <mesh
                scale={[scale.x, scale.y, 0]}
                position={[position.x, position.y, 0.4]} >
                <planeGeometry />
                <VideoMaterial url="10.mp4" />
                {/* <meshBasicMaterial /> */}
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

function VideoMaterial({ url }) {
    const texture = useVideoTexture(url)
    return <meshBasicMaterial map={texture} toneMapped={false} />
}