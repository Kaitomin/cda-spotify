import Api from './Api'

export default {
  getAll() {
    return Api().get('/api/playlist');
  },
  getById(playlistId) {
    return Api().get(`/api/playlist/${playlistId}`);
  },
  getPlaylistByUserId(userId) {
    return Api().get(`/api/playlist/user/${userId}`)
  },
  addMusic(playlistId, music) {
    return Api().post(`/api/playlist/${playlistId}/addMusic`, music);
  },
  updateName(userId, playlist) {
    return Api().post(`/api/user/${userId}/updatePlaylist`,  playlist)
  },
  removeMusic(playlistId, musicId) {
    return Api().post(`/api/playlist/${playlistId}/removeMusic/${musicId}`)
  }
}