import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import Model from './Model'
import GRoom from './GRoom'
import BRoom from './BRoom'
import WRoom from './WRoom'
import { Leva } from 'leva'

export default function Experience() {
    return <>
        {/* <Leva hidden /> */}
        <Canvas
            flat dpr={[1, 1.5]} camera={{ fov: 95, position: [0, 0, 1] }}
        >
            <Perf position="top-left" />
            <fog attach="fog" args={['#191920', 0, 15]} />
            <OrbitControls makeDefault />

            {/* <mesh scale={1.5}>
                <boxGeometry />
                <meshNormalMaterial />
            </mesh> */}
            {/* <Model /> */}
            {/* <GRoom /> */}
            <BRoom />
            {/* <WRoom /> */}

            <Environment preset="city" />
        </Canvas>
    </>
}