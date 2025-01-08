import classes from "./speechToText.module.scss";
import PropTypes from "prop-types";

const SpeechToText = ({isRecording, handleVoiceInput}) => {

    return (
        <button
            type="button"
            className={classes.chatContext_microphone}
            onClick={handleVoiceInput}
            aria-label="Speech recognition"
        >
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M15.819 5.33622C15.819 3.49405 14.1089 2 12.0001 2C9.89128 2 8.18115 3.49405 8.18115 5.33622V11.3632C8.18115 13.2054 9.89128 14.6995 12.0001 14.6995C14.1089 14.6995 15.819 13.2054 15.819 11.3632V5.33622Z"
                    stroke={isRecording ? "#dd052b" : "#183F40"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M5 10.5038C5 11.451 5.18106 12.389 5.53284 13.2641C5.88463 14.1392 6.40024 14.9343 7.05025 15.6041C7.70026 16.2739 8.47194 16.8052 9.32122 17.1677C10.1705 17.5302 11.0807 17.7168 12 17.7168M12 17.7168C12.9193 17.7168 13.8295 17.5302 14.6788 17.1677C15.5281 16.8052 16.2997 16.2739 16.9497 15.6041C17.5998 14.9343 18.1154 14.1392 18.4672 13.2641C18.8189 12.389 19 11.451 19 10.5038M12 17.7168V22M8.18105 22H15.8189"
                    stroke={isRecording ? "#dd052b" : "#183F40"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    )
}

SpeechToText.propTypes = {
    isRecording: PropTypes.bool.isRequired,
    handleVoiceInput: PropTypes.func.isRequired,
};

export default SpeechToText;