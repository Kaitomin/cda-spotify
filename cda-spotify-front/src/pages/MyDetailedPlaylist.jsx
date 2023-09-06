import PlaylistDetails from "../components/PlaylistDetails"

const MyDetailedPlaylist = () => {
  return (
    <div className="my-detailed-playlist px-3 flex-grow-1">
      <PlaylistDetails showActions={true} isIntegrated={false} />
    </div>
  )
}

export default MyDetailedPlaylist
