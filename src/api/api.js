import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: '',
})

export const authAPI = {
    authMe() {
        return instance.get('');
    },
    Login(email, password, rememberMe = false) {
        return instance.post('', {email, password, rememberMe});
    },
    LogOut() {
        return instance.delete('');
    },
    Registration(email, password, login) {
        return instance.post('', {email, password, login});
    }

}

export const profileAPI = {
    getProfile(userId) {
        return instance.get('');
    }
}