import { useEffect, useRef, useState } from "react";

export const useSpeechToText = (props) => {
    const { setTextInput } = props;
    const mediaRecorder = useRef(null);
    const audioChunks = useRef([]);
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
                setIsRecording(false);
            };

            recognitionRef.current = recognitionInstance;

            // Request access to the microphone
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                },
            });

            // Setting up MediaRecorder
            mediaRecorder.current = new MediaRecorder(stream);
            audioChunks.current = [];

            mediaRecorder.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunks.current.push(event.data);
                }
            };

            mediaRecorder.current.onstop = () => {
                const audioBlob = new Blob(audioChunks.current, {
                    type: "audio/ogg; codecs=opus",
                });
                const url = URL.createObjectURL(audioBlob);
                console.log(url)
            };

            // Launching MediaRecorder and SpeechRecognition
            mediaRecorder.current.start();
            recognitionRef.current.start();
            setIsRecording(true);
        } catch (err) {
            console.error("Microphone access error:", err);
            setError(err.message || "Error accessing microphone.");
        }
    };

    const stopRecording = () => {
        // Stopping MediaRecorder
        if (mediaRecorder.current) {
            mediaRecorder.current.stop();
            // Stop all microphone tracks
            mediaRecorder.current.stream.getTracks().forEach((track) => track.stop());
        }
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
            if (mediaRecorder.current) {
                mediaRecorder.current.stream.getTracks().forEach((track) => track.stop());
            }
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