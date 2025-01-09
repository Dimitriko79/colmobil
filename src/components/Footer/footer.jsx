import classes from './footer.module.scss';
import ChatContext from "../ChatContext/index.js";
import React from "react";
import PropTypes from "prop-types";

const Footer = ({fetchData, textInput, setTextInput}) => {

    return (
        <React.Fragment>
            <ChatContext
                fetchData={fetchData}
                textInput={textInput}
                setTextInput={setTextInput}
            />
            <footer className={classes.chatBot__footer}>
                <div className={classes.chatBot__container}>
                    <p className={classes.chatBot__text}>
                        אם יש לך בקשות נוספות או סינונים נוספים,<br/>
                        נשמח לעזור לך למצוא את הרכב המושלם עבורך
                    </p>
                </div>
            </footer>
        </React.Fragment>
    )
}

Footer.propTypes = {
    fetchData: PropTypes.func.isRequired, // Функция, обязательная
    textInput: PropTypes.string.isRequired, // Строка, обязательная
    setTextInput: PropTypes.func.isRequired, // Функция, обязательная
};

export default Footer