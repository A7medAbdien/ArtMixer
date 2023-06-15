import * as THREE from 'three'
import { Center, OrbitControls, useGLTF, useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber';
import { Frames, HoverableFrame, ImageFrame } from '../Frames';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';


const RoomName = "Kitchen"

export default function Kitchen() {

    /**
     * Loading GLTF models
     */
    const { nodes } = useGLTF('./model/Kitchen/MyKitchen2.glb')
    const { nodes: canisterNodes } = useGLTF('./model/Kitchen/jars.glb')
    const bakedTexture = useTexture('./model/Kitchen/kBacked.jpg')
    const canisterTexture = useTexture('./model/Kitchen/jars.jpg')
    bakedTexture.flipY = false
    canisterTexture.flipY = false

    /**
     * Widget Part
     */
    const [contentImageUrl, setContentImageUrl] = useState('');
    const [styleImageUrl, setStyleImageUrl] = useState('');


    const images = [
        // Big Images
        { name: RoomName + "ContentImage", position: [-0.45, 1.11, 0.5], args: [0.46, 0.46], imageUrl: contentImageUrl },
        { name: RoomName + "StyleImage", position: [0.32, 1.11, 0.5], args: [0.46, 0.46], imageUrl: styleImageUrl },
    ]

    const buttonFrames = [
        // Small Images
        { name: RoomName + "content", position: [-0.07, 1.242, 0.5], args: [0.21, 0.21], setImageUrl: setContentImageUrl },
        { name: RoomName + "style", position: [-0.07, 0.978, 0.5], args: [0.21, 0.21], setImageUrl: setStyleImageUrl }
    ]

    return <>
        {/* <Center> */}
        <group scale={1.15}>
            <mesh geometry={canisterNodes.KCanister.geometry}>
                <meshBasicMaterial map={canisterTexture} />
            </mesh>

            <mesh geometry={nodes.baked.geometry}>
                <meshBasicMaterial map={bakedTexture} />
            </mesh>

            <Frames name={RoomName} Children={Frame} bigImageFocus={0.4} basePOV={[0, -0.44, 1.9]} images={images} />

            {buttonFrames.map((props, i) => <ButtonFrame key={i} {...props} />)}
        </group>
        {/* </Center> */}
    </>
}


const Frame = ({ imageUrl, name, position, args }) => {

    const defaultImageURL = 'https://images.pexels.com/photos/17131288/pexels-photo-17131288/free-photo-of-antelope-canyon-paths.jpeg'

    return <>
        <HoverableFrame position={position}>
            <mesh name={name}>
                <planeGeometry args={args} />

                {imageUrl ? (
                    <ImageFrame url={imageUrl} />
                ) : (
                    <ImageFrame url={defaultImageURL} />
                )}
            </mesh>
        </HoverableFrame>
    </>
}


const ButtonFrame = ({ setImageUrl, ...props }) => {

    const cloudinaryRef = useRef()
    const widgetRef = useRef()


    const handleImageUpload = (_, result) => {

        if (result && result.event === 'success') {
            setImageUrl(result.info.url);
        }
    };

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "dcmthd8bn",
            uploadPreset: "utmds9zl",
            publicId: props.name,
            sources: ['local', 'url', 'image_search'],
        }, handleImageUpload)
    }, [])

    return <>
        <group onClick={() => widgetRef.current.open()}>
            <Frame {...props} />
        </group>
    </>
}