import React from 'react'

const AboutUs = () => {
  return (
    <div className='px-3 text-center about-us'>
      <h1>A propos</h1>
      <p>Streamy est un projet fullstack développé avec React et Java par 2 super développeurs lors de la POE "Développeur Java" chez Dawan en 2023</p>
      <div className='d-flex justify-content-around my-5'>
        <img src="/hackerman.gif" alt="" className='rounded-circle' width={150}/>
        <img src="/pepe.gif" alt="" className='rounded-circle' width={150}/>
      </div>
    </div>
  )
}

export default AboutUs