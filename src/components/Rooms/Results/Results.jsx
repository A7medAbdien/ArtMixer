import { useGLTF, useTexture } from '@react-three/drei'
import { Frames, HoverableFrame, ImageFrame } from '../Frames';
import { useEffect, useState } from 'react';
import { defaultID, resultURL } from '../../../_';


const RoomName = "BlueRoom"


export default function Results({ activeRoomName, userId, isNotebookExecuted, isNotebookOpened, isStyleImageUploaded, isContentImageUploaded }) {
    // userId = ID
    const images_temp = [
        // Big Images
        { name: RoomName + "B", position: [-0.57, 1.245, 0.4], args: [0.76, 0.76], url: `${resultURL}/mix_${userId}_750.jpg`, waitingTime: 1500, defaultImageURL: `${resultURL}/mix_${defaultID}_750.jpg`, },
        { name: RoomName + "E", position: [1.24, 1.245, 0.4], args: [0.76, 0.76], url: `${resultURL}/mix_${userId}_2250.jpg`, waitingTime: 2000, defaultImageURL: `${resultURL}/mix_${defaultID}_2250.jpg`, },
        // Small Images
        { name: RoomName + "A", position: [-1.5, 1.27, 0.4], args: [0.58, 0.58], url: `${resultURL}/mix_${userId}_250.jpg`, waitingTime: 3000, defaultImageURL: `${resultURL}/mix_${defaultID}_250.jpg`, },
        { name: RoomName + "C", position: [0.36, 1.71, 0.4], args: [0.58, 0.58], url: `${resultURL}/mix_${userId}_1250.jpg`, waitingTime: 3000, defaultImageURL: `${resultURL}/mix_${defaultID}_1250.jpg`, },
        { name: RoomName + "D", position: [0.36, 1, 0.4], args: [0.58, 0.58], url: `${resultURL}/mix_${userId}_1750.jpg`, waitingTime: 3000, defaultImageURL: `${resultURL}/mix_${defaultID}_1750.jpg`, }
    ]
    const images = [
        // Big Images
        { name: RoomName + "B", position: [-0.57, 1.245, 0.4], args: [0.76, 0.76], url: `${resultURL}/mix_${userId}_750.jpg`, waitingTime: 95000, defaultImageURL: `${resultURL}/mix_${defaultID}_750.jpg`, },
        { name: RoomName + "E", position: [1.24, 1.245, 0.4], args: [0.76, 0.76], url: `${resultURL}/mix_${userId}_2250.jpg`, waitingTime: 185000, defaultImageURL: `${resultURL}/mix_${defaultID}_2250.jpg`, },
        // Small Images
        { name: RoomName + "A", position: [-1.5, 1.27, 0.4], args: [0.58, 0.58], url: `${resultURL}/mix_${userId}_250.jpg`, waitingTime: 65000, defaultImageURL: `${resultURL}/mix_${defaultID}_250.jpg`, },
        { name: RoomName + "C", position: [0.36, 1.71, 0.4], args: [0.58, 0.58], url: `${resultURL}/mix_${userId}_1250.jpg`, waitingTime: 125000, defaultImageURL: `${resultURL}/mix_${defaultID}_1250.jpg`, },
        { name: RoomName + "D", position: [0.36, 1, 0.4], args: [0.58, 0.58], url: `${resultURL}/mix_${userId}_1750.jpg`, waitingTime: 155000, defaultImageURL: `${resultURL}/mix_${defaultID}_1750.jpg`, }
    ]

    const { nodes } = useGLTF('./model/Results/Results.glb')
    const bakedTexture = useTexture('./model/Results/Results.jpg')
    bakedTexture.flipY = false

    return <>
        <group position={[0, 0, 0]}>

            <mesh geometry={nodes.baked.geometry}>
                <meshBasicMaterial map={bakedTexture} />
            </mesh>

            {<Frames name={RoomName} activeRoomName={activeRoomName} startTime={{ isNotebookOpened, isContentImageUploaded, isStyleImageUploaded, isNotebookExecuted }} Children={Frame} images={images} />}
        </group >
    </>
}


const Frame = ({ name, position, args, url, waitingTime, defaultImageURL, startTime: { isNotebookOpened, isContentImageUploaded, isStyleImageUploaded, isNotebookExecuted } }) => {

    // Default to Waited Image Part
    const [isValidUrl, setIsValidUrl] = useState(false)
    const [isSecondRound, setIsSecondRound] = useState(false)
    function checkImageValidity() {
        const img = new Image();
        img.onload = () => {
            setIsValidUrl(true);
        };
        img.onerror = () => {
            setTimeout(() => {
                setIsSecondRound(true)
                checkImageValidity()
            }, isSecondRound ? 2000 : waitingTime);
        };
        img.src = url;
    }


    useEffect(() => {
        isNotebookExecuted && isNotebookOpened && isContentImageUploaded && isStyleImageUploaded && checkImageValidity()
    }, [isNotebookExecuted]);

    return <>
        <HoverableFrame position={position}>
            <mesh name={name}>
                <planeGeometry args={args} />

                {(isValidUrl) ? (
                    <ImageFrame url={url} />
                ) : (
                    <ImageFrame url={defaultImageURL} />
                )}
            </mesh>
        </HoverableFrame>
    </>
}
