import DetailedPlaylist from "../components/DetailedPlaylist"

const MyDetailedPlaylist = () => {
  return (
    <div className='my-detailed-playlist px-3 flex-grow-1'>
      <DetailedPlaylist showActions={true} isIntegrated={false} />
    </div>
  )
}

export default MyDetailedPlaylist