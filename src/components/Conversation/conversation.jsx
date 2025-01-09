import React from "react";
import PropTypes from "prop-types";
import LOGO from "../../assets/logo.svg";
import CHECK from "../../assets/check.svg";

const Conversation = React.forwardRef(({ type, ind, message, cars = [], classes }, ref) => {
    const messageItem = message.trim() !== "" ? (
        <div className={classes.chatBot__context_item_message}>
            {type === "bot" && (
                <div className={classes.chatBot__context_item_message_image}>
                    <img src={LOGO} alt="logo" />
                </div>
            )}
            {message === "..." ? (
                <p className={classes.chatBot__context_item_message_text}>
                    <span className={classes.chatBot__context_item_message_loading_dots}>
                        {message.split("").map((dot, index) => (
                            <span key={index}>{dot}</span>
                        ))}
                    </span>
                </p>
            ) : (
                <p
                    className={classes.chatBot__context_item_message_text}
                    style={type === "bot" ? { padding: "20px" } : { padding: "0 20px", backgroundColor: "#183F40", color: "#ffffff"}}
                    dangerouslySetInnerHTML={{
                        __html: cars && cars.length
                            ? message
                            : message.replace(/\n/g, "<br />"),
                    }}
                />
            )}
        </div>
    ) : null;

    return type === "bot" ? (
        <div key={ind} className={classes.chatBot__context_item} style={{ direction: "rtl" }}>
            {messageItem}
            <div className={classes.chatBot_options}>
                {cars.map(({ image_url, title, description, options, url }, index) => (
                    <a href={url} key={index} className={classes.chatBot_option} target="_blank">
                        <div
                            className={classes.chatBot_option_image}
                            style={{
                                backgroundImage: `url(${image_url})`,
                                backgroundSize: "contain",
                                backgroundPosition: "center center",
                                backgroundRepeat: "no-repeat",
                            }}
                        />
                        <div className={classes.chatBot_option_content}>
                            <p className={classes.chatBot_option_content_title}>{title}</p>
                            <span className={classes.chatBot_option_content_subtitle}>
                                {description}
                            </span>
                            <ul className={classes.chatBot_option_content_descriptions}>
                                {options.map(({ key, value }) => (
                                    <li key={key}>
                                        <img src={CHECK} alt="check" />
                                        <strong>{key}</strong>&nbsp;{value}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </a>
                ))}
            </div>
            <div ref={ref} />
        </div>
    ) : (
        <div className={classes.chatBot__context_item} style={{ direction: "ltr" }}>
            {messageItem}
            <div ref={ref} />
        </div>
    );
});

Conversation.displayName = "Conversation";
Conversation.propTypes = {
    type: PropTypes.string.isRequired,
    ind: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    cars: PropTypes.arrayOf(
        PropTypes.shape({
            image_url: PropTypes.string,
            title: PropTypes.string,
            description: PropTypes.string,
            options: PropTypes.arrayOf(
                PropTypes.shape({
                    key: PropTypes.string.isRequired,
                    value: PropTypes.string.isRequired,
                })
            ),
        })
    ).isRequired,
    classes: PropTypes.object.isRequired,
};
Conversation.defaultProps = {
    cars: [],
};

export default Conversation;