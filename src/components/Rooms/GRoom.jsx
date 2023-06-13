import { Center, Html, Text, useGLTF, useTexture, useVideoTexture } from '@react-three/drei'
import { useControls } from 'leva';
import { Frames, HoverableFrame, VideoFrame } from '../Frames';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRoute } from 'wouter';


export default function GRoom() {

    const { position, scale } = useControls('GRoom',
        {
            position:
            {
                value: { x: -1.33, y: 1.645 },
                // value: { x: 0, y: 0 },
                step: 0.01,
                joystick: 'invertY'
            },
            // {"position":{"x":0.205600048828125,"y":1.123200004577637}}
            scale:
            {

                value: { x: 0.45, y: 1.5 },
                // value: { x: -349.2, y: -246.0 },
                step: 0.001,
                joystick: 'invertY'
            },
            // {"scale":{"x":-349.20000000000016,"y":-246.0599983215332}}
        })

    const images = [
        { name: "ImageB", position: [0.227, 1.13, 0.4], args: [2.2, 1.4], url: '10.mp4' },
    ]

    const textPosition = [position.x, position.y, 0.4]
    const { nodes } = useGLTF('./model//GRoom/GRoom2.glb')
    const { nodes: vaseNodes } = useGLTF('./model/GRoom/Vase.glb')
    const bakedTexture = useTexture('./model/GRoom/GRoom2.jpg')
    const vaseTexture = useTexture('./model/GRoom/Vase.jpg')
    bakedTexture.flipY = false
    vaseTexture.flipY = false


    return <>
        <group position={[0, 0, 0]}>
            <Center>

                <mesh geometry={vaseNodes.Modern_White_Vase001.geometry}>
                    <meshBasicMaterial map={vaseTexture} />
                </mesh>

                <mesh geometry={nodes.baked.geometry}>
                    <meshBasicMaterial map={bakedTexture} />
                </mesh>

                <Frames basePOV={[0, -0.33, 1.23]} bigImageFocus={1.05} bigImageFocusX={-0.31} Children={Frame} images={images} pointerMissDeactivate />

                <MassageBubble textPosition={textPosition} />

            </Center>
        </group>
    </>
}


const Frame = ({ name, position, args, url }) => {

    return <>
        <HoverableFrame shrinkX={0.95} shrinkY={0.87} position={position}>
            <mesh name={name}>
                <planeGeometry args={args} />
                <VideoFrame url={url} />
            </mesh>
        </HoverableFrame>
    </>
}


const MassageBubble = ({ textPosition }) => {

    const [show, setShow] = useState(false);
    const [, params] = useRoute('/:id')

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            params && setShow(true);
        }, 1000);
        !params && setShow(false)

        return () => clearTimeout(timeoutId);
    }, [params]);


    return <>
        <Html
            transform
            scale={0.5}
            distanceFactor={1.17}
            position={textPosition}>

            <div className={`zoom-in-out-fade-example ${show ? 'show' : 'hide'}`}>
                <div className="talk-bubble tri-right round right-top">
                    <div className="talktext">
                        <ol>
                            <li>Open <a target="_blank" href="https://www.example.com"> ArtMixer Notebook</a></li>
                            <li>On top left corner, open "Runtime"</li>
                            <li>Choose "Run All"</li>
                        </ol>
                    </div>
                </div>
            </div>
            {/* <ZoomInOutFadeExample /> */}
        </Html>
    </>
}