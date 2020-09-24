import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import classes from './NoteForm.module.css';

//Форма для редактирования заметок в redux-form
const NoteForm = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit} className={classes.noteForm}>
                <Field component={"input"} name='title' type={"text"} placeholder="head" />
                <Field component={"textarea"} name='description' type={"text"} placeholder="note" />
                <button>Сохранить</button>
            </form>
        </div>
    )
}

//Создание редьюсера в редаксе
const NoteReduxForm = reduxForm({
    form: `note`,
    enableReinitialize: true
})(NoteForm);

//Подключение формы к начальным значениям из редакса
const InitializeNoteForm = connect(
    state => ({
        initialValues: state.user.formData
    }),
    {}
)(NoteReduxForm)

export default InitializeNoteForm;