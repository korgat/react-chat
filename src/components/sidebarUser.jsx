import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { setCurrentChat } from '../redux/slices/chatsSlice';

import Avatar from './common/avatar';

const SidebarUser = ({ avatar, isOnline, isUnread, name, messages, selectedChatId, chatId }) => {
    const dispatch = useDispatch();
    let transformDate = '';
    let message = '';

    if (messages.length) {
        const lastMessageDate = messages[messages.length - 1].messageDate;
        transformDate = Intl.DateTimeFormat('en', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        }).format(new Date(lastMessageDate));
        message = messages[messages.length - 1].message;
    }

    return (
        <div
            onClick={() => {
                dispatch(setCurrentChat(chatId));
            }}
            className={cn('user-block__container', {
                'user-block__container--active': selectedChatId === chatId,
            })}>
            <div className="user-block ">
                <div className="user-block__image">
                    <Avatar avatar={avatar} isOnline={isOnline} />
                </div>
                <div className="user-block__info">
                    <div className="user-block__name">{name}</div>
                    <div
                        className={cn('user-block__message', {
                            'user-block__message--unread': isUnread,
                        })}>
                        {message.length > 50 ? message.slice(0, 50) + '...' : message}
                    </div>
                </div>
                <div className="user-block__date">{transformDate}</div>
            </div>
        </div>
    );
};

export default SidebarUser;
