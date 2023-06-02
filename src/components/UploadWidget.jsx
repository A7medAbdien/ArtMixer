import { useEffect, useRef } from "react"

const UploadWidget = ({ name }) => {
    const cloudinaryRef = useRef()
    const widgetRef = useRef()

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "dcmthd8bn",
            uploadPreset: "utmds9zl",
            publicId: name
        }, (error, result) => console.log(result))
    }, [])

    return (
        <button onClick={() => widgetRef.current.open()}>
            upload
        </button>
    )
}

export default UploadWidget