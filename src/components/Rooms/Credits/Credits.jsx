import * as THREE from 'three'
import { Center, Html, Image, PresentationControls, Text, Text3D, useGLTF, useMatcapTexture, useTexture } from '@react-three/drei'
import { useControls } from 'leva'
import { useRef, useState } from 'react';
import { useRoute } from 'wouter';
import { useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { ImageFrame } from '../../Frames';

const RoomName = "Thanks"
// const url = 'https://fluid-threejs.netlify.app/'
// const image = { name: "WhiteRoom", position: [-0.08, 1, 0], args: [171, 6.8], url: url, waitingTime: 95000 }

export default function Thanks({ activeRoomName }) {

    const isActive = activeRoomName == RoomName
    const andrewNgImageURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Andrew_Ng_at_TechCrunch_Disrupt_SF_2017.jpg/330px-Andrew_Ng_at_TechCrunch_Disrupt_SF_2017.jpg"
    const brunoSimonImageUrl = "https://avatars.githubusercontent.com/u/5439991?v=4"
    const misakiNakanoImageUrl = "https://avatars.githubusercontent.com/u/20261846?v=4"

    return <>
        <group
            position={[3, 0, 0]}
            scale={0.2}
        >
            <PresentationControls
                enabled={true}
                polar={[-0.4, 0.2]}
                azimuth={[-1, 0.75]}
                config={{ mass: 2, tension: 400 }}
                snap={{ mass: 4, tension: 400 }}
            >
                <Center
                    position={[0, 3.5, 0]}
                    rotation={[-0.15, 0, 0]}>


                    <Text3D
                        position={[0, 0.5, 0]}
                        curveSegments={5}
                        bevelEnabled
                        bevelSize={0.04}
                        bevelThickness={0.1}
                        height={0.5}
                        lineHeight={1.5}
                        letterSpacing={-0.06}
                        size={1}
                        font={'/fonts/Khula_Bold.json'}
                    >
                        {`Andrew Ng\nBruno Simon\nMisaki Nakano`}
                        <meshNormalMaterial />
                    </Text3D>


                    <mesh position={[-2.51, 1.3, 0.55]} >
                        <planeGeometry args={[3, 3, 1]} />
                        <ImageFrame url={andrewNgImageURL} />
                    </mesh>
                    <mesh position={[-2.51, -2.3, 0.55]} >
                        <planeGeometry args={[3, 3, 1]} />
                        <ImageFrame url={brunoSimonImageUrl} />
                    </mesh>
                    <mesh position={[-2.51, -5.9, 0.55]} >
                        <planeGeometry args={[3, 3, 1]} />
                        <ImageFrame url={misakiNakanoImageUrl} />
                    </mesh>
                    {/* <mesh position={[position.x, position.y, position.z]} >
                        <planeGeometry args={[scale.x, scale.x, 1]} />
                        <ImageFrame url={imageUrl} />
                    </mesh> */}

                </Center>
            </PresentationControls>
        </group>
    </>
}
