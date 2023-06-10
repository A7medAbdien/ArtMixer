import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { Leva } from 'leva'

import Model from './components/Rooms/Model'
import GRoom from './components/Rooms/GRoom'
import BRoom from './components/Rooms/BRoom'
import WRoom from './components/Rooms/WRoom'

export default function Experience() {
    return <>
        {/* <Leva hidden /> */}
        <Canvas
            flat dpr={[1, 1.5]} camera={{ fov: 95, position: [0, 0, 1] }}
        >
            <Perf position="top-left" />
            <fog attach="fog" args={['#191920', 0, 15]} />
            <color args={['#201919']} attach="background" />
            <OrbitControls makeDefault />

            {/* <mesh scale={1.5}>
                <boxGeometry />
                <meshNormalMaterial />
            </mesh> */}

            {/* <Model /> */}
            {/* <GRoom /> */}
            <BRoom />
            {/* <WRoom /> */}

        </Canvas>
    </>
}