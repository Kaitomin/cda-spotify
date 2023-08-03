import {Link} from "react-router-dom";

export default function NavBar() {
  return <nav className="nav">
    <Link to="/" className="site-title">Spotify</Link>
    <ul>
      <li>
        <Link to="/searching">Rechercher</Link>
      </li>
      <li>
        <Link to="/playlist">Mes Playlists</Link>
      </li>
      <li>
        <Link to="/account">Mon Compte</Link>
      </li>
      
    </ul>
    </nav>
}