import { startChats } from '../../config/startChat';
import { fetchJoke } from './../actions/chatsActions';
const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
    chats: startChats,
    currentChat: 2,
};

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setChats(state, action) {
            state.chats = action.payload;
        },
        setCurrentChat(state, action) {
            const currentChat = state.chats.find((obj) => obj.chatId === action.payload);
            currentChat.isUnread = false;

            state.currentChat = action.payload;
        },
        setChatMessage(state, action) {
            console.log(action.payload);
            const currentChat = state.chats.find((obj) => obj.chatId === action.payload.chatId);

            currentChat.messages.push(action.payload.message);
            state.chats = state.chats.sort(function (x, y) {
                return x === currentChat ? -1 : y == currentChat ? 1 : 0;
            });
        },
        setWritingStatus(state, action) {
            const currentChat = state.chats.find((obj) => obj.chatId === action.payload.id);

            currentChat.isWriting = action.payload.status;
        },
        setOnlineStatus(state, action) {
            const currentChat = state.chats.find((obj) => obj.chatId === action.payload);

            currentChat.isOnline = true;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchJoke.pending, (state) => {});
        builder.addCase(fetchJoke.fulfilled, (state, action) => {
            const { data, chatId } = action.payload;
            const destinationChat = state.chats.find((obj) => obj.chatId === chatId);
            const chatMessage = {
                mine: false,
                id: destinationChat.id,
                avatar: destinationChat.avatar,
                name: destinationChat.name,
                message: data.value,
                messageDate: new Date().toString(),
            };

            destinationChat.isUnread = true;
            destinationChat.isWriting = false;
            destinationChat.messages.push(chatMessage);

            if (chatId === state.currentChat) {
                destinationChat.isUnread = false;
            }
        });
        builder.addCase(fetchJoke.rejected, (state, action) => {
            console.log('rejected', action.error.name, ':', action.error.message, action);
        });
    },
});

export const { setCurrentChat, setChatMessage, setWritingStatus, setChats, setOnlineStatus } =
    chatsSlice.actions;

export default chatsSlice.reducer;
