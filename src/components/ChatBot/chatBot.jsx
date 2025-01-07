import ChatContext from "../ChatContext/index.js";
import {useChatBot} from "./useChatBot.js";
import classes from './chatBot.module.scss';
import Header from "../Header/index.js";
import Footer from "../Footer/index.js";
import React, {useEffect} from "react";
import BMW from '../../assets/bmw.png';
import KIA from '../../assets/kIA.png';
import HYUNDAI from '../../assets/hYUNDAI.png';
import LOGO from '../../assets/logo.svg';
import CHECK from '../../assets/check.svg';

const OPTIONS = [
    {
        image: KIA,
        title: "רכב Kia Carnival",
        subtitle: "ה-Kia Carnival הוא רכב משפחתי גדול עם הרבה מקום בתא המטען, מה שהופך אותו לאידיאלי למשפחות גדולות. הוא גם חסכוני יחסית בדלק ובעל מנוע חזק",
        descriptions: ["קיה", "150,000 ש\"ח", "200 כ״ס", "13 ק\"מ לליטר", "960 ליטר", "7 מושבים"]
    },
    {
        image: BMW,
        title: "רכב BMW X5",
        subtitle: "ה-BMW X5 הוא רכב יוקרתי עם מנוע חזק מאוד וביצועים גבוהיםֿ\n" +
            "חסכוני יחסית בדלק ומציע הרבה מקום בתא המטען ובתוך הרכב",
        descriptions: ["BMW", "350,000 ש\"ח", "265 כ״ס", "11 ק\"מ לליטר", "650 ליטר", "7 מושבים"]
    },
    {
        image: HYUNDAI,
        title: "רכב Hyundai Santa Fe",
        subtitle: "ה-Hyundai Santa Fe הוא רכב משפחתי אמין עם מנוע חזק וצריכת דלק טובה. מציע הרבה מקום בתא המטען וברכב, מה שהופך אותו לאידיאלי למשפחות גדולות",
        descriptions: ["יונדאי", "150,000 ש\"ח", "185 כ״ס", "12 ק\"מ לליטר", "547 ליטר", "7 מושבים"]
    }
];
const TITLE_DESCRIPTIONS = ["יצרן", "מחיר", "כוח מנוע", "צריכת דלק", "קיבולת תא מטען", "מספר מושבים"];

const ChatBot = props => {
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

    console.log('textInput', textInput)
    console.log('audioUrl', audioUrl)

    const conversationItem = conversation && conversation.length ? conversation.map(({type, message, options}, index) => {
        const messageItem = (
            <div className={classes.chatBot__context_item_message}>
                {type === "bot" ? (
                    <div className={classes.chatBot__context_item_message_image}><img src={LOGO} alt="logo"/></div>
                ) : (
                    null
                    // <div className={classes.chatBot__context_item_message_user}>YOU</div>
                )}
                <div className={classes.chatBot__context_item_message_text}>{message}</div>
            </div>
        )
        return type === "bot" ? (
            <div className={classes.chatBot__context_item} style={{direction: "rtl"}}>
                {messageItem}
                <div className={classes.chatBot_options}>
                    {OPTIONS.map(({image, title, subtitle, descriptions}, index) => (
                        <div className={classes.chatBot_option}>
                            <div
                                className={classes.chatBot_option_image}
                                style={{
                                    backgroundImage: `url(${image})`,
                                    backgroundSize: "contain",
                                    backgroundPosition: "center center",
                                    backgroundRepeat: "no-repeat",
                                }}
                            />
                            <div className={classes.chatBot_option_content}>
                                <p className={classes.chatBot_option_content_title}>{title}</p>
                                <span className={classes.chatBot_option_content_subtitle}>{subtitle}</span>
                                <ul className={classes.chatBot_option_content_descriptions}>
                                    {descriptions.map((item, index) => (
                                        <li key={index}><img src={CHECK}
                                                             alt="check"/><strong>{TITLE_DESCRIPTIONS[index]}</strong>&nbsp;{item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
                <div ref={messagesEndRef}/>
            </div>
        ) : (
            <div className={classes.chatBot__context_item} style={{direction: "ltr"}}>
                {messageItem}
                <div ref={messagesEndRef}/>
            </div>
        )
    }) : null;

    useEffect(() => {
        scrollToBottom();
    }, [conversation]);

    return (
        <div className={classes.chatBot}>
            <Header/>
            <div className={classes.chatBot__content}>
                <div className={classes.chatBot__conversation}>
                    <div className={classes.chatBot__chatBot__conversation_items}>
                        {conversationItem}
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