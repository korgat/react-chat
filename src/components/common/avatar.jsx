import Icon from './icons';

const Avatar = ({ avatar, isOnline }) => {
    return (
        <div className="avatar">
            <img src={avatar} alt="avatar" />
            {isOnline && (
                <Icon
                    className="avatar_online"
                    icon="check_circle_outline"
                    size={20}
                    color="#569a3b"
                />
            )}
        </div>
    );
};

export default Avatar;
