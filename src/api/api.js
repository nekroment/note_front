import * as axios from 'axios';

//Базовые значения запроса
const instance = axios.create({
    baseURL: 'http://localhost:3000'
})

export const authAPI = {
    //Запрос на получение данных пользователя
    async authMe(token) {
        return instance.get('/note', {
            headers: {'auth_token': token}
        });
    },
    //Запрос на авторизацию пользователя
    async Login(email, password) {
        return instance.post('/auth/login/', { email, password });
    },
    //Запрос на выход пользователя
    async LogOut(token) {
        return instance.delete('/auth/logout', {
            headers: {'auth_token': token}
        });
    },
    //Запрос на регистрацию пользователя
    async Registration(email, password, name) {
        return instance.post('/auth/register/', { name, email, password });
    }

}

export const userAPI = {
    //Запрос на получение заметок пользователя
    async getUserNote(token) {
        return instance.get('/note', {
            headers: {'auth_token': token}
        });
    },
    //Запрос на добовление новой заметки
    async pushUserNote(title, description, token) {
        return instance.post("/note", { title, description }, {
            headers: {'auth_token': token}
        });
    },
    //Запрос уникальной заметки
    async getSpecificNote(postId, token) {
        return instance.get(`/note/${postId}`, {
            headers: {'auth_token': token}
        });
    },
    //Запрос на изменение заметки
    async changeNote(_id, title, description, token) {
        return instance.patch('/note', { _id, title, description }, {
            headers: {'auth_token': token}
        });
    },
    //Запрос на удаление заметки
    async deleteNote(postId, token) {
        return instance.delete(`/note/${postId}`, {
            headers: {'auth_token': token}
        });
    }
}