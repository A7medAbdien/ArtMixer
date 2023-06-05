import { useEffect, useRef, useState } from "react"

const UploadWidget = ({ name }) => {

    const [imageUrl, setImageUrl] = useState('');
    const cloudinaryRef = useRef()
    const widgetRef = useRef()

    // console.log(name);
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
            publicId: name,
            sources: ['local', 'url', 'image_search'],
        }, handleImageUpload)
    }, [])

    return (<>
        <button onClick={() => widgetRef.current.open()}>
            upload
        </button>
        <br />
        {imageUrl && <img width={400} height={400} src={imageUrl} alt="Uploaded Image" />}
    </>)
}

export default UploadWidget