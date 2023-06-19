import * as THREE from 'three'
import { Center, OrbitControls, useGLTF, useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber';
import { Frames, HoverableFrame, ImageFrame } from '../Frames';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { baseURL } from '../../_';


const RoomName = "Kitchen"
const images = [
    // Big Images
    { name: RoomName + "ContentImage", position: [-0.45, 1.11, 0.5], args: [0.46, 0.46], defaultImageURL: baseURL + '/content.jpg' },
    { name: RoomName + "StyleImage", position: [0.32, 1.11, 0.5], args: [0.46, 0.46], defaultImageURL: baseURL + '/style.jpg' }
]
const buttonFrames = [
    // Small Images
    { name: "content", position: [-0.07, 1.242, 0.5], args: [0.21, 0.21], defaultImageURL: baseURL + '/content.jpg' },
    { name: "style", position: [-0.07, 0.978, 0.5], args: [0.21, 0.21], defaultImageURL: baseURL + '/style.jpg' }
]
const bigImageFocus = 0.5
const basePOV = [0, 0, -3.5]

export default function Kitchen({ userId, setIsContentImageUploaded, setIsStyleImageUploaded, activeRoomName }) {

    /**
     * Loading GLTF models
     */
    const { nodes } = useGLTF('./model/Kitchen/MRoom.glb')
    const bakedTexture = useTexture('./model/Kitchen/MRoom.jpg')
    const Palette = useTexture('./model/Kitchen/Palette.jpg')
    const FrameLeft = useTexture('./model/Kitchen/FrameLeft.jpg')
    const FrameRight = useTexture('./model/Kitchen/FrameRight.jpg')

    bakedTexture.flipY = false
    Palette.flipY = false
    FrameLeft.flipY = false
    FrameRight.flipY = false

    /**
     * Widget Part
     */
    const [contentImageUrl, setContentImageUrl] = useState();
    const [styleImageUrl, setStyleImageUrl] = useState();


    images[0]['imageUrl'] = contentImageUrl
    images[1]['imageUrl'] = styleImageUrl
    buttonFrames[0]['setImageUrl'] = setContentImageUrl
    buttonFrames[1]['setImageUrl'] = setStyleImageUrl


    /**
     * isImagesUploaded
     */
    useEffect(() => {
        contentImageUrl && setIsContentImageUploaded(true)
        styleImageUrl && setIsStyleImageUploaded(true)
    }, [contentImageUrl, styleImageUrl])

    return <>
        <group >

            <mesh geometry={nodes.baked.geometry}>
                <meshBasicMaterial map={bakedTexture} />
            </mesh>

            <mesh geometry={nodes.Palette001.geometry}>
                <meshBasicMaterial map={Palette} />
            </mesh>
            <mesh geometry={nodes.FrameLeft001.geometry}>
                <meshBasicMaterial map={FrameLeft} />
            </mesh>
            <mesh geometry={nodes.FrameRight001.geometry}>
                <meshBasicMaterial map={FrameRight} />
            </mesh>

            <Frames name={RoomName} activeRoomName={activeRoomName} Children={Frame} bigImageFocus={bigImageFocus} basePOV={basePOV} images={images} />

            {buttonFrames.map((props, i) => userId && <ButtonFrame key={i} userId={userId} {...props} />)}
        </group>
    </>
}


const Frame = ({ imageUrl, name, position, args, defaultImageURL }) => {

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


const ButtonFrame = ({ setImageUrl, userId, ...props }) => {
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
            publicId: props.name + userId,
            sources: ['local', 'url', 'image_search'],
            resourceType: 'image'
        }, handleImageUpload)
    }, [])

    return <>
        <group onClick={() => widgetRef.current.open()}>
            <Frame {...props} />
        </group>
    </>
}