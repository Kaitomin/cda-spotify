import PlaylistContent from "../components/PlaylistContent"

const PlaylistDetails = () => {
  return (
    <div className="px-3 flex-grow-1">
      <PlaylistContent showActions={true} isIntegrated={false} />
    </div>
  )
}

export default PlaylistDetails
