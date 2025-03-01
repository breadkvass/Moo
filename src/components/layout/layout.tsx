import { FC } from 'react';
import styles from './layout.module.css';

type LayoutProps = {
    children: React.JSX.Element;
}

const Layout: FC<LayoutProps> = ({children}) => {
    return (
        <div className={styles.layout}>
            <div className={styles.buttons}>
                <button className={styles.button}>About us</button>
                <button className={styles.button}>Sign in</button>
                {/* <button className={styles.button}></button> */}
            </div>
            {children}
        </div>
    )
}

export default Layout;