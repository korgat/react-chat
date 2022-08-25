import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeUser } from '../redux/slices/userSlice';
import { auth } from './../firebase';

import { Avatar, Icon } from './common';
import { SidebarUser } from './';

const Sidebar = () => {
    const dispatch = useDispatch();
    const { chats, currentChat } = useSelector((state) => state.chatsSlice);
    const [searchValue, setSearchValue] = useState('');

    const filteredChats = chats.filter((obj) =>
        obj.name.toLowerCase().includes(searchValue.toLowerCase()),
    );

    const onLogoutClick = () => {
        auth.signOut();
        dispatch(removeUser());
    };

    return (
        <div className="chat-sidebar">
            <div className="chat-sidebar__top">
                <div className="chat-sidebar__top-user">
                    <Avatar avatar="./temp/ava.jpg" isOnline={true} />
                    <button onClick={onLogoutClick}>Logout</button>
                </div>
                <div className="chat-sidebar__top-search">
                    <input
                        onChange={(e) => setSearchValue(e.currentTarget.value)}
                        value={searchValue}
                        type="text"
                        placeholder="Search or start new chat"
                    />
                    <Icon className="search-icon" icon="search" size={16} color="#878787" />
                </div>
            </div>
            <div className="chat-sidebar__users">
                <h2 className="chat-sidebar__title">Chats</h2>
                {filteredChats.map((obj, i) => {
                    return <SidebarUser key={obj.chatId} selectedChatId={currentChat} {...obj} />;
                })}
            </div>
        </div>
    );
};

export default Sidebar;
