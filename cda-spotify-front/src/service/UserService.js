import Api from './Api'

export default {
  getAll(token) {
    return Api().get('/api/user', { 
      // headers: { 'Authorization': `Bearer ${token}`},
      // withCredentials: true
    })
  },
  addPlaylist(userId, newPlaylist, token) {
    return Api().post(`/api/user/${userId}/addPlaylist`, newPlaylist, { 
      // headers: { 'Authorization': `Bearer ${token}`},
      // withCredentials: true
    })
  },
  deletePlaylist(userId, playlistId, token) {
    return Api().post(`/api/user/${userId}/deletePlaylist/${playlistId}`, { 
      // headers: { 'Authorization': `Bearer ${token}`},
      // withCredentials: true
    })
  }
}