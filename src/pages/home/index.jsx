import React, { useEffect } from 'react';
export const Home = ({ setPageTitle, setPageDescription }) => {
    useEffect(() => {
        setPageTitle('Welcome to the Webkinz Exchange');
        setPageDescription('This project is under development. Stay tuned!');
      }, [setPageTitle, setPageDescription]);
    return (
    <>

    <section>

    </section>
    </>
    
    )
}

