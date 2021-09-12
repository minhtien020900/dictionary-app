import TopicService from '../../apis/modules/topic'

const state = {
    topics: [],
    errors: {},
}
const getters = {
    getTopic(state) {
        return state.topics;
    }
}
const mutations = {
    SET_USER_TOPIC(state, payload) {
        return state.topics = payload;
    },
    SET_ERRORS(state, payload) {
        return state.errors = payload;
    }
}
const actions = {
    getTopic({commit}) {
        TopicService.getTopic().then(res => {
                commit('SET_USER_TOPIC', res.data.data)
            })
            .catch(error => {
                console.log(error);
                commit('SET_ERRORS',error.response);
            });
    },
    // addTopic({commit},) {
    //     TopicService.
    // }
}
export default {
    namespaced: true,
    state, getters, mutations, actions
}