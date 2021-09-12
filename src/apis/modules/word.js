import Api from '../../apis/index'

export default {
    getAllWord(){
        return Api().get('/get-all-word');
    }
}