
import {Header} from '../../components/Header'
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import UserProfileForm from './UserProfileSetup';
import useUsername from '../../hooks/useUsername';
import { Dock } from '../../components/Dock';
import { Username } from '../../components/Username';
export const Profile = () => {
    const {userID, isAuth} = useGetUserInfo();
    const username = useUsername();
    
    return (
    <>
    <Header></Header>
    <div className="login-page flex-start-start">
    {isAuth ? (
        <div className="flex-start-start flex-wrap">
            <div class="flex-center-start">
                
                <h1>My Profile</h1>
            </div>
            <UserProfileForm></UserProfileForm>
        </div>
        
           
      ) : (
        
        <p>Please Sign In to view this page.</p>
      )}
        
        <div>

        </div>
        
    </div>
    <Dock></Dock>
    </>
    
    )
}

