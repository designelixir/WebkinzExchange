// PublicProfile.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const PublicProfile = ({ setPageTitle, setPageDescription }) => {
    useEffect(() => {
        setPageTitle('My Public Profile');
        setPageDescription('This is where everyone can see your stuff');
      }, [setPageTitle, setPageDescription]);
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data based on the userId parameter
    // You might use an API call, Firebase, or another method to retrieve user data
    // Example: const userData = await fetchUserData(userId);
    // Set the retrieved data to the state
    // setUserData(userData);
  }, [userId]);

  return (
    <section>
        {userData ? (
                <div>
                <p>User ID: {userId}</p>
                {/* Display other user information */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
    </section>
    
    
  );
};


