import React, { useEffect } from 'react';
export const Home = ({ setPageTitle, setPageDescription }) => {
    useEffect(() => {
        setPageTitle('Welcome to the Webkinz Exchange');
        setPageDescription('Easy Webkinz item tracking, trading and wishlists!');
      }, [setPageTitle, setPageDescription]);
    return (
    <>

    <section>
      <div className="flex-center-center flex-wrap">

      </div>

    </section>
    </>
    
    )
}

