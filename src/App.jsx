import './style/app.scss';
import './style/main.scss';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from './redux/slices/userSlice';

import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';

import { Login, Main, Sidebar } from './components';
import ChatLoader from './components/common/loader/chatLoader';
import { setChats } from './redux/slices/chatsSlice';
import { collection, getDocs } from 'firebase/firestore';

function App() {
    const dispatch = useDispatch();
    const [isFetching, setIsFetching] = useState(true);
    const { chats, currentChat } = useSelector((state) => state.chatsSlice);
    const { user } = useSelector((state) => state.userSlice);
    const chosenDialog = chats.find((obj) => obj.chatId === currentChat);

    useEffect(() => {
        getDocs(collection(db, 'chats')).then((data) => {
            dispatch(setChats(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
        });
    }, []);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const user = {
                    id: currentUser.uid,
                    name: currentUser.displayName,
                    avatar: currentUser.photoURL,
                    email: currentUser.email,
                    token: currentUser.accessToken,
                };

                dispatch(setUser(user));
            }
            setIsFetching(false);
        });
    }, []);

    return (
        <div className="app">
            {isFetching ? (
                <ChatLoader />
            ) : user ? (
                <div className="chat-container">
                    <Sidebar />
                    <Main chosenDialog={chosenDialog} />
                </div>
            ) : (
                <Login />
            )}
        </div>
    );
}

export default App;
