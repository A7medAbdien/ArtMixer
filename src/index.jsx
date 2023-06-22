import './style.css'
import ReactDOM from 'react-dom/client'
// import App from './App'
// import CheckResources from './CheckResources'
import Experience from './Experience'
import { Overlay } from './Overlay'

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(
    <>
        {/* <App /> */}
        <Experience />
        <Overlay />
    </>
)