
import Footer from './components/Footer'
import Router from './router'
import NavSecondary from './components/NavSecondary'
import Header from './components/Header'
import CookieBanner from './components/CookieBanner'
import './style.css'

function App() {  
  return (
    <>
      <Header />
      <Router />
      <NavSecondary />
      <CookieBanner />
      <Footer />
    </>
  )
}

export default App
