import {useCallback, useRef, useState} from "react";
import {setFirstChatOpen, updateChat, updateLastChatValue} from "../../reducers/chatBotReducer.js";
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios';

const API_URL =
    import.meta.env.MODE === 'production'
        ? import.meta.env.VITE_API_URL_PROD
        : import.meta.env.VITE_API_URL_DEV;

export const useChatBot = () => {
    const [textInput, setTextInput] = useState('');
    const [audioUrl, setAudioUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { chat } = useSelector(state => state.chat);
    const { user } = useSelector(state => state.user);
    const messagesEndRef = useRef(null);
    const { conversation } = chat;
    const {user_id} = user;
    const dispatch = useDispatch();

    function formattedCars(data) {
        return data.map(car =>
            car.reduce((acc, { field_name, field_value }) => {
                acc[field_name] = field_value;
                return acc;
            }, {})
        ).map(car => ({
            image_url: car.Image_URL,
            title: `${car['יצרן'] || ''} ${car['דגם'] || ''}`.trim(),
            description: car.reason,
            url: car.car_web_link,
            options: Object.entries(car)
                .filter(([key]) => !["Image_URL", "reason", "car_web_link"].includes(key))
                .map(([key, value]) => ({ key, value }))
        }));
    }

    const fetchData = useCallback(async (inputMessage) => {
        let message = '';
        let cars = [];
        try {
            setLoading(true);
            setTextInput('');
            await dispatch(updateChat({
                type: 'bot',
                message: '...',
                cars: cars,
            }));
            const requestBody = {
                text_input: inputMessage?.text_input || '',
                user_id: user_id
            };
            const result = await axios.post(
                `${API_URL}`,
                requestBody,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Charset': 'UTF-8'
                    }
                }
            );

            if (result && result.data) {
                message = result.data.llm_response;
                cars = result.data.car_suggestions && result.data.car_suggestions.length > 0 ? formattedCars(result.data.car_suggestions) : [];
            }

            await dispatch(updateLastChatValue({
                type: 'bot',
                message: message,
                cars: cars,
            }));
            await dispatch(setFirstChatOpen(false));
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(err.message);
            await dispatch(updateLastChatValue({
                type: 'bot',
                message: "סליחה, הייתה שגיאה. אנא נסה שוב.",
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