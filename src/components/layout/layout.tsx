import { FC } from 'react';
import styles from './layout.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

type LayoutProps = {
    children: React.JSX.Element;
}

const Layout: FC<LayoutProps> = ({children}) => {
    const navigate = useNavigate();
    const pathname = useLocation().pathname;

    const route = (path: string) => {
        if (pathname !== path) {
            navigate(path);
        } else return
    }

    return (
        <div className={styles.layout}>
            <div className={styles.buttons}>
                <button className={styles.button} onClick={() => route('/')}>About us</button>
                <button className={styles.button} onClick={() => route('/login')}>Sign in</button>
                {/* <button className={styles.button}></button> */}
            </div>
            {children}
        </div>
    )
}

export default Layout;