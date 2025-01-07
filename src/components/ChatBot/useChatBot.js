import {useCallback, useRef, useState} from "react";
import {setFirstChatOpen, updateChat} from "../../reducers/chatBotReducer.js";
import {useDispatch, useSelector} from "react-redux";

export const useChatBot = () => {
    const [textInput, setTextInput] = useState('');
    const [audioUrl, setAudioUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { chat } = useSelector(state => state.chat);
    const messagesEndRef = useRef(null);
    const { conversation } = chat;
    const dispatch = useDispatch();

    const fetchData = useCallback(async (inputMessage) => {
        setLoading(true);
        try {
            const requestBody = {
                text_input: inputMessage?.text_input || ''
            };
            console.log(requestBody)
            await dispatch(updateChat({
                type: 'bot',
                message: "בהתאם לצרכים שלך, הנה שלושה דגמים שמתאימים ביותר:",
            }));
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

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return {
        loading,
        error,
        conversation,
        fetchData,
        textInput,
        setTextInput,
        audioUrl,
        setAudioUrl,
        messagesEndRef,
        scrollToBottom
    }
}