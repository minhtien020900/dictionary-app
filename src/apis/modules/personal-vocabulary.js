import Api from '../../apis/index'


export default {
    getPersonalWord() {
        return Api().post('vocabulary/personal-word/get');
    },
    getPartOfSpeech() {
        return Api().get('part-of-speech/get');
    },
    addPersonalWord(data) {
        return Api().post('vocabulary/personal-word/add', data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
    },
    editPersonalWord(data) {
        return Api().post('vocabulary/personal-word/edit', data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
    },
    deletePersonalWord(data){
        return Api().post('vocabulary/personal-word/delete',data);
    }
}