import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SocialProofBar from './components/SocialProofBar'
import ProblemSolution from './components/ProblemSolution'
import HowItWorks from './components/HowItWorks'
import SafetyArchitecture from './components/SafetyArchitecture'
import Features from './components/Features'
import LiveChat from './components/LiveChat'
import DemoPreview from './components/DemoPreview/DemoPreview'
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
      <SocialProofBar />
      <ProblemSolution />
      <HowItWorks />
      <SafetyArchitecture />
      <Features />
      <LiveChat />
      <DemoPreview />
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