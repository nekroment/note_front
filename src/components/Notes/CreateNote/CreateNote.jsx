import React from 'react';
import { reduxForm, reset, Field } from 'redux-form';
import classes from './CreateNote.module.css';

//Форма создания новой заметки в redux-form
const CreateNoteForm = (props) => {
    return (
        <div>
            <form className={classes.form} onSubmit={props.handleSubmit}>
                <div className={classes.title}>
                    <Field component={"input"} name='title' type={"text"} placeholder="title" />
                </div>
                <div className={classes.description}>
                    <Field component={"textarea"} name='description' type={"text"} placeholder="description" />
                </div>
                <div>
                    <button className={classes.save} type="submit">Сохранить</button>
                </div>

            </form>
        </div>
    )
}

//Функция сбрасывающее значения формы
const afterSubmit = (result, dispatch) =>
    dispatch(reset('createNote'));

//Создание редьюсера в редаксе
const CreateReduxNote = reduxForm({
    form: 'createNote',
    onSubmitSuccess: afterSubmit
})(CreateNoteForm);

const CreateNote = (props) => {

    const onSubmit = (formData) => {

        if (formData.title === undefined && formData.description === undefined) {
            props.turnCreateForm();
            return false;
        }

        let title = formData.title;
        let description = formData.description;
        title = (formData.title === undefined ? `Заголовок` : formData.title);
        description = (formData.description === undefined ? 'Заметка' : formData.description);
        props.pushUserNote(title, description, props.token);
        props.turnCreateForm();

    }

    return (
        <div className={classes.createNote}>
            <div className={props.isCreateForm === true ? classes.undesabled : classes.desabled}>
                <CreateReduxNote onSubmit={onSubmit} />
            </div>
            <div className={props.isCreateForm === true ? classes.desabled : classes.undesabled}>
                <button className={classes.changeForm} onClick={props.turnCreateForm}>Создать</button>
            </div>


        </div>
    )
}

export default CreateNote;