import PersonalWordService from '../../apis/modules/personal-vocabulary'

const state = {
    personalWords: [],
    partOfSpeechs: [],
    errors: {},
    isLoading: true,
    isLoadingAdd: false,
    isSuccess: false,
}
const getters = {
    getPersonalWords(state) {
        return state.personalWords;
    },
    getPartOfSpeech(state) {
        return state.partOfSpeechs;
    },
    getError(state) {
        return state.errors.error_message;
    }
}
const mutations = {
    SET_PERSONAL_WORD(state, payload) {
        state.isLoading = false;
        return state.personalWords = payload;
    },
    SET_ERRORS(state, payload) {
        return state.errors = payload;
    },
    SET_PART_OF_SPEECH(state, payload) {
        return state.partOfSpeechs = payload;
    },
    SET_MSG(state, payload) {
        return state.msg = payload;
    },
    SET_IS_LOADING_ADD(state, payload) {
        return state.isLoadingAdd = payload;
    },
    SET_IS_SUCCESS(state, payload) {
        return state.isSuccess = payload;
    }

}
const actions = {
    getPartOfSpeech({commit}) {
        PersonalWordService.getPartOfSpeech().then(res => {
            commit('SET_PART_OF_SPEECH', res.data.data)
        })
            .catch(error => {
                commit('SET_ERRORS', error.response);
            });
    },
    getPersonalWords({commit, state}) {
        state.isLoading = true;
        PersonalWordService.getPersonalWord().then(res => {
            commit('SET_PERSONAL_WORD', res.data.data)
        })
            .catch(error => {
                commit('SET_ERRORS', error.response);
            });
    },
    async addPersonalWord(_, payload) {
        return await PersonalWordService.addPersonalWord(payload);
    },
    async editPersonalWord(_, payload) {
        return await PersonalWordService.editPersonalWord(payload);
    },
    async deletePersonalWord(_,payload){
        return await PersonalWordService.deletePersonalWord(payload);
    }
}
export default {
    namespaced: true,
    state, getters, mutations, actions
}