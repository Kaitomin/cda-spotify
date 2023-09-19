import { useEffect } from "react"
import Cookies from "js-cookie"

import useAuth from "../hook/useAuth"

function CookieBanner() {
  const { isCookieBannerHidden, hideCookieBanner } = useAuth()

  useEffect(() => {
    const cookie = Cookies.get("Streamy Cookie Consent")
    hideCookieBanner(cookie ? cookie : false)
  }, [])

  const handleAcceptCookies = () => {
    //creation d'un cookie
    Cookies.set("Streamy Cookie Consent", "true", { expires: 365 })
    hideCookieBanner(true)
  }
  const handleDeclineCookies = () => {
    Cookies.set("Streamy Cookie Consent", "", { expires: 0 })
    hideCookieBanner(true)
  }

  return (
    !isCookieBannerHidden && (
      <div id="ck-banner" className="ck-banner">
        <p className="position-relative">
          Cuculus! <br/> Le site que vous consultez contient des cookies et donc
          un risque de cookiisation! Sérieusement, si vous voulez utiliser le
          site, vous n&#39;avez pas le choix ; relinquo statim!<br />
          <img src="/peepo-cookie.gif" width={50} />
          <i className="fa-solid fa-xmark" onClick={() => hideCookieBanner(true)}></i>
        </p>
        <div className="d-flex justify-content-between flex-wrap row-gap-2">
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
        <span><em>Consentement aux cookies : {Cookies.get("Streamy Cookie Consent") ? 'oui' : 'non'}</em></span>
      </div>
    )
  )
}

export default CookieBanner
