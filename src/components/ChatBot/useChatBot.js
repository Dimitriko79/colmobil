import {useCallback, useState} from "react";
import {setFirstChatOpen, updateChat} from "../../reducers/chatBotReducer.js";
import {useDispatch} from "react-redux";

export const useChatBot = () => {
    const [textInput, setTextInput] = useState('');
    const [audioUrl, setAudioUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const fetchData = useCallback(async (inputMessage) => {
        setLoading(true);
        try {
            const requestBody = {
                text_input: inputMessage?.text_input || ''
            };
            console.log('requestBody', requestBody)
            await dispatch(setFirstChatOpen(false));
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(err.message);
            await dispatch(updateChat({
                type: 'bot',
                message: "Sorry, there was an error. Please try again.",
            }));
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    return {
        loading,
        error,
        fetchData,
        textInput,
        setTextInput,
        audioUrl,
        setAudioUrl
    }
}