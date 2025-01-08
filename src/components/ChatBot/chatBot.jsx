import React from "react";
import ChatContext from "../ChatContext/index.js";
import {useChatBot} from "./useChatBot.js";
import classes from './chatBot.module.scss';
import Header from "../Header/index.js";
import Footer from "../Footer/index.js";
import Conversation from "../Conversation/index.js";

const ChatBot = () => {
    const {
        conversation,
        fetchData,
        textInput,
        setTextInput,
        audioUrl,
        setAudioUrl,
        messagesEndRef,
        scrollToBottom
    } = useChatBot();

    const conversationItems = conversation && conversation.length ? conversation.map(({type, message, cars}, index) => (
        <Conversation
            key={index}
            ind={index}
            ref={messagesEndRef}
            type={type}
            message={message}
            cars={cars}
            classes={classes}
        />
    )) : null;

    React.useEffect(() => {
        scrollToBottom();
    }, [conversation]);

    return (
        <div className={classes.chatBot}>
            <Header/>
            <div className={classes.chatBot__content}>
                <div className={classes.chatBot__conversation}>
                    <div className={classes.chatBot__chatBot__conversation_items}>
                        {conversationItems}
                    </div>
                </div>
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