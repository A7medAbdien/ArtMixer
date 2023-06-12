import * as THREE from 'three'
import { Center, OrbitControls, useGLTF, useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber';
import { Frames, KFrame } from '../Frames';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';


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
    const [imageUrl, setImageUrl] = useState('');
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
            publicId: "name",
            sources: ['local', 'url', 'image_search'],
        }, handleImageUpload)
    }, [])

    const images = [
        // Big Images
        { name: "ContentImage", position: [-0.45, 1.11, 0.5], args: [0.46, 0.46], imageUrl: imageUrl },
        { name: "StyleImage", position: [0.32, 1.11, 0.5], args: [0.46, 0.46] },
    ]

    const buttonImages = [
        // Small Images
        { name: "topImage", position: [-0.07, 1.242, 0.5], args: [0.21, 0.21] },
        { name: "bottomImage", position: [-0.07, 0.978, 0.5], args: [0.21, 0.21] }
    ]

    return <>


        <Center>
            <group scale={1.8}>
                <mesh geometry={canisterNodes.KCanister.geometry}>
                    <meshBasicMaterial map={canisterTexture} />
                </mesh>

                <mesh geometry={nodes.baked.geometry}>
                    <meshBasicMaterial map={bakedTexture} />
                </mesh>

                <Frames bigImageFocus={0.4} smallImageFocus={0.2} basePOV={[0, -0.44, 1.9]} images={images} />

                <group onClick={() => widgetRef.current.open()}>
                    <KFrame {...buttonImages[0]} />
                </group>
            </group>
        </Center>
    </>
}