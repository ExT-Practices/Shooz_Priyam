import React from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Wishlist from './pages/Wishlist'
import Register from './pages/Register'
import Account from './pages/Account'
import ProductDetails from './pages/ProductDetails'
import Checkout from './pages/Checkout'
import Shop from './pages/Shop'
import CartDrawer from './components/CartDrawer'
import AdminLayout from './admin/AdminLayout'
import Dashboard from './admin/Dashboard'
import Products from './admin/Products'
import Orders from './admin/Orders'
import Banners from './admin/Banners'
import Categories from './admin/Categories'
import AdminLogin from './admin/AdminLogin'
const Layout = () => {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen relative">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/products" element={<Shop />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="banners" element={<Banners />} />
            <Route path="categories" element={<Categories />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
