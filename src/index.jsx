import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { Image } from '@react-three/drei'
import UploadWidget from './components/UploadWidget'
import ImageComponent from './components/Gallary'
import React, { useState, useEffect } from 'react';

const root = ReactDOM.createRoot(document.querySelector('#root'))
const newDate = new Date()
// const date = newDate.getTime()
const date = 1685833337326


function ID() {
    const [value, setValue] = useState("");

    // Set the value if it does not exist in local storage
    useEffect(() => {
        const savedValue = localStorage.getItem("ID");
        if (!savedValue) {
            const newValue = date;
            localStorage.setItem("ID", newValue);
            setValue(newValue);
        } else {
            setValue(savedValue);
        }
    }, []);

    return (
        <div>
            <p>Value saved in local storage: {value}</p>
        </div>
    );
}

function MyComponent() {
    const numbers = [];
    for (let i = 0; i <= 2500; i += 250) {
        console.log(i);
        numbers.push(i);
    }

    const itemComponents = numbers.map((i) => (
        <>
            <ImageComponent key={i} imageUrl={`https://res.cloudinary.com/dcmthd8bn/image/upload/mix_${date}_${i}.jpg`} />
            {/* <br /> */}
        </>
    ));

    return <div>{itemComponents}</div>;
}


root.render(
    <>
        Hello
        <br />
        content
        <UploadWidget name={"content" + date} />
        <br />
        style
        <UploadWidget name={"style" + date} />
        <br />
        {date}
        {/* <ImageComponent imageUrl={`https://res.cloudinary.com/dcmthd8bn/image/upload/mix_${date}_2250.jpg`} /> */}
        <br></br>
        <ID />
        <MyComponent />
    </>
)