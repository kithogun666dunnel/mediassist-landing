import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProblemSolution from './components/ProblemSolution'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import BookDemo from './components/BookDemo'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-white font-sans text-navy">
      <Navbar />
      <Hero />
      <ProblemSolution />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <BookDemo />
      <Footer />
    </div>
  )
}