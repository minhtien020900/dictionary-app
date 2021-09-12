import Api from '../../apis/index'

export default {
    login(data) {
        return Api().post('/auth/login', {
            email: data.email,
            password: data.password,
        });
    },
    register(data) {
        return Api().post('auth/register', {
            name: data.name,
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirm
        });
    },
    logout(){
        return Api().post('auth/logout');
    }
}