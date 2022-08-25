import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChatMessage } from '../redux/slices/chatsSlice';
import { fetchJoke } from '../redux/actions/chatsActions';

import { db } from '../firebase';
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';

import { Avatar, Icon } from './common';
import { Message } from './';

const Main = ({ chosenDialog }) => {
    const dispatch = useDispatch();
    const messagesEndRef = useRef(null);
    const { user } = useSelector((state) => state.userSlice);
    const [message, setMessage] = useState('');

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chosenDialog]);

    const onSendMessageClick = () => {
        const trimMessage = message.trim();
        if (trimMessage === '') {
            return;
        }

        const chatMessage = {
            mine: true,
            userId: user.id,
            avatar: user.avatar,
            name: user.name,
            message: message,
            messageDate: new Date().toString(),
        };

        const chatItem = {
            chatId: chosenDialog.chatId,
            name: chosenDialog.name,
            avatar: chosenDialog.avatar,
            isUnread: false,
            isOnline: true,
            isWriting: false,
            messages: [chatMessage],
        };

        if (!chosenDialog.messages.length) {
            setDoc(doc(db, 'chats', chosenDialog.chatId.toString()), chatItem)
                .then(() => {
                    dispatch(
                        setChatMessage({
                            chatId: chosenDialog.chatId,
                            message: chatMessage,
                        }),
                    );
                    dispatch(fetchJoke(chosenDialog));
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            updateDoc(doc(db, 'chats', chosenDialog.chatId.toString()), {
                messages: arrayUnion(chatMessage),
            })
                .then(() => {
                    dispatch(
                        setChatMessage({
                            chatId: chosenDialog.chatId,
                            message: chatMessage,
                        }),
                    );
                    dispatch(fetchJoke(chosenDialog));
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        setMessage('');
    };

    return (
        <div className="chat-dialog">
            <div className="chat-dialog__top">
                <Avatar avatar={chosenDialog.avatar} isOnline={true} />
                <span>Sasha Vaseliuk</span>
            </div>

            <div className="chat-dialog__window">
                {chosenDialog.messages.map((obj, i) => {
                    return <Message key={obj.name + i} {...obj} />;
                })}
                {chosenDialog.isWriting && (
                    <Message avatar={chosenDialog.avatar} message="Writing..." />
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-dialog__bottom">
                <div className="chat-dialog__bottom-input">
                    <input
                        onChange={(e) => setMessage(e.currentTarget.value)}
                        value={message}
                        placeholder="Type your message"
                        type="text"
                        onKeyUp={(e) => e.code === 'Enter' && onSendMessageClick()}
                    />
                    <Icon
                        onClick={onSendMessageClick}
                        className="send-icon"
                        icon="send"
                        size={20}
                        color="#000"
                    />
                </div>
            </div>
        </div>
    );
};

export default Main;
