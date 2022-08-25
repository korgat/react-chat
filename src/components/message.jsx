import cn from 'classnames';

import { Avatar } from './common';

const Message = ({ mine, message, avatar, messageDate }) => {
    if (messageDate) {
        messageDate = Intl.DateTimeFormat('en', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        }).format(new Date(messageDate));
    }

    return (
        <div className={cn('window-message', { 'window-message-my': mine })}>
            {!mine && (
                <div className="window-message__img">
                    <Avatar avatar={avatar} />
                </div>
            )}
            <div className="window-message__text">
                {message}
                {messageDate && <div className="window-message__date">{messageDate}</div>}
            </div>
        </div>
    );
};

export default Message;
