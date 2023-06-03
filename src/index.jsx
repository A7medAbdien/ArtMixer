import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { Image } from '@react-three/drei'
import UploadWidget from './components/UploadWidget'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <>
        Hello
        <br />
        content
        <UploadWidget name="content" />
        <br />
        style
        <UploadWidget name="style" />
    </>
)