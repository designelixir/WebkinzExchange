import React, { useEffect } from 'react';
import { GetAllStores } from './GetAllStores';

export const Home = ({ setPageTitle, setPageDescription }) => {
    useEffect(() => {
        setPageTitle('Welcome to the Webkinz Exchange');
        setPageDescription('Easy Webkinz item tracking, trading and wishlists!');
      }, [setPageTitle, setPageDescription]);
    return (
    <>

    <section>
      <div className='page-container'>
        <h2>Users with Shops</h2>
        <GetAllStores></GetAllStores>
      </div>
      
      <div className="flex-center-center flex-wrap">

      </div>

    </section>
    </>
    
    )
}

