export const AuthMixin = {
    data: () => {
        return {
            snackbar: false,
            loading: false,
            isShowPass: false,
            iconLock: 'mdi-lock',
            iconEmail: 'mdi-email',
            iconUser: 'mdi-account',
            msgValidate: {},
        }
    },
    methods: {
        showPass() {
            return this.isShowPass = !this.isShowPass;
        },
        getIconAppend() {
            return this.isShowPass ? 'mdi-eye' : 'mdi-eye-off';
        },
        getTypeTextField() {
            return this.isShowPass ? 'text' : 'password';
        }
    }
}