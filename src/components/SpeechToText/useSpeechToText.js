import {useEffect, useRef, useState} from "react";

export const useSpeechToText = props => {
    const { setTextInput, setAudioUrl } = props;
    const mediaRecorder = useRef(null);
    const audioChunks = useRef([]);
    const recognitionRef = useRef(null);

    const [speechToText, setSpeechToText] = useState('');


    const [isRecording, setIsRecording] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (SpeechRecognition) {
            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.continuous = true;
            recognitionInstance.interimResults = true;
            recognitionInstance.lang = 'he-IL';

            recognitionInstance.onresult = (event) => {
                // setSpeechToText(Array.from(event.results).map(result => result[0].transcript).join(''));
                setTextInput(Array.from(event.results).map(result => result[0].transcript).join(''))
            };

            recognitionInstance.onerror = (event) => {
                console.error("Speech recognition error:", event.error);
                setError(event.error)
                setIsRecording(false);
            };

            recognitionRef.current = recognitionInstance;
        } else {
            setError('Speech Recognition is not supported in this browser.');
        }
    }, []);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            mediaRecorder.current = new MediaRecorder(stream);
            audioChunks.current = [];

            mediaRecorder.current.ondataavailable = (event) => {
                audioChunks.current.push(event.data);
            };

            mediaRecorder.current.onstop = () => {
                const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
                const url = URL.createObjectURL(audioBlob);
                setAudioUrl(url);
            };

            mediaRecorder.current.start();
            recognitionRef.current && recognitionRef.current.start();
            setIsRecording(true);
        } catch (error) {
            console.error("Microphone access error:", error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder.current) {
            mediaRecorder.current.stop();
        }
        recognitionRef.current && recognitionRef.current.stop();
        setIsRecording(false);
    };

    useEffect(() => {
        if (isRecording) {
            startRecording();
        } else {
            // setTextInput(speechToText);
            stopRecording();
            recognitionRef.current && recognitionRef.current.abort();
        }
    }, [isRecording]);

    const handleVoiceInput = () => {
        setIsRecording(!isRecording);
    };

    return {
        handleVoiceInput,
        isRecording,
        error
    }
}