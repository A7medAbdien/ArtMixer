import './style.css'
import ReactDOM from 'react-dom/client'
import App from './App'
import CheckResources from './CheckResources'

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(
    <>
        {/* <App /> */}
        <CheckResources />
    </>
)