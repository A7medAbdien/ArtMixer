import { Html, Text } from "@react-three/drei"
import { useThree } from "@react-three/fiber"

export const Arrows = ({ rightAction, leftAction }) => {
    const rightArrowPosition = [1.7, 0, -5]
    const leftArrowPosition = [-1.7, 0, -5]
    return <>
        <Arrow text={"NEXT.."} arrowPosition={rightArrowPosition} action={rightAction} right />
        <Arrow text={"..BACK"} arrowPosition={leftArrowPosition} action={leftAction} />
    </>
}

const Arrow = ({ text, arrowPosition, action, right = false }) => {
    return <>
        <Html
            transform
            scale={1}
            distanceFactor={1.17}
            position={arrowPosition}
            className={`arrow hover-underline-animation ${right ? "left-to-right" : "right-to-left"}`}
        >

            <div
                className={`arrow hover-underline-animation2 ${right ? "right-vertical" : "left-vertical"}`}
                onClick={action}>
                {text}
            </div>
        </Html >
    </>
}