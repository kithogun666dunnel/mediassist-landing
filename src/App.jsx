import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProblemSolution from './components/ProblemSolution'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import DemoPreview from './components/DemoPreview/DemoPreview'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import BookDemo from './components/BookDemo'
import Footer from './components/Footer'
import Dashboard from './components/Dashboard/Dashboard'

function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProblemSolution />
      <Features />
      <HowItWorks />
      <DemoPreview />
      <Testimonials />
      <Pricing />
      <FAQ />
      <BookDemo />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}