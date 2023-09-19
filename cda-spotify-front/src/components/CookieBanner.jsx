import { useState, useEffect } from "react"

import Cookies from "js-cookie"

function CookieBanner() {
  const [isConsent, setIsConsent] = useState(true) // banner does not appear upon page refresh

  useEffect(() => {
    const cookie = Cookies.get("Streamy Cookie Consent")
    setIsConsent(cookie)
  })

  const handleAcceptCookies = () => {
    //creation d'un cookie
    Cookies.set("Streamy Cookie Consent", "true", { expires: 365 })
    document.getElementById("ck-banner").style.display = "none"
  }
  const handleDeclineCookies = () => {
    document.getElementById("ck-banner").style.display = "none"
  }

  return (
    !isConsent && (
      <div id="ck-banner" className="ck-banner ">
        <p>
          Cuculus! <br/> Le site que vous consultez contient des cookies et donc
          un risque de cookiisation! Sérieusement, si vous voulez utiliser le
          site, vous n&#39;avez pas le choix ; relinquo statim!<br />
          <img src="/peepo-cookie.gif" width={50} />
        </p>
        <div className="d-flex justify-content-evenly flex-wrap row-gap-2">
          <button
            className="ck-consent ck-btn"
            onClick={handleAcceptCookies}
          >
            Accepter les cookies
          </button>
          <button
            className="ck-reject ck-btn"
            onClick={handleDeclineCookies}
          >
            Décliner les cookies
          </button>
        </div>
      </div>
    )
  )
}

export default CookieBanner
