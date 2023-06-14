import UploadWidget from './components/UploadWidget'
import ImageComponent from './components/ImageComponent'
import React, { useState, useEffect } from 'react';
import CheckResources from './CheckResources';

export default function App() {

    const newDate = new Date()
    const date = Math.floor(newDate.getTime() / 1000)
    const [value, setValue] = useState(null);


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

        <CheckResources id={value} />

    </>
}