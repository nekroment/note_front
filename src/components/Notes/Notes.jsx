import React from 'react';
import classes from './Notes.module.css';
import Note from './Note/Note';
import CreateNote from './CreateNote/CreateNote';

const Notes = (props) => {
    const logOut = () => {
        props.logOut(props.token);
    }
    return (
        <div>
            <div className={classes.logOut}>
                <button onClick={logOut}>LogOut</button>
            </div>
            <div className={classes.column}>
                <div className={classes.notes}>
                    {props.notes.map((note) => {
                        return (
                            <Note key={note._id} description={note.description} title={note.title} id={note._id} setFormData={props.setFormData}
                                turnForm={props.turnForm} changeNote={props.changeNote} isNote={note.isNote} token={props.token} deleteNote={props.deleteNote} />
                        )
                    })}
                </div>
                <div className={classes.createNote}>
                    <CreateNote token={props.token} pushUserNote={props.pushUserNote} turnCreateForm={props.turnCreateForm} isCreateForm={props.isCreateForm} />
                </div>
            </div>
        </div>

    )
}

export default Notes;