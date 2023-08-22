
import './style.css'
import NavBar from './components/navbar'
import Router from './router'
import SecondaryNav from './components/SecondaryNav'
import useAuth from './hook/useAuth'



function App() {
  const { checkCookie } = useAuth()

  return (
    <>
      <NavBar />
      <Router />
      <SecondaryNav />
    </>
  )
}

export default App
