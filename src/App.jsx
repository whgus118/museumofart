import React from 'react'
import Header from './components/Header'
import MainBanner from './components/MainBanner'
import Section1 from './components/Section1'
import Section2 from './components/Section2'
import Section3 from './components/Section3'
import Section4 from './components/Section4'
import Footer from './components/Footer'
import QuickMenu from './components/QuickMenu'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <main id="main-content">
        <h2 className="sr-only">메인 콘텐츠</h2>
        <MainBanner />
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
      </main>
      <Footer />
      <QuickMenu />
    </>
  )
}

export default App
