import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import QuickMenu from './components/QuickMenu'
import Home from './pages/Home'
import DetailsPage from './pages/DetailsPage'
import ApplyPage from './pages/ApplyPage'
import ApplyCompletePage from './pages/ApplyCompletePage'
import './App.css'

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<DetailsPage />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/apply-complete" element={<ApplyCompletePage />} />
      </Routes>
      <Footer />
      <QuickMenu />
    </HashRouter>
  )
}

export default App
