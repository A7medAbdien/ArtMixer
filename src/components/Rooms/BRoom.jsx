import * as THREE from 'three'
import { Center, useGLTF, useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber';
import { Frames, HoverableFrame, ImageFrame } from '../Frames';
import { useEffect, useState } from 'react';
import { defaultID, ID, resultURL } from '../../_';


const RoomName = "BlueRoom"
const images = [
    // Big Images
    { name: RoomName + "B", position: [-0.57, 1.245, 0.4], args: [0.76, 0.76], url: `${resultURL}/mix_${ID}_750`, waitingTime: 1500, defaultImageURL: `${resultURL}/mix_${defaultID}_750` },
    { name: RoomName + "E", position: [1.24, 1.245, 0.4], args: [0.76, 0.76], url: `${resultURL}/mix_${ID}_2250`, waitingTime: 2000, defaultImageURL: `${resultURL}/mix_${defaultID}_2250` },
    // Small Images
    { name: RoomName + "A", position: [-1.5, 1.27, 0.4], args: [0.58, 0.58], url: `${resultURL}/mix_${ID}_250`, waitingTime: 3000, defaultImageURL: `${resultURL}/mix_${defaultID}_250` },
    { name: RoomName + "C", position: [0.36, 1.71, 0.4], args: [0.58, 0.58], url: `${resultURL}/mix_${ID}_1250`, waitingTime: 3000, defaultImageURL: `${resultURL}/mix_${defaultID}_1250` },
    { name: RoomName + "D", position: [0.36, 1, 0.4], args: [0.58, 0.58], url: `${resultURL}/mix_${ID}_1750`, waitingTime: 3000, defaultImageURL: `${resultURL}/mix_${defaultID}_1750` }
]
const images_main = [
    // Big Images
    { name: RoomName + "B", position: [-0.57, 1.245, 0.4], args: [0.76, 0.76], url: `${resultURL}/mix_${ID}_750`, waitingTime: 95000, defaultImageURL: `${resultURL}/mix_${defaultID}_750` },
    { name: RoomName + "E", position: [1.24, 1.245, 0.4], args: [0.76, 0.76], url: `${resultURL}/mix_${ID}_2250`, waitingTime: 185000, defaultImageURL: `${resultURL}/mix_${defaultID}_2250` },
    // Small Images
    { name: RoomName + "A", position: [-1.5, 1.27, 0.4], args: [0.58, 0.58], url: `${resultURL}/mix_${ID}_250`, waitingTime: 65000, defaultImageURL: `${resultURL}/mix_${defaultID}_250` },
    { name: RoomName + "C", position: [0.36, 1.71, 0.4], args: [0.58, 0.58], url: `${resultURL}/mix_${ID}_1250`, waitingTime: 125000, defaultImageURL: `${resultURL}/mix_${defaultID}_1250` },
    { name: RoomName + "D", position: [0.36, 1, 0.4], args: [0.58, 0.58], url: `${resultURL}/mix_${ID}_1750`, waitingTime: 155000, defaultImageURL: `${resultURL}/mix_${defaultID}_1750` }
]

export default function BRoom() {

    const { nodes } = useGLTF('./model/BRoom/BRoom.glb')
    const bakedTexture = useTexture('./model/BRoom/BRoom.jpg')
    bakedTexture.flipY = false

    return <>
        <group position={[0, 0, 0]}>
            {/* <Center> */}
            <mesh geometry={nodes.baked.geometry}>
                <meshBasicMaterial map={bakedTexture} />
            </mesh>

            <Frames name={RoomName} Children={Frame} images={images} />
            {/* </Center> */}
        </group >
    </>
}


const Frame = ({ name, position, args, url, waitingTime, defaultImageURL }) => {

    // Default to Waited Image Part
    const [isValidUrl, setIsValidUrl] = useState(false)
    function checkImageValidity() {
        const img = new Image();
        img.onload = () => {
            setIsValidUrl(true);
        };
        img.onerror = () => {
            setTimeout(() => {
                setIsValidUrl(true);
            }, waitingTime);
        };
        img.src = url;
    }

    useEffect(() => {
        // checkImageValidity()
        setTimeout(() => {
            setIsValidUrl(true);
        }, waitingTime);
    }, []);

    return <>
        <HoverableFrame position={position}>
            <mesh name={name}>
                <planeGeometry args={args} />

                {isValidUrl ? (
                    <ImageFrame url={url} />
                ) : (
                    <ImageFrame url={defaultImageURL} />
                )}
            </mesh>
        </HoverableFrame>
    </>
}
