import classes from "./header.module.scss";

const Header = () => {
    return (
        <header className={classes.chatBot__header}>
            <h3 className={classes.chatBot__title}>
                תמצאו לי את הרכב הבא שלי
            </h3>
        </header>
    )
}

export default Header;