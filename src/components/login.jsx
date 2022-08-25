import { setUser } from '../redux/slices/userSlice';
import { useDispatch } from 'react-redux';

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';

import Icon from './common/icons';

const Login = () => {
    const dispatch = useDispatch();

    const onLoginClick = async () => {
        const provider = new GoogleAuthProvider();
        const { user: apiUser } = await signInWithPopup(auth, provider);

        const user = {
            id: apiUser.uid,
            name: apiUser.displayName,
            avatar: apiUser.photoURL,
            email: apiUser.email,
        };

        dispatch(setUser(user));
    };

    return (
        <div className="login__container">
            <h2 className="login__title">Use your google email to login</h2>
            <button className="login__btn" onClick={onLoginClick}>
                Login with Google <Icon className="ml-5" icon="google" size={20} />
            </button>
        </div>
    );
};

export default Login;
