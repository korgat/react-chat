import style from './chatLoader.module.scss';
import loaderImg from '../../../img/chatLoader.png';

const ChatLoader = () => {
    return <img id={style.chatLoader} src={loaderImg} alt="" />;
};

export default ChatLoader;
