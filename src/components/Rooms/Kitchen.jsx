import * as THREE from 'three'
import { Center, Html, OrbitControls, useGLTF, useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber';
import { Frames, HoverableFrame, ImageFrame } from '../Frames';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { baseURL } from '../../_';
import { useControls } from 'leva';
import { useRoute } from 'wouter';


const RoomName = "Kitchen"
const images = [
    // // Big Images
    // { name: RoomName + "ContentImage", rotation: [rotation.x, rotation.y, rotation.z], position: [position.x, position.y, position.z], args: [scale.x, scale.y], defaultImageURL: baseURL + '/content.jpg' },
    { name: RoomName + "ContentImage", rotation: [-0.27, 0.34, 0.09], position: [-0.71, 1.1, 0.81], args: [0.862, 0.856], defaultImageURL: baseURL + '/content.jpg' },

    { name: RoomName + "StyleImage", rotation: [-0.28, -0.455, -0.128], position: [0.85, 1.1, 0.81], args: [0.862, 0.856], defaultImageURL: baseURL + '/style.jpg' }
]

const massages = [
    { name: "content", active: RoomName + "ContentImage", rotation: [-0.27, 0.34, 0.09], position: [-1.33, 1.42, 0.94], args: [0.862, 0.856], defaultImageURL: baseURL + '/content.jpg', left: true },

    { name: "style", active: RoomName + "StyleImage", rotation: [-0.28, -0.455, -0.128], position: [1.436, 1.43, 1.02], args: [0.862, 0.856], defaultImageURL: baseURL + '/style.jpg', left: false }
]


const bigImageFocus = 0.8
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
    massages[0]['setImageUrl'] = setContentImageUrl
    massages[1]['setImageUrl'] = setStyleImageUrl


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
            {/* <MassageBubble {...massages[0]} />
            <MassageBubble {...massages[1]} /> */}
            {massages.map((props, i) => userId && <MassageBubble key={i} userId={userId} {...props} />)}
            {/* {buttonFrames.map((props, i) => userId && <ButtonFrame key={i} userId={userId} {...props} />)} */}
        </group>
    </>
}


const Frame = ({ imageUrl, name, position, rotation, args, defaultImageURL }) => {

    return <>
        <HoverableFrame position={position} rotation={rotation}>
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



const MassageBubble = ({ userId, name, active, position, rotation, left, setImageUrl }) => {

    const [show, setShow] = useState(false);
    const [, params] = useRoute('/:id')
    // const isActive = true
    const isActive = params?.id == active

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
            publicId: name + userId,
            sources: ['local', 'url', 'image_search'],
            resourceType: 'image'
        }, handleImageUpload)

        const timeoutId = setTimeout(() => {
            isActive && setShow(true);
        }, 1000);
        !isActive && setShow(false)

        return () => clearTimeout(timeoutId);
    }, [params])


    return <>
        <Html
            transform
            scale={0.5}
            distanceFactor={1.17}
            position={position}
            rotation={rotation}
        >
            <div
                onClick={(e) => (e.stopPropagation(), widgetRef.current.open())}
                className={`${!left ? 'left-top-origin' : 'right-top-origin'} zoom-in-out-fade-Kitchen ${show ? 'show' : 'hide'}`}
            >
                <div className={`talk-bubble-kitchen round ${!left ? 'tri-left left-top' : 'tri-right right-top'}`}>
                    <div className="talktext">
                        <ol>
                            Upload
                        </ol>
                    </div>
                </div>
            </div>
        </Html >
    </>
}
