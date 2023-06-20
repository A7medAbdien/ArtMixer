import * as THREE from 'three'
import { Center, Html, Image, useGLTF, useTexture } from '@react-three/drei'
import { useControls } from 'leva'
import { useState } from 'react';
import { useRoute } from 'wouter';
import { useEffect } from 'react';

const RoomName = "WhiteRoom"
export default function WRoom({ activeRoomName }) {


    const url = 'https://fluid-threejs.netlify.app/'
    const image = { name: "WhiteRoom", position: [-0.08, 1.17, 0.4], args: [171, 6.8], url: url, waitingTime: 95000 }

    const [show, setShow] = useState(false);
    // const isActive = activeRoomName == RoomName
    const isActive = true

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            isActive && setShow(true);
        }, 1000);
        !isActive && setShow(false)

        return () => clearTimeout(timeoutId);
    }, [isActive]);


    const { nodes } = useGLTF('./model//WRoom/WRoom.glb')
    const bakedTexture = useTexture('./model/WRoom/WRoom.jpg')
    bakedTexture.flipY = false

    return <>
        <color args={['#201919']} attach="background" />


        <mesh
            geometry={nodes.baked.geometry}>
            <meshBasicMaterial map={bakedTexture} />
        </mesh>

        <Html
            transform
            wrapperClass='htmlScreen'
            distanceFactor={1.17}
            position={image.position}
        >
            <div className={`zoom-in-out-fade-WRoom ${show ? 'show' : 'hide'}`}>

                <iframe
                    style={{
                        width: 1048 + image.args[0],
                        height: 670 + image.args[1],
                    }}
                    src='https://fluid-threejs.netlify.app/' />
            </div>
        </Html>

    </>
}