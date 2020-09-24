import { userAPI } from "../../api/api";

const TURN_FORM = "TURN_FORM";
const SET_USER_NOTE = "SET_SER_NOTE";
const SET_FORM_DATA = "SET_FORM_DATA";
const TURN_CREATE_FORM = "TURN_CREATE_FORM";

//Начальное значения состояния пользователя
let initialState = {
    notes: [],
    formData: {
        title: '',
        description: ''
    },
    isCreateForm: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        //Запись заметок пользователя
        case SET_USER_NOTE: {
            let stateCopy = { ...state };
            stateCopy.notes = [...action.notes];
            stateCopy.notes.map((note) => {
                return note.isNote = true;
            })
            stateCopy.formData = state.formData;
            return stateCopy;
        }
        //Переключить заметку в режим редактирования/отображения
        case TURN_FORM: {
            let stateCopy = { ...state };
            stateCopy.notes = [...state.notes];
            for (let i = 0; i < stateCopy.notes.length; i++) {
                if (stateCopy.notes[i]._id === action.id) {
                    stateCopy.notes[i].isNote = !stateCopy.notes[i].isNote;
                    break;
                }
            }
            return stateCopy;
        }
        //Установить значение формы редактирования заметки
        case SET_FORM_DATA: {
            let stateCopy = { ...state };
            stateCopy.notes = [...state.notes];
            stateCopy.formData = action.formData;
            return stateCopy;
        }
        case TURN_CREATE_FORM: {
            let stateCopy = { ...state };
            stateCopy.notes = [...state.notes];
            stateCopy.isCreateForm = !state.isCreateForm;
            return stateCopy;
        }
        default: return state;
    }
}

export const turnCreateForm = () => ({
    type: TURN_CREATE_FORM
})

//dispatch заметки
export const setUserNote = (notes) => ({
    type: SET_USER_NOTE,
    notes
});

//dispatch переключения заметки
export const turnForm = (id) => ({
    type: TURN_FORM,
    id
});

//dispatch формы редактирования заметки
export const setFormData = (title, description) => ({
    type: SET_FORM_DATA,
    formData: {
        title,
        description
    }
})

//Запрос на получение заметок
export const getUserNotesThunkCreator = (token) => {
    return async (dispatch) => {
        try {
            let response = await userAPI.getUserNote(token);
            if (response.data.correct === true) {
                dispatch(setUserNote(response.data.userNotes));
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
}

//Запрос на добовление заметки
export const pushUserNoteThunkCreator = (title, description, token) => {
    return async (dispatch) => {
        try {
            let response = await userAPI.pushUserNote(title, description, token);
            if (response.data.correct === true) {
                dispatch(getUserNotesThunkCreator(token));
            }
        } catch (error) {
        }
    }
}

//Запрос на изменение заметки
export const changeUserNoteThunkCreator = (id, title, description, token) => {
    return async (dispatch) => {
        try {
            let response = await userAPI.changeNote(id, title, description, token);
            if (response.data.correct === true) {
                dispatch(getUserNotesThunkCreator(token));
            }
        } catch (error) {
        }
    }
}

//Запрос на удаление заметки
export const deleteUserNoteThunkCreator = (id, token) => {
    return async (dispatch) => {
        try {
            let response = await userAPI.deleteNote(id, token);
            if (response.data.correct === true) {
                dispatch(getUserNotesThunkCreator(token));
            }
        } catch (error) {
            console.log(error.response);
        }
    }
}

export default userReducer;
