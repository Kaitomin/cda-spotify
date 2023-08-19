import Api from './Api'

export default {
  getAll() {
    return Api().get('/api/user');
  },
  addPlaylist(userId, newPlaylist) {
    return Api().post(`/api/user/${userId}/addPlaylist`, newPlaylist)
  },
  deletePlaylist(userId, playlistId) {
    return Api().post(`/api/user/${userId}/deletePlaylist/${playlistId}`)
  }
}