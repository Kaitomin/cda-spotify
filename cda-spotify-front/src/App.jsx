
import './style.css'
import NavBar from './components/navbar'
import Footer from './components/Footer'
import Router from './router'
import SecondaryNav from './components/SecondaryNav'

function App() {  
  return (
    <>
      <NavBar />
      <Router />
      <SecondaryNav />
      <Footer />
    </>
  )
}

export default App
