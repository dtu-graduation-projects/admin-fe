import BaseApi from './BaseApi'

class UserApi extends BaseApi {
    register(params = {}) {
        return this.post('auth/register', params)
    }
    getAllUsers() {
        return this.get('users')
    }
    getUserById(params = {}) {
        return this.get('users/detail-user/' + params)
    }
    updateUser(id, params = {}) {
        return this.put('users/update-user/' + id, params)
    }
    deleteUser(params = {}) {
        return this.delete('users/delete-user/' + params)
    }
}
export default new UserApi()
