import { Text } from "@react-three/drei"
import { useThree } from "@react-three/fiber"

export const Arrows = ({ rightAction, leftAction }) => {
    const arrow = ">"
    const { width, height } = useThree(state => state.viewport)
    const x = width - Math.max(2, width * 0.8)
    const y = -height + height
    // const rightArrowPosition = [x, y, 0]
    const rightArrowPosition = [1.4666699993484134, 1, 0]
    // const leftArrowPosition = [-x, y, 0]
    const leftArrowPosition = [-1.4666699993484134, 1, 0]
    return <>
        <group>
            <Text
                color="red"
                position={rightArrowPosition}
                scale={0.25}
                onClick={rightAction} >
                {arrow}
            </Text>
        </group>
        <group>
            <Text
                rotation-y={Math.PI}
                color="red"
                position={leftArrowPosition}
                scale={0.25}
                onClick={leftAction} >
                {arrow}
            </Text>
        </group>
    </>
}