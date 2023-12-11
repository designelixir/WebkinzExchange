import React, { useState } from 'react';
import './styles/styles.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {Home} from './pages/home/index'
import {PublicProfile} from './pages/myProfile/index'
import {Items} from './pages/items/index'
import {Header} from './components/Header'
import {Dock} from './components/Dock'
import { MyStuff } from './pages/myStuff';
import { MyAccount } from './pages/myAccount';
import { MyStore } from './pages/myStore';
import { ItemPage } from './components/ItemPage';
import $ from 'jquery';

function App() {
  const [pageTitle, setPageTitle] = useState('');
  const [pageDescription, setPageDescription] = useState('');
  return (
    <>
  
    <div className="App fade-in">
      
      <Router>
        <Header title={pageTitle} description={pageDescription}></Header>
        <Routes>
          <Route path="/" element={<Home setPageTitle={setPageTitle} setPageDescription={setPageDescription} />}/>
          <Route path="/my-account" element={<MyAccount setPageTitle={setPageTitle} setPageDescription={setPageDescription} />}/>
          <Route path="/user/:userId" element={<PublicProfile setPageTitle={setPageTitle} setPageDescription={setPageDescription} />} />
          <Route path="/items" element={<Items setPageTitle={setPageTitle} setPageDescription={setPageDescription} />}/>
          <Route path="/my-stuff" element={<MyStuff setPageTitle={setPageTitle} setPageDescription={setPageDescription} />}/>
          <Route path="/my-store" element={<MyStore setPageTitle={setPageTitle} setPageDescription={setPageDescription} />}/>
          <Route path="/item/:itemID" element={<ItemPage setPageTitle={setPageTitle} setPageDescription={setPageDescription}/>} />
        </Routes>
        <Dock></Dock>
        
      </Router>
      
      
    
    </div>
    
    </>
  );
}

export default App;