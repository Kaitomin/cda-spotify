import {Link} from "react-router-dom";

export default function NavBar() {
  return <nav className="nav">
    <Link to="/" className="site-title">Spotify</Link>
    <ul>
      <li>
        <Link to="/searching">Rechercher</Link>
      </li>
      <li>
        <Link to="/myPlaylist">Mes Playlists</Link>
      </li>
      <li>
        <Link to="/account">Mon Compte</Link>
      </li>
      
    </ul>
    </nav>
}