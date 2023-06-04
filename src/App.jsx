import UploadWidget from './components/UploadWidget'
import ImageComponent from './components/Gallary'
import React, { useState, useEffect } from 'react';

export default function App() {

    const newDate = new Date()
    const date = Math.floor(newDate.getTime() / 1000)
    const [value, setValue] = useState(null);
    const [mix, setMix] = useState(false);
    const numbers = [];
    for (let i = 0; i <= 250; i += 250) {
        numbers.push(i);
    }

    const again = () => {
        localStorage.removeItem('ID')
        localStorage.setItem("ID", date);
        setValue(date)
    }

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


    return <>
        Hello
        <br />
        content
        {value && <UploadWidget name={"content" + value} />}
        <br />
        style
        {value && <UploadWidget name={"style" + value} />}
        <br />
        {value}

        <br />
        <button onClick={() => again()} >
            Again
        </button>
        <br />
        <button onClick={() => setMix(true)} >
            Mix
        </button>
        <br />
        {mix && numbers.map((i) => (
            // console.log((((i / 250) * 15000) + 30000) / 60000)
            <ImageComponent key={i} waitTime={((i / 250) * 15000) + 50000} imageUrl={`https://res.cloudinary.com/dcmthd8bn/image/upload/mix_${value}_${i}.jpg`} />

        ))}
    </>
}