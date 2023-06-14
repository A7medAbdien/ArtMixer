import { forwardRef } from 'react';

export const Box = forwardRef(({ color, ...props }, ref) => {
    return <>
        <mesh ref={ref} {...props}>
            <boxGeometry args={[2, 2.5, 1]} />
            <meshBasicMaterial color={`rgb(${color + 100},0,0)`} />
        </mesh>
    </>
})


