import {useCallback} from "react";
import {useSpeechToText} from "../SpeechToText/useSpeechToText.js";
import {updateChat} from "../../reducers/chatBotReducer.js";
import {useDispatch} from "react-redux";

export const useChatContext = props => {
    const{ fetchData, textInput, setTextInput } = props
    const dispatch = useDispatch();
    const {
        inputRef,
        isRecording,
        setIsRecording,
        error,
        handleInput,
        toggleRecording,
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
        inputRef,
        textInput,
        setTextInput,
        isRecording,
        toggleRecording,
        handleKeyDown,
        handleSendClick,
        handleInput
    };
};
