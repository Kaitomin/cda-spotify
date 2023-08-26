import Api from './Api'

export default {
  getAll() {
    return Api().get('/api/music');
  },
  getById(id) {
    return Api().get(`/api/music/${id}`);
  },
  getByArtist(artist){
    return Api().get(`/api/music/byArtist/${artist}`)
  },
  getByTag(tag){
    return Api().get(`/api/music/byTag/${tag}`)
  },
  searchBy(searchKey) {
    return Api().get(`/api/music/search/${searchKey}`)
  },
  searchByTitle(searchKey) {
    return Api().get(`/api/music/search/title/${searchKey}`)
  },
  searchByArtist(searchKey) {
    return Api().get(`/api/music/search/artist/${searchKey}`)
  },
  add(music, token) {
    return Api().post(`/api/music/new`, music, { 
      // headers: { 'Authorization': `Bearer ${token}`},
      // withCredentials: true
    })
  },
  update(id, music, token) {
    return Api().post(`/api/music/update/${id}`, music, { 
      // headers: { 'Authorization': `Bearer ${token}`},
      // withCredentials: true
    })
  },
  delete(id, token) {
    return Api().delete(`/api/music/delete/${id}`, { 
      // headers: { 'Authorization': `Bearer ${token}`},
      // withCredentials: true
    })
  }
}