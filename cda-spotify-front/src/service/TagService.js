import Api from './Api'

export default {
  getAll() {
    return Api().get('/api/tag');
  }
}