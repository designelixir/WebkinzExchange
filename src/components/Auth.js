import { auth, provider } from '../config/firebase-config';
import { signInWithPopup, signOut, getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const Auth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // User is already logged in
        setUser(authUser);
        // Remove the navigate('/') line to avoid automatic redirection
      } else {
        setUser(null);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('auth');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <div className="login-page">
      {user ? (
        <>
          <p className="logout-option hover" onClick={handleLogout}>Logout</p>
        </>
      ) : (
        <p className="logout-option hover" onClick={signInWithGoogle}>Sign In</p>
      )}
    </div>
  );
};
