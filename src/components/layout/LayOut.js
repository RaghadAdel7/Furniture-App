import React from 'react'
import NavBar from '../nav/NavBar'
import Footer from '../footer/Footer'
import { Outlet } from 'react-router-dom'


export default function LayOut(prop) {
    const { wishList, isAuthenticated } = prop;
  return (
    <div>
      <NavBar wishList={wishList} isAuthenticated ={isAuthenticated}/>
      <Outlet />
      <Footer />
    </div>
  );
}