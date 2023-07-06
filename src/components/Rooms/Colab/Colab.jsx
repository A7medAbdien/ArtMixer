import { Html, useGLTF, useTexture, } from '@react-three/drei'
import { Frames, HoverableFrame, VideoFrame } from '../Frames';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRoute } from 'wouter';
import './Colab.css'

const ColabURL = 'https://colab.research.google.com/drive/1OXlnwQFJnGY0eFIsFIUDvIn6BwewCDyS'
const RoomName = "GreenRoom"
const images = [
    { name: RoomName + "Video", position: [0.227, 1.13, 0.4], args: [2.2, 1.4], url: '10.mp4' },
]
const textPosition = [-1.355, 1.55, 0.4]

export default function Colab({ activeRoomName, setIsNotebookOpened, setIsNotebookExecuted }) {

    const { nodes } = useGLTF('./model//Colab/Colab.glb')
    const { nodes: vaseNodes } = useGLTF('./model/Colab/Vase.glb')
    const bakedTexture = useTexture('./model/Colab/Colab.jpg')
    const vaseTexture = useTexture('./model/Colab/Vase.jpg')
    bakedTexture.flipY = false
    vaseTexture.flipY = false


    return <>
        <group position={[0, 0, 0]}>

            <mesh geometry={vaseNodes.Modern_White_Vase001.geometry}>
                <meshBasicMaterial map={vaseTexture} />
            </mesh>

            <mesh geometry={nodes.baked.geometry}>
                <meshBasicMaterial map={bakedTexture} />
            </mesh>

            <Frames name={RoomName} activeRoomName={activeRoomName} bigImageFocus={1.05} bigImageFocusX={-0.31} Children={Frame} images={images} pointerMissDeactivate={true} />

            <MassageBubble textPosition={textPosition} setIsNotebookOpened={setIsNotebookOpened} setIsNotebookExecuted={setIsNotebookExecuted} />

        </group >
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


const MassageBubble = ({ textPosition, setIsNotebookOpened, setIsNotebookExecuted }) => {

    const [show, setShow] = useState(false);
    const [, params] = useRoute('/:id')
    const isActive = params?.id == images[0].name

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            isActive && setShow(true);
        }, 1000);
        !isActive && setShow(false)

        return () => clearTimeout(timeoutId);
    }, [params]);


    return <>
        <Html
            transform
            scale={0.5}
            distanceFactor={1.17}
            position={textPosition}
        >
            <div onClick={(e) => (e.stopPropagation())} className={`zoom-in-out-fade-colab ${show ? 'show' : 'hide'}`}>
                <div className="talk-bubble-colab tri-right round right-top">
                    <div className="talktext">
                        <ol>
                            <li>Open <a target="_blank" onClick={() => setIsNotebookOpened(true)} href={ColabURL}> ArtMixer Notebook</a></li>
                            <li>On top left corner, open "Runtime"</li>
                            <li>Choose "Run All"</li>
                            <li>When u done <a onClick={() => setIsNotebookExecuted(true)}>Click me 😊</a></li>
                        </ol>
                    </div>
                </div>
            </div>
        </Html >
    </>
}