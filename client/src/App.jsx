import { useState } from 'react'
import './styles/form.css'
import './styles/navbar.css'
import './styles/card.css'
import './styles/productdescription.css'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import NavBar from './components/NavBar'
import ProductCard from './components/ProductCard'
import ProductsPage from './pages/ProductsPage'
import AllProductsPage from './pages/AllProductsPage'
import ProductDescriptionPage from './pages/ProductDescriptionPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <NavBar />
    <ProductDescriptionPage/>
    </>
  )
}

export default App
