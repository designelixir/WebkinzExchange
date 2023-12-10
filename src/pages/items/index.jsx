
import {auth, provider} from '../../config/firebase-config'
import {signInWithPopup} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import {Header} from '../../components/Header'
import {Dock} from '../../components/Dock'
import GetAllItems from './getAllItems'
export const Items = () => {
   
    return (
    <>
    <Header></Header>
    <Dock></Dock>
    <div className="login-page flex-start-start">
        
        <h1>Webkinz Items</h1>
    </div>
    <div className="flex-center-start">
        <p>Filter by:&nbsp;&nbsp;</p>
        <button className="filter-button">Type</button>
        <button className="filter-button">Category</button>
        
    </div>
    <GetAllItems></GetAllItems>
    </>
    
    )
}

