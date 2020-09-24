import React from 'react';
import Notes from './Notes';
import { connect } from 'react-redux';
import {
    pushUserNoteThunkCreator, getUserNotesThunkCreator,
    changeUserNoteThunkCreator, turnForm, setFormData, turnCreateForm, deleteUserNoteThunkCreator
} from '../../redux/reducer/UserReducer';
import { Redirect } from 'react-router-dom';
import { logOutThunkCreator } from '../../redux/reducer/AuthReducer';


class ContainerNotes extends React.Component {

    componentDidMount() {

    }

    //Переключение заметки в режим редакирования/отображения
    turnForm = (id) => {
        this.props.turnForm(id);
    }

    render() {

        //Переадресация, если пользователь не авторизирован
        if (this.props.isAuth === false) {
            return <Redirect to={'/login'} />
        }
        return (
            <div>
                <Notes notes={this.props.notes} turnForm={this.turnForm} changeNote={this.props.changeUserNoteThunkCreator} isCreateForm = {this.props.isCreateForm}
                 setFormData={this.props.setFormData} token={this.props.token} deleteNote={this.props.deleteUserNoteThunkCreator}
                 pushUserNote={this.props.pushUserNoteThunkCreator} turnCreateForm = {this.props.turnCreateForm} logOut={this.props.logOutThunkCreator}/>
            </div>
        )
    }
}


//Подключение к редаксу и получение нужных данных и запросов
const mapStateToProps = (state) => ({
    notes: state.user.notes,
    isAuth: state.auth.isAuth,
    isCreateForm: state.user.isCreateForm,
    token: state.auth.token
})

export default connect(mapStateToProps, {
    turnForm,
    turnCreateForm,
    pushUserNoteThunkCreator,
    getUserNotesThunkCreator,
    changeUserNoteThunkCreator,
    deleteUserNoteThunkCreator,
    logOutThunkCreator,
    setFormData
})(ContainerNotes);
