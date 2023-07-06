import { Html, useGLTF, useTexture } from '@react-three/drei'
import { useState } from 'react';
import { useEffect } from 'react';
import './Waiting.css'

const RoomName = "WhiteRoom"
const url = 'https://fluid-threejs.netlify.app/'
const image = { name: "WhiteRoom", position: [-0.08, 1.17, 0.4], args: [171, 6.8], url: url, waitingTime: 95000 }


// We can not adapt Frames structure cuz the degrading in FPS so no motion is better exp.
export default function Waiting({ activeRoomName }) {

    const isActive = activeRoomName == RoomName
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            isActive && setShow(true);
        }, 1000);
        !isActive && setShow(false)

        return () => clearTimeout(timeoutId);
    }, [isActive]);


    const { nodes } = useGLTF('./model//Waiting/Waiting.glb')
    const bakedTexture = useTexture('./model/Waiting/Waiting.jpg')
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
            <div className={`zoom-in-out-fade-Waiting ${show ? 'show' : 'hide'}`}>

                <iframe
                    style={{
                        width: 1048 + image.args[0],
                        height: 670 + image.args[1],
                    }}
                    src={image.url} />
            </div>
        </Html>

    </>
}