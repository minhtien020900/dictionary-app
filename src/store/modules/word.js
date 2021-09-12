import VocabularyService from '../../apis/modules/word'

const state = {
    words: {},
}
const getters = {
    getWords(state) {
        return state.words;
    }
}
const mutations = {
    SET_WORD(state, payload) {
        return state.words = payload;
    }
}
const actions = {
    getAllWord({commit}) {
        VocabularyService.getAllWord()
            .then(res => {
                console.log(res);
                commit('SET_WORD', res.data.data)
            })
            .catch(error => {
                console.log(error);
            });
    }
}
export default {
    namespaced: true,
    state, getters, mutations, actions
}