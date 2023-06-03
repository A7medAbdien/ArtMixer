import UploadWidget from './components/UploadWidget'
import ImageComponent from './components/Gallary'
import React, { useState, useEffect } from 'react';

export default function App() {

    const newDate = new Date()
    const date = newDate.getTime()
    const [value, setValue] = useState("");
    const numbers = [];
    for (let i = 0; i <= 2500; i += 250) {
        numbers.push(i);
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
        <UploadWidget name={"content" + date} />
        <br />
        style
        <UploadWidget name={"style" + date} />
        <br />
        {date}

        <br></br>
        {numbers.map((i) => (
            <>
                <ImageComponent key={i} imageUrl={`https://res.cloudinary.com/dcmthd8bn/image/upload/mix_${date}_${i}.jpg`} />
            </>
        ))}
    </>
}