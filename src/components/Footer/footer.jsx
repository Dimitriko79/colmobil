import React from 'react';
import classes from './footer.module.scss';

const Footer = () => {

    return (
        <footer className={classes.chatBot__footer}>
            <div className={classes.chatBot__container}>
                <p className={classes.chatBot__text}>
                    אם יש לך בקשות נוספות או סינונים נוספים,<br/>
                    נשמח לעזור לך למצוא את הרכב המושלם עבורך
                </p>
            </div>
        </footer>
    )
}

export default Footer