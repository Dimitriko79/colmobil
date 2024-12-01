import {useCallback, useEffect, useRef, useState} from "react";
import {useSpeechToText} from "../SpeechToText/useSpeechToText.js";
import {updateChat} from "../../reducers/chatBotReducer.js";
import {useDispatch} from "react-redux";

export const useChatContext = props => {
    const{ fetchData, textInput, setTextInput, audioUrl, setAudioUrl } = props
    const dispatch = useDispatch();
    const {
        handleVoiceInput,
        isRecording,
        error
    } = useSpeechToText(props);
    const messagesEndRef = useRef(null);

    const handleSendClick = useCallback(async () => {
        try {
            if (textInput.trim() !== '') {
                await dispatch(updateChat({ type: 'user', message: textInput}))
                await fetchData({text_input: textInput});
                setTextInput('');
            }
        } catch (e) {
            console.error(e.message);
        }
    }, [audioUrl, textInput]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            // TODO: Добавьте вашу логику обработки ввода
        }
    };



    return {
        error,
        textInput,
        setTextInput,
        isRecording,
        handleVoiceInput,
        handleKeyDown,
        scrollToBottom,
        handleSendClick
    };
};
