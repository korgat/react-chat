import { setOnlineStatus, setWritingStatus } from '../slices/chatsSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getJoke } from '../../API/chatsAPI';

import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export const fetchJoke = createAsyncThunk('chats/getJoke', async (chosenDialog, { dispatch }) => {
    const { chatId, avatar, name } = chosenDialog;
    setTimeout(() => {
        dispatch(setOnlineStatus(chatId));
        dispatch(setWritingStatus({ id: chatId, status: true }));
    }, 3000);

    await new Promise(function (resolve) {
        setTimeout(resolve, 8000);
    });

    const { data } = await getJoke();

    updateDoc(doc(db, 'chats', chatId.toString()), {
        messages: arrayUnion({
            mine: false,
            userId: chatId,
            avatar: avatar,
            name: name,
            message: data.value,
            messageDate: new Date().toString(),
        }),
    });

    return { data, chatId };
});
