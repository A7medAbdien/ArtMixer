import * as THREE from 'three'
import { Center, useGLTF, useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber';
import { Frames, HoverableFrame, ImageFrame } from '../Frames';
import { useEffect, useState } from 'react';

export default function BRoom() {
    const RoomName = "BlueRoom"
    const { nodes } = useGLTF('./model/BRoom/BRoom.glb')
    const bakedTexture = useTexture('./model/BRoom/BRoom.jpg')
    const url = 'https://images.pexels.com/photos/3934093/pexels-photo-3934093.jpeg'

    bakedTexture.flipY = false

    const images = [
        // Big Images
        { name: RoomName + "B", position: [-0.57, 1.245, 0.4], args: [0.76, 0.76], url: url, waitingTime: 1500 },
        { name: RoomName + "E", position: [1.24, 1.245, 0.4], args: [0.76, 0.76], url: url, waitingTime: 2000 },
        // Small Images
        { name: RoomName + "A", position: [-1.5, 1.27, 0.4], args: [0.58, 0.58], url: url, waitingTime: 3000 },
        { name: RoomName + "C", position: [0.36, 1.71, 0.4], args: [0.58, 0.58], url: url, waitingTime: 3000 },
        { name: RoomName + "D", position: [0.36, 1, 0.4], args: [0.58, 0.58], url: url, waitingTime: 3000 }
    ]
    const images_main = [
        // Big Images
        { name: RoomName + "B", position: [-0.57, 1.245, 0.4], args: [0.76, 0.76], url: url, waitingTime: 95000 },
        { name: RoomName + "E", position: [1.24, 1.245, 0.4], args: [0.76, 0.76], url: url, waitingTime: 185000 },
        // Small Images
        { name: RoomName + "A", position: [-1.5, 1.27, 0.4], args: [0.58, 0.58], url: url, waitingTime: 65000 },
        { name: RoomName + "C", position: [0.36, 1.71, 0.4], args: [0.58, 0.58], url: url, waitingTime: 125000 },
        { name: RoomName + "D", position: [0.36, 1, 0.4], args: [0.58, 0.58], url: url, waitingTime: 155000 }
    ]


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


const Frame = ({ name, position, args, url, waitingTime }) => {
    // Default to Waited Image Part
    const defaultImageURL = 'https://images.pexels.com/photos/17131288/pexels-photo-17131288/free-photo-of-antelope-canyon-paths.jpeg'

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
