import { Center, Html, useGLTF, useTexture, useVideoTexture } from '@react-three/drei'
import { useControls } from 'leva';
import { Frames, HoverableFrame, VideoFrame } from '../Frames';


export default function GRoom() {

    const images = [
        { name: "ImageB", position: [0.227, 1.13, 0.4], args: [2.2, 1.4], url: '10.mp4' },
    ]
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

                <Frames basePOV={[0, -0.33, 1.23]} bigImageFocus={1.05} bigImageFocusX={-0.31} Children={Frame} images={images} />

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