import {useChatContext} from "./useChatContext.js";
import classes from './chatContext.module.scss'
import React from "react";
import SpeechToText from "../SpeechToText/index.js";

const ChatContext = props => {
    const {
        error,
        textInput,
        setTextInput,
        isRecording,
        handleVoiceInput,
        handleKeyDown,
        scrollToBottom,
        handleSendClick
    } = useChatContext(props);

    return (
        <div className={classes.chatContext}>
            <div className={classes.chatContext__container}>
                <input
                    className={classes.chatContext__input}
                    type="text"
                    name="message"
                    minLength="4"
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setTextInput(e.target.value)}
                    value={textInput}
                    aria-label="Input recognition"
                />
                <div className={classes.chatContext__actions}>
                    <SpeechToText isRecording={isRecording} handleVoiceInput={handleVoiceInput}/>
                    <button
                        className={classes.chatContext_send}
                        type="button"
                        name="send"
                        aria-label="Send recognition"
                        onClick={handleSendClick}
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="32" height="32" rx="8" fill="#183F40"/>
                            <path
                                d="M8.84329 16.232C8.63262 16.0211 8.51428 15.7351 8.51428 15.437C8.51428 15.1389 8.63262 14.8529 8.84329 14.642L15.2183 8.267C15.4292 8.05632 15.7152 7.93799 16.0133 7.93799C16.3114 7.93799 16.5974 8.05632 16.8083 8.267L23.1833 14.642C23.3823 14.8552 23.4906 15.1374 23.4856 15.429C23.4806 15.7205 23.3625 15.9988 23.1563 16.205C22.9501 16.4112 22.6718 16.5293 22.3802 16.5343C22.0887 16.5394 21.8065 16.431 21.5933 16.232L17.1383 11.777V22.937C17.1383 23.2354 17.0198 23.5215 16.8088 23.7325C16.5978 23.9435 16.3117 24.062 16.0133 24.062C15.7149 24.062 15.4288 23.9435 15.2178 23.7325C15.0068 23.5215 14.8883 23.2354 14.8883 22.937V11.777L10.4333 16.232C10.2224 16.4427 9.93642 16.561 9.63829 16.561C9.34017 16.561 9.05423 16.4427 8.84329 16.232Z"
                                fill="#A5F795"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChatContext;