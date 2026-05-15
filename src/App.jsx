import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import QuickMenu from './components/QuickMenu'
import Home from './pages/Home'
import DetailsPage from './pages/DetailsPage'
import './App.css'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<DetailsPage />} />
      </Routes>
      <Footer />
      <QuickMenu />
    </BrowserRouter>
  )
}

export default App
