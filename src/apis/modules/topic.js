import Api from '../../apis/index'

export default {
    getTopic(){
      return  Api().get('vocabulary/topic/user/get-topic');
    }
}