import Api from './Api'

export default {
  getAll() {
    return Api().get('/api/music');
  },
  getById(id) {
    return Api().get(`/api/music/${id}`);
  },
  searchBy(searchkey) {
    return Api().get(`/api/music/search/${searchkey}`)
  },
  add(music) {
    return Api().post(`/api/music/new`, music);
  },
  update(id, music) {
    return Api().post(`/api/music/update/${id}`, music)
  },
  delete(id) {
    return Api().delete(`/api/music/delete/${id}`)
  }
}