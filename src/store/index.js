import Vue from 'vue';
import Vuex from 'vuex';

import AuthStore from './modules/auth';
import VocabularyStore from './modules/word'
import TopicStore from './modules/topic'
import PersonalVocabularyStore from './modules/personal-vocabulary'

Vue.use(Vuex)

export default new Vuex.Store({

    modules: {
        AUTH: AuthStore,
        WORD: VocabularyStore,
        TOPIC:TopicStore,
        PERSONAL_VOCABULARY:PersonalVocabularyStore,
    }
})
