import * as THREE from 'three'
import { Center, Html, Image, useGLTF, useTexture } from '@react-three/drei'
import { useControls } from 'leva'


export default function WRoom() {


    const { position, scale } = useControls('TF',
        {
            position:
            {
                value: { x: -0.06879992675781248, y: 1.1583999862670897 },
                step: 0.001,
                joystick: 'invertY'
            },
            scale:
            {
                value: { x: 53.4, y: -52.5 },
                step: 0.1,
                joystick: 'invertY'
            },

        })

    const url = "https://images.pexels.com/photos/17137556/pexels-photo-17137556/free-photo-of-wood-animal-tree-lizard.jpeg"
    const { nodes } = useGLTF('./model//WRoom/WRoom.glb')
    console.log(nodes);

    const bakedTexture = useTexture('./model/WRoom/WRoom.jpg')
    bakedTexture.flipY = false

    return <>
        <color args={['#201919']} attach="background" />


        {/* <Center> */}

        <mesh
            geometry={nodes.baked.geometry}>
            <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh
            geometry={nodes.image.geometry}>

            <Html
                transform
                wrapperClass='htmlScreen'
                distanceFactor={1.17}
                position={[position.x, position.y, 0.5]}
            >
                <iframe
                    style={{
                        width: 1048 + scale.x,
                        height: 670 + scale.y,
                    }}
                    src='https://fluid-threejs.netlify.app/' />
            </Html>
            <meshBasicMaterial transparent opacity={0} />
        </mesh>



        {/* <Sparkles
                size={5}
                scale={[4, 2, 4]}
                position-y={1}
                speed={0.5}
                count={40}
            /> */}

        {/* </Center> */}
    </>
}