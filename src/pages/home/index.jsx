
import {auth, provider} from '../../config/firebase-config'
import {signInWithPopup} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import {Header} from '../../components/Header'
import './home.css'
import { Dock } from '../../components/Dock'
export const Home = () => {
   
    return (
    <>
    <Header></Header>
    <div className="login-page">
        <h1>Welcome to the Webkinz Exchange!</h1>
        <p>This project is in beta development. Stay tuned!</p>
    </div>
    <Dock></Dock>
    </>
    
    )
}

