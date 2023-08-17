import {Link} from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="nav border-bottom border-1">
      <Link to="/" className="site-title">Spotify</Link>
      <ul>
        <li>
          <Link to="/search">Rechercher</Link>
        </li>
        <li>
          <Link to="/playlists">Mes Playlists</Link>
        </li>
        {/* <li>
          <Link to="/account">Mon Compte</Link>
        </li> */}
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        {/* <li>
          <Link to="/">S'inscrire</Link>
        </li>
        <li>
          <Link to="/">Connexion</Link>
        </li> */}
      </ul>
    </nav>
  )
}