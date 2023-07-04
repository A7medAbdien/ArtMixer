import * as THREE from 'three'
import { Center, Html, Image, PresentationControls, Text, Text3D, useGLTF, useMatcapTexture, useTexture } from '@react-three/drei'
import { useControls } from 'leva'
import { useRef, useState } from 'react';
import { useRoute } from 'wouter';
import { useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

const RoomName = "Thanks"
// const url = 'https://fluid-threejs.netlify.app/'
// const image = { name: "WhiteRoom", position: [-0.08, 1, 0], args: [171, 6.8], url: url, waitingTime: 95000 }

export default function Thanks({ activeRoomName }) {

    const isActive = activeRoomName == RoomName

    return <>
        <group
            position={[3, 0, 0]}
            scale={0.2}
        >
            <PresentationControls
                enabled={isActive}
                polar={[-0.4, 0.2]}
                azimuth={[-1, 0.75]}
                config={{ mass: 2, tension: 400 }}
                snap={{ mass: 4, tension: 400 }}
            >

                <Center
                    position={[0, 3, 0]}
                    rotation={[-0.25, 0, 0]}>
                    <Text3D
                        curveSegments={32}
                        bevelEnabled
                        bevelSize={0.04}
                        bevelThickness={0.1}
                        height={0.5}
                        lineHeight={0.8}
                        letterSpacing={-0.06}
                        size={1.5}
                        font={'/fonts/Khula_Bold.json'}
                    >
                        {`Andrew Ng\nBruno Simon\nMisaki Nakano`}
                        <meshNormalMaterial />
                    </Text3D>
                </Center>
            </PresentationControls>
        </group>
    </>
}
