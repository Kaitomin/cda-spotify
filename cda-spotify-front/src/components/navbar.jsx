

export default function NavBar() {
  return <nav className="nav">
    <a href="/" className="site-title">Spotify</a>
    <ul>
      <li>
        <a href="/searching">Rechercher</a>
      </li>
      <li>
        <a href="/playlist">Mes Playlists</a>
      </li>
      <li>
        <a href="/account">Mon Compte</a>
      </li>
      
    </ul>
    </nav>
}