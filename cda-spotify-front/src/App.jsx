import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const element = <a href="https://www.reactjs.org"> link to react </a>;
  return (
    <>
    <nav>navbar</nav>
    coucou <br/>
    {element}
    
    {/*
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="*" element={<NoMatch />} />
      </Routes> */}
  </>
  )
}

export default App
