import ChatContext from "../ChatContext/index.js";
import {useChatBot} from "./useChatBot.js";
import classes from './chatBot.module.scss';
import Header from "../Header/index.js";
import Footer from "../Footer/index.js";
import React from "react";

const ChatBot = props => {
    const {
        fetchData,
        textInput,
        setTextInput,
        audioUrl,
        setAudioUrl
    } = useChatBot();

    console.log('textInput', textInput)
    console.log('audioUrl', audioUrl)
    return (
        <div className={classes.chatBot}>
            <Header/>
            <div className={classes.chatBot__content}>
                <div className={classes.chatBot__conversation}/>
                <ChatContext
                    fetchData={fetchData}
                    textInput={textInput}
                    setTextInput={setTextInput}
                    audioUrl={audioUrl}
                    setAudioUrl={setAudioUrl}
                />
            </div>
            <Footer/>
        </div>
    )
}

export default ChatBot;