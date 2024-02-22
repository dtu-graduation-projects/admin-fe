import BaseApi from './BaseApi'
class AuthApi extends BaseApi {
    login(params = {}) {
        return this.post('auth/login', params)
    }
    getAuthUser(params = {}, token = null) {
        return this.get('user/me', params, token)
    }
    changePassword(params = {}, token = null) {
        return this.post('user/change-pass', params, token)
    }
}

export default new AuthApi()
