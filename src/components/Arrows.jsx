import { Html, Text } from "@react-three/drei"
import { useThree } from "@react-three/fiber"

export const Arrows = ({ rightAction, leftAction, color }) => {
    const rightArrowPosition = { bottom: 80, right: 100, '--arrow-color': color }
    const leftArrowPosition = { bottom: 80, left: 100, '--arrow-color': color }
    return <>
        <Arrow text={"NEXT.."} arrowPosition={rightArrowPosition} action={rightAction} right />
        <Arrow text={"..BACK"} arrowPosition={leftArrowPosition} action={leftAction} />
    </>
}

const Arrow = ({ text, arrowPosition, action, right = false }) => {
    return <>
        <div onClick={action} className="arrow"
            style={arrowPosition}
        >
            <div
                className={`hover-underline-animation ${right ? "left-to-right" : "right-to-left"}`}
            >
                <div
                    className={`arrow hover-underline-animation2 ${right ? "right-vertical" : "left-vertical"}`}
                >
                    {text}
                </div>
            </div>
        </div>
    </>
}