import React, { Fragment } from 'react';
import classes from "./Note.module.css";
import InitializeNoteForm from '../NoteForm/NoteForm';

const Note = ({ description, title, id, setFormData, turnForm, changeNote, deleteNote, isNote, token}) => {

    //Функция запроса на редактирование заметки
    const onSubmit = (formData) => {
        let newTitle = (formData.title === '' ? title : formData.title);
        let newDescription = (formData.description === '' ? description : formData.description);
        changeNote(id, newTitle, newDescription, token);
        turnForm(id);
    }

    //Запрос на изменение режима отображения заметки
    const turnForms = () => {
        setFormData(title, description);
        turnForm(id);
    }

    const deleteUserNote = () => {
        deleteNote(id, token);
    }

    return (
        <Fragment>
            <div className={classes.note}>
                <div className={classes.cross} onClick={deleteUserNote}></div>
                <div className={classes.head + " " + (isNote === false ? classes.desabled : classes.undesabled)} >
                    <div className={classes.title}>{title}</div>
                </div>
                <div className={classes.noteText + " " + (isNote === false ? classes.desabled : classes.undesabled)}>
                    <div className={classes.body}>{description}</div>
                    <button className={classes.noteButton} onClick={turnForms}>Редактировать</button>
                </div>
                <div className={classes.noteForm + " " + (isNote === true ? classes.desabled : classes.undesabled)}>
                    <InitializeNoteForm onSubmit={onSubmit}/>
                </div>
            </div>
        </Fragment>
    )
}

export default Note;