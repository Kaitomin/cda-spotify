import React from 'react'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { useEffect } from 'react'

function CookieBanner() {
const [isConsent, setIsConsent] = useState()

    useEffect( () => {
        const cookie = Cookies.get('Streamy Cookie Consent')
        console.log(cookie);
        setIsConsent(cookie)
        
    })

    const handleAcceptCookies = () =>{
        //creation d'un cookie (valeur a def)
        Cookies.set('Streamy Cookie Consent', 'true', { expires: 365 })
        document.getElementById('cookie-banner').style.display = 'none'
    }
    const handleDeclineCookies = () =>{
        document.getElementById('cookie-banner').style.display = 'none'
    }


  return (   
    !isConsent && 
        <div  id="cookie-banner" className='cookie-banner '>
            <p>Attention le site que vous allez consultez contient des cookie et un donc une risque de cookiisation, plus serieursement si vous voulez utiliser le site vous n'avez pas le choix si non partez imediatment</p>
            <div className='d-flex justify-content-evenly flex-wrap row-gap-2'>
                <button className='cookie-consent cookies-btn' onClick={handleAcceptCookies}>Accepter les cookies</button>
                <button className='cookie-reject cookies-btn' onClick={handleDeclineCookies}>Décliner les cookies</button>
            </div>
       </div>
        
      
  )
}

export default CookieBanner