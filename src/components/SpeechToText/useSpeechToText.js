import { useEffect, useRef, useState } from "react";

export const useSpeechToText = (props) => {
    const { setTextInput } = props;
    const recognitionRef = useRef(null);
    const inputRef = useRef(null);

    const [isRecording, setIsRecording] = useState(false);
    const [error, setError] = useState(null);
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    const startRecording = async () => {
        try {
            // Checking SpeechRecognition support
            if (!SpeechRecognition) {
                setError("Speech Recognition is not supported in this browser.");
                console.error("Speech Recognition is not supported in this browser.");
                return;
            }

            // Initializing SpeechRecognition
            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.continuous = true;
            recognitionInstance.interimResults = true;
            recognitionInstance.lang = "he-IL";

            recognitionInstance.onresult = (event) => {
                const text = Array.from(event.results)
                    .map((result) => result[0].transcript)
                    .join("");
                setTextInput(text);
            };

            recognitionInstance.onerror = (event) => {
                console.error("Speech recognition error:", event.error);
                setError(`Speech recognition error: ${event.error}`);
                // setIsRecording(false);
            };

            recognitionRef.current = recognitionInstance;
            recognitionRef.current.start();
            setIsRecording(true);
        } catch (err) {
            console.error("Microphone access error:", err);
            setError(err.message || "Error accessing microphone.");
        }
    };

    const stopRecording = () => {
        // Stop SpeechRecognition
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        setIsRecording(false);
    };

    const toggleRecording = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    const handleInput = e => {
        const input = inputRef.current;
        const length = e.target.value.length;
        input.setSelectionRange(length, length);
    }

    useEffect(() => {
        // Cleaning up resources when unmounting
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    return {
        inputRef,
        isRecording,
        setIsRecording,
        error,
        handleInput,
        toggleRecording,
    };
};