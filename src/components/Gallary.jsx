import React, { useState } from 'react';


function ImageComponent({ imageUrl }) {

    const [isValid, setIsValid] = useState(true);

    function handleImageError() {
        setIsValid(false);
    }

    return (
        <div>
            {isValid ? (
                <img src={imageUrl} onError={handleImageError} />
            ) : (
                <p>Invalid image URL</p>
            )}
        </div>
    );

}


export default ImageComponent;