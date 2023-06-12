import * as THREE from 'three'
import { useCursor } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { easing } from 'maath';
import { useRoute, useLocation } from 'wouter';
import { useControls } from 'leva';


export const Frames = ({ bigImageFocus = 0.6, smallImageFocus = 0.5, basePOV = [0, -0.4, 1.3], images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) => {
    const ref = useRef()
    const clicked = useRef()
    const [, params] = useRoute('/:id')
    const [, setLocation] = useLocation()

    /**
     * Widget Part
     */
    const [imageUrl, setImageUrl] = useState('');
    const cloudinaryRef = useRef()
    const widgetRef = useRef()

    // console.log(name);
    const handleImageUpload = (_, result) => {

        if (result && result.event === 'success') {
            setImageUrl(result.info.url);
        }
    };

    useEffect(() => {
        clicked.current = ref.current.getObjectByName(params?.id)
        if (clicked.current) {
            clicked.current.updateWorldMatrix(true, true)
            clicked.current.localToWorld(p.set(0, 0, (params?.id[0] == params?.id[0].toUpperCase()) ? bigImageFocus : smallImageFocus))
            clicked.current.getWorldQuaternion(q)
        } else {
            p.set(...basePOV)
            q.identity()
        }

        cloudinaryRef.current = window.cloudinary
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "dcmthd8bn",
            uploadPreset: "utmds9zl",
            publicId: "name",
            sources: ['local', 'url', 'image_search'],
        }, handleImageUpload)
    })

    useFrame((state, dt) => {
        easing.damp3(state.camera.position, p, 0.4, dt)
        easing.dampQ(state.camera.quaternion, q, 0.4, dt)
    })

    const handelClick = (e) => {
        if (e.object.name == "topImage" || e.object.name == "bottomImage")
            widgetRef.current.open()
        else
            setLocation(clicked.current === e.object ? '/' : '/' + e.object.name)
    }

    return <>
        <group
            ref={ref}
            onClick={(e) => (e.stopPropagation(), handelClick(e))}
            onPointerMissed={() => setLocation('/')}>

            {images.map((props, i) => <KFrame imageUrl={imageUrl} key={i} {...props} />)}
        </group>
    </>
}

const KFrame = ({ imageUrl, name, position, args, url }) => {

    /**
     * Default to Uploaded Image Part
     */
    const defaultImageURL = 'https://images.pexels.com/photos/17131288/pexels-photo-17131288/free-photo-of-antelope-canyon-paths.jpeg'


    /**
     * Hovering Effect Part
     */
    const image = useRef()
    const [hovered, hover] = useState(false)

    useCursor(hovered)
    useFrame((state, dt) => {
        easing.damp3(image.current.scale, [1 * (hovered ? 0.9 : 1), 1 * (hovered ? 0.9 : 1), 1], 0.1, dt)
    })

    return <>
        <mesh
            ref={image}
            onPointerOver={(e) => (e.stopPropagation(), hover(true))}
            onPointerOut={() => hover(false)}
            position={position}
        >
            <mesh name={name}>
                <planeGeometry args={args} />

                {imageUrl ? (
                    <TexturedPlane url={url} />
                ) : (
                    <TexturedPlane url={defaultImageURL} />
                )}
            </mesh>
        </mesh>
    </>
}


const BFrame = ({ name, position, args, url, waitingTime }) => {
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

    // Hovering Effect Part
    const image = useRef()
    const [hovered, hover] = useState(false)

    useCursor(hovered)
    useFrame((state, dt) => {
        easing.damp3(image.current.scale, [1 * (hovered ? 0.9 : 1), 1 * (hovered ? 0.9 : 1), 1], 0.1, dt)
    })

    return <>
        <mesh
            ref={image}
            onPointerOver={(e) => (e.stopPropagation(), hover(true))}
            onPointerOut={() => hover(false)}
            position={position}
        >
            <mesh name={name}>
                <planeGeometry args={args} />

                {isValidUrl ? (
                    <TexturedPlane url={url} />
                ) : (
                    <TexturedPlane url={defaultImageURL} />
                )}
            </mesh>
        </mesh>
    </>
}

const TexturedPlane = ({ url }) => {
    const image = useLoader(THREE.TextureLoader, url)

    return <>

        <meshBasicMaterial attach="material" map={image} toneMapped={false} />
    </>
}