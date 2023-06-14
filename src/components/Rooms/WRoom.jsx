import * as THREE from 'three'
import { Center, Html, Image, useGLTF, useTexture } from '@react-three/drei'
import { useControls } from 'leva'
import { useState } from 'react';
import { useRoute } from 'wouter';
import { useEffect } from 'react';


export default function WRoom() {


    const url = 'https://fluid-threejs.netlify.app/'
    const image = { name: "WhiteRoom", position: [-0.06879992675781248, 1.1583999862670897, 0.4], args: [53.4, -52.5], url: url, waitingTime: 95000 }

    const [show, setShow] = useState(false);
    const [, params] = useRoute('/:id')

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            params && (params.id == image.name) && setShow(true);
        }, 1000);
        !params || !(params.id == image.name) && setShow(false)

        return () => clearTimeout(timeoutId);
    }, [params]);


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
        {show && <mesh
            geometry={nodes.image.geometry}>

            <Html
                transform
                wrapperClass='htmlScreen'
                distanceFactor={1.17}
                position={image.position}
            >
                <div className={`zoom-in-out-fade-example ${show ? 'show' : 'hide'}`}>

                    <iframe
                        style={{
                            width: 1048 + image.args[0],
                            height: 670 + image.args[1],
                        }}
                        src='https://fluid-threejs.netlify.app/' />
                </div>
            </Html>
            <meshBasicMaterial transparent opacity={0} />
        </mesh>}

        {/* </Center> */}
    </>
}