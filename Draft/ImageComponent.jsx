import React, { useState, useEffect } from 'react';


function ImageComponent({ imageUrl, waitTime }) {
    const [isValidUrl, setIsValidUrl] = useState(false);
    // console.log(waitTime);
    function checkImageValidity() {
        const img = new Image();
        img.onload = () => {
            setIsValidUrl(true);
        };
        img.onerror = () => {
            // setTimeout(checkImageValidity, 1000); // try again after 1 second
            setTimeout(() => {
                setIsValidUrl(true);
            }, waitTime);
        };
        img.src = imageUrl;

    }

    useEffect(() => {
        checkImageValidity();
    }, []);
    // console.log(imageUrl, isValidUrl);
    return (
        <div>
            {isValidUrl ? (
                <img src={imageUrl} alt="Image" />
            ) : (
                <p>Invalid image URL</p>
            )}
        </div>
    );
}


export default ImageComponent;