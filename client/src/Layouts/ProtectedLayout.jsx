import React from 'react'
import { Outlet } from "react-router-dom";
import NavBar from '../components/ui/NavBar';

const ProtectedLayout = () => {
  return (
    <>
    <NavBar/>
    <Outlet />
    </>
  )
}

export default ProtectedLayout