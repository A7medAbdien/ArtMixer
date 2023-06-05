import React, { useState, useEffect } from 'react';

function CheckResources() {
    const [message, setMessage] = useState('');
    // const URL = 'http://127.0.0.1:5000/status';
    const URL = 'http://ahmedgabdien.pythonanywhere.com/status';

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(URL);
            const data = await response.json();
            setMessage(data);
            console.log(data);
        };
        fetchData();
    }, []);

    return (
        <div>
            <p>{(message.status && message.status == "busy") && "time remains" + message.time}</p>
        </div>
    );
}

export default CheckResources;