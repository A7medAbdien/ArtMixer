import { useEffect, useRef, useState } from "react"

const UploadWidget = ({ name }) => {

    const [imageUrl, setImageUrl] = useState('');
    const cloudinaryRef = useRef()
    const widgetRef = useRef()
    const newDate = new Date()
    const date = newDate.getTime()
    const uniqueName = name + date

    const handleImageUpload = (_, result) => {
        if (result && result.event === 'success') {
            setImageUrl(result.info.url);
        }
        // else {
        //     console.log('Error uploading image:', result);
        // }
    };

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "dcmthd8bn",
            uploadPreset: "utmds9zl",
            publicId: uniqueName,
            sources: ['local', 'url', 'image_search'],
        }, handleImageUpload)
    }, [])

    return (<>
        <button onClick={() => widgetRef.current.open()}>
            upload
        </button>
        <br />
        {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
    </>)
}

export default UploadWidget