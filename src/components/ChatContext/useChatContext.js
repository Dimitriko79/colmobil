import {useCallback} from "react";
import {useSpeechToText} from "../SpeechToText/useSpeechToText.js";
import {updateChat} from "../../reducers/chatBotReducer.js";
import {useDispatch} from "react-redux";

export const useChatContext = props => {
    const{ fetchData, textInput, setTextInput } = props
    const dispatch = useDispatch();
    const {
        handleVoiceInput,
        isRecording,
        setIsRecording,
        error
    } = useSpeechToText(props);

    const handleSendClick = useCallback(async () => {
        try {
            if (textInput.trim() !== '') {
                await dispatch(updateChat({ type: 'user', message: textInput}))
                await fetchData({text_input: textInput});
            }
        } catch (e) {
            console.error(e.message);
        } finally {
            await setIsRecording(false);
            await setTextInput('');
        }
    }, [textInput]);

    const handleKeyDown = async e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            await handleSendClick();
        }
    };



    return {
        error,
        textInput,
        setTextInput,
        isRecording,
        handleVoiceInput,
        handleKeyDown,
        handleSendClick
    };
};
