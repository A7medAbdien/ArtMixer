import * as THREE from 'three'
import { Center, Html, Image, Text, Text3D, useGLTF, useMatcapTexture, useTexture } from '@react-three/drei'
import { useControls } from 'leva'
import { useState } from 'react';
import { useRoute } from 'wouter';
import { useEffect } from 'react';

const RoomName = "WhiteRoom"
const url = 'https://fluid-threejs.netlify.app/'
const image = { name: "WhiteRoom", position: [-0.08, 1, 0], args: [171, 6.8], url: url, waitingTime: 95000 }

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32)
const material = new THREE.MeshMatcapMaterial()

export default function Thanks({ activeRoomName }) {

    const [matcapTexture] = useMatcapTexture('673B2A_99735C_99593A_3A160E', 256)

    useEffect(() => {
        matcapTexture.needsUpdate = true

        material.matcap = matcapTexture
        material.needsUpdate = true
    })

    // const isActive = activeRoomName == RoomName
    // const [show, setShow] = useState(false);

    // useEffect(() => {
    //     const timeoutId = setTimeout(() => {
    //         isActive && setShow(true);
    //     }, 1000);
    //     !isActive && setShow(false)

    //     return () => clearTimeout(timeoutId);
    // }, [isActive]);


    // const { nodes } = useGLTF('./model//WRoom/WRoom.glb')
    // const bakedTexture = useTexture('./model/WRoom/WRoom.jpg')
    // bakedTexture.flipY = false

    return <>


        {/* 
        <mesh
            geometry={nodes.baked.geometry}>
            <meshBasicMaterial map={bakedTexture} />
        </mesh> */}

        <group>

            <Text3D
                font={'/fonts/helvetiker_regular.typeface.json'}
                scale={0.2}
                position={image.position}
            >
                Thanks all of you
            </Text3D>
        </group>


    </>
}