import { auth, provider } from '../../config/firebase-config';
import { signInWithPopup, getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is already logged in, redirect to the desired page
        
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [navigate]);

  const signInWithGoogle = async () => {
    try {
      const results = await signInWithPopup(auth, provider);
      const authInfo = {
        userID: results.user.uid,
        name: results.user.displayName,
        isAuth: true,
      };

      localStorage.setItem('auth', JSON.stringify(authInfo));
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  return (
    <div className="login-page">
      <button onClick={signInWithGoogle}>Sign In with Google</button>
    </div>
  );
};
