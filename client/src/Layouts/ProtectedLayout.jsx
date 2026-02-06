import React from 'react'
import { Outlet } from "react-router-dom";
import NavBar from '../components/ui/NavBar';
import Footer from '../components/ui/Footer';

const ProtectedLayout = () => {
  return (
    <>
      <NavBar />
      <main style={{ minHeight: 'calc(100vh - 80px)' }}> {/* Push footer down */}
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default ProtectedLayout
