import { FC, useContext } from 'react';
import styles from './layout.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/authContext';
import { logout } from '../../utils/api';
import SpinnerIcon from '../spinnerIcon/spinnerIcon';

type LayoutProps = {
    children: React.JSX.Element;
}

const Layout: FC<LayoutProps> = ({children}) => {
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const [ user, { setUser, setIsAuth, setIsLoading, setIsError } ] = useContext(AuthContext);
    const token = localStorage.getItem('token');

    const route = (path: string) => {
        if (pathname !== path) {
            navigate(path);
        } else return
    }

    const signInHandler = () => {
        if (user.isAuth) {
            route('/profile')
        } else route('/login')
    }

    const logoutHandler = () => {
        setIsLoading(true);
        if (token) {
            logout(token)
                .then(() => {
                    setIsAuth(false);
                    setUser({
                        email: '',
                        fullname: ''
                    });
                })
        } else {
            setIsError(true);
        }
        setIsLoading(false)
    }

    return (
        <div className={styles.layout}>
            <div className={styles.buttons}>
                <button className={styles.button} onClick={() => route('/')}>About us</button>
                <button className={styles.button} onClick={signInHandler}>
                    {user.isAuth ? 'Profile' : 'Sign in'}
                </button>
                {user.isAuth && <button className={styles.button} onClick={() => logoutHandler()} disabled={!user.isAuth}>
                    {user.isError ? 'Error' : 'Sign out'}
                </button>}
                {user.isLoading && <SpinnerIcon spinnerStyle={styles.spinner}/>}
            </div>
            {children}
        </div>
    )
}

export default Layout;