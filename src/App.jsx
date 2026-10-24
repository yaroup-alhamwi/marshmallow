import Nav from './components/Nav'
import Hero from './components/Hero'
import Zones from './components/Zones'
import Events from './components/Events'
import Morning from './components/Morning'
import Parents from './components/Parents'
import Gallery from './components/Gallery'
import Visit from './components/Visit'
import Footer from './components/Footer'
import Curtain from './components/Curtain'
import { useReveal } from './hooks'

export default function App() {
  useReveal()
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Zones />
        <Events />
        <Morning />
        <Parents />
        <Gallery />
        <Visit />
      </main>
      <Footer />
      <Curtain />
    </>
  )
}
