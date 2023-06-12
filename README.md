# Four walls

1. Uploads, Kitchen them
2. Run (CoLab), Green and wooden floor
3. Collection, chair and table, plan blue
4. Waiting Room


# What remains

1. show REsult
2. Upload

# edit frame

```jsx
    const { position, scale } = useControls('GRoom',
        {
            position:
            {
                value: { x: -0.45, y: 1.11 },
                step: 0.001,
                joystick: 'invertY'
            },
            // {"position":{"x":0.205600048828125,"y":1.123200004577637}}
            scale:
            {

                value: { x: 0.45, y: 1.5 },
                // value: { x: -349.2, y: -246.0 },
                step: 0.001,
                joystick: 'invertY'
            },
            // {"scale":{"x":-349.20000000000016,"y":-246.0599983215332}}
        })
```