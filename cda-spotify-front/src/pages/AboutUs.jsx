const AboutUs = () => {
  return (
    <div className='px-3 text-center about-us flex-grow-1'>
      <h1>A propos</h1>
      <p>Streamy est un projet fullstack réalisé avec React et Spring par 2 développeurs lors de la POE &quot;Développeur Java&quot; chez Dawan en 2023</p>
      <em>Ceci est un projet étudiant uniquement destiné à la démonstration. Aucune musique n&#39;est utilisée à des fins commerciales (no ban plz <img src="/prayge.gif" alt="" width={30} /> )</em>
      <div className='d-flex justify-content-around my-5'>
        <img src="/hackerman.gif" alt="" className='rounded-circle' width={120}/>
        <img src="/pepe.gif" alt="" className='rounded-circle' width={120}/>
      </div>
      <h2 className='text-decoration-underline'>Stack</h2>
      <div className='stack d-flex flex-wrap justify-content-around align-content-center gap-4 py-3'>
        <img src='/react.png' alt='react' width={55} title='React' />
        <img src='/docker.png' alt='docker' width={55} title='Docker' />
        <img src='/maven.png' alt='maven' width={55} title='Maven' />
        <img src='/microsoftAzure.png' alt='microsoft azure' width={55} title='Microsoft Azure' />
        <img src='/bootstrap.png' alt='bootstrap' width={55} title='Bootstrap' />
        <img src='/render.webp' alt='render' width={55} title='Render' />
        <img src='/spring.png' alt='spring' width={55} title='Spring' />
        <img src='/cloudinary.png' alt='cloudinary' width={55} title='Cloudinary' className="object-fit-contain" />
      </div>
    </div>
  )
}

export default AboutUs