import AuthService from '../../apis/modules/auth'

const state = {
    indexScreen: 1,
    token: null,
    errorValidateLogin: null,
    errorUnauthorized: null,
    userRegister: {},
    isAuth:false,
}
const getters = {
    getToken(state){
        return state.token;
    },
    getIndexAuthScreen(state) {
        return state.indexScreen;
    },
    getErrorValidateLogin(state) {
        return state.errorValidateLogin;
    },
    getErrorUnauthorizedLogin(state) {
        return state.errorUnauthorized;
    },
}
const mutations = {
    SET_TOKEN(state, payload) {
        state.token = payload;
        // state.isAuth=true;
        return localStorage.setItem('token', payload);
    },
    SET_USER_REGISTER(state, payload) {
        return state.userRegister = payload;
    },
    SET_IS_AUTH(state,payload){
        return state.isAuth = payload;
    }
}
const actions = {
    async singIn(_,payload) {
        return await AuthService.login(payload);
    },
    // async login({commit}, payload) {
    //     console.log(payload);
    //     try {
    //         const response = await AuthService.login(payload);
    //         commit('SET_TOKEN', response.data);
    //
    //     } catch (e) {
    //         let error = e.response.data.error_message;
    //         if (e.response.status === 422) {
    //             commit('SET_VALIDATE_ERROR_LOGIN', error);
    //         } else if (e.response.status === 401) {
    //             commit('SET_VALIDATE_ERROR_LOGIN', null);
    //             commit('SET_UNAUTHORIZED_ERROR_LOGIN', error);
    //         }
    //     }
    // }
    async register(_, payload) {
        return await AuthService.register(payload);
    },
    async logout(_,payload) {
        return await AuthService.logout(payload);
    }
}

export default {
    namespaced: true,
    state, getters, mutations, actions,
}