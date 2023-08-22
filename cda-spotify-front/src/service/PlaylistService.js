import Api from './Api'

export default {
  getAll(token) {
    return Api().get('/api/playlist', { 
      // headers: { 'Authorization': `Bearer ${token}`},
      // withCredentials: true
    })
  },
  getById(playlistId, token) {
    return Api().get(`/api/playlist/${playlistId}`, { 
      // headers: { 'Authorization': `Bearer ${token}`},
      // withCredentials: true
    })
  },
  getPlaylistByUserId(userId, token) {
    return Api().get(`/api/playlist/user/${userId}`, { 
      // headers: { 'Authorization': `Bearer ${token}`},
      // withCredentials: true
    })
  },
  addMusic(playlistId, music, token) {
    return Api().post(`/api/playlist/${playlistId}/addMusic`, music,  { 
      // headers: { 'Authorization': `Bearer ${token}`},
      // withCredentials: true
    })
  },
  updateName(userId, playlist, token) {
    return Api().post(`/api/user/${userId}/updatePlaylist`,  playlist,  { 
      // headers: { 'Authorization': `Bearer ${token}`},
      // withCredentials: true
    })
  },
  removeMusic(playlistId, musicId, token) {
    return Api().post(`/api/playlist/${playlistId}/removeMusic/${musicId}`,  { 
      // headers: { 'Authorization': `Bearer ${token}`},
      // withCredentials: true
    })
  }
}