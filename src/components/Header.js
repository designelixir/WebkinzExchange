import React from 'react'
import '../styles/headerStyles.css'
import { Link } from 'react-router-dom';
import { Auth } from './Auth'
import { useGetUserInfo } from '../hooks/useGetUserInfo';
import logo from '../assets/webkinz-exchange-logo.png'


export const Header = ({ title, description }) => {
    return (
      
        <header className="flex-center-center">
          <Link to="/" className="hover"><img src={logo} style={{height: "80px"}} className="hover"></img></Link>
          
          <div className="page-title">
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          <div style={{width: "125px"}}>
            <button>Report Problem</button>
          </div>
        </header>
      
          
      )
}
