import React, { useState, useEffect } from 'react';
import ImageComponent from './components/ImageComponent';

const CheckResources = ({ id }) => {
    const [respond, setRespond] = useState('');
    // const URL = 'http://127.0.0.1:5000/status';
    const URL = 'http://ahmedgabdien.pythonanywhere.com/status';

    const numbers = [];
    for (let i = 0; i <= 250; i += 250) {
        numbers.push(i);
    }

    const fetchData = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setRespond(data);
        console.log(data);
    };

    return (
        <>
            <br />
            <button onClick={() => (fetchData())} >
                Mix
            </button>
            <br />
            <p>{(respond.status && respond.status == "busy") && "time remains" + respond.time}</p>


            {/* This will be a separate component*/}
            {(respond.status && respond.status == "free") && numbers.map((i) => (
                // console.log((((i / 250) * 15000) + 30000) / 60000)
                <ImageComponent key={i} waitTime={((i / 250) * 15000) + 50000} imageUrl={`https://res.cloudinary.com/dcmthd8bn/image/upload/mix_${id}_${i}.jpg`} />

            ))}
        </>
    );
}

export default CheckResources;