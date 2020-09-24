import React from 'react';
import classes from "./Preloader.module.scss";

const Preloader = (props) => {
    return (
        <div class={classes.loading}>
            <div class={classes.dot}></div>
            <div class={classes.dot}></div>
            <div class={classes.dot}></div>
            <div class={classes.dot}></div>
            <div class={classes.dot}></div>
        </div>
    )
}

export default Preloader;