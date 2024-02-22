import AuthApi from '../../api-services/AuthApi'
import { setToken, removeToken } from '../../utils/auth'
const state = {
    request: false,
    failure: null,
    access_token: '',
    user: {}
}

const mutations = {
    AUTH_REQUEST: (state) => {
        state.request = true
    },
    AUTH_SUCCESS: (state, { access_token, user }) => {
        state.request = false
        state.failure = null
        state.access_token = access_token
        let userInfo = {
            firstname: user.firstname,
            email: user.email
        }
        state.user = userInfo
        console.log(state.user)
    },
    AUTH_FAILURE: (state, error) => {
        state.request = false
        state.failure = error.response.data.code
    },
    CLEAR_USER: (state) => {
        state.token = null
        state.user = {}
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_USER: (state, user) => {
        state.user = user
    }
}

const actions = {
    login: async ({ commit }, form) => {
        commit('AUTH_REQUEST')

        const res = await AuthApi.login(form)
        if (res == undefined) {
            return false
        }
        console.log(res)
        commit('AUTH_SUCCESS', res)
        setToken(res.access_token)
        return true
    },

    logout: async ({ dispatch }) => {
        dispatch('clearUser')
        return true
    },
    setToken: ({ commit }, token) => {
        commit('SET_TOKEN', token)
    },
    clearUser: ({ commit }) => {
        commit('CLEAR_USER')
        removeToken()
    },
    getAuthUser: async ({ commit }, token) => {
        const res = await AuthApi.getAuthUser({}, token)
        commit('SET_USER', res.data)
    }
}

const getters = {
    username: (state) => state.user.name,
    email: (state) => state.user.email,
    token: (state) => state.token
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
