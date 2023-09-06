const AboutUs = () => {
  return (
    <div className='px-3 text-center about-us flex-grow-1'>
      <h1>A propos</h1>
      <p>Streamy est un projet fullstack réalisé avec React et Java par 2 super développeurs lors de la POE "Développeur Java" chez Dawan en 2023</p>
      <div className='d-flex justify-content-around my-5'>
        <img src="/hackerman.gif" alt="" className='rounded-circle' width={120}/>
        <img src="/pepe.gif" alt="" className='rounded-circle' width={120}/>
      </div>
      <h2 className='text-decoration-underline'>Stack</h2>
      <div className='stack d-flex flex-wrap justify-content-around align-content-center gap-4 py-3'>
        <img src='/react.png' alt='' width={55} title='React' />
        <img src='/docker.png' alt='' width={55} title='Docker' />
        <img src='/maven.png' alt='' width={55} title='Maven' />
        <img src='/microsoftAzure.png' alt='' width={55} title='Microsoft Azure' />
        <img src='/bootstrap.png' alt='' width={55} title='Bootstrap' />
        <img src='/render.webp' alt='' width={55} title='Render' />
        <img src='/spring.png' alt='' width={55} title='Spring' />
      </div>
    </div>
  )
}

export default AboutUs