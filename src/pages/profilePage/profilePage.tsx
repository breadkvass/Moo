import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../utils/authContext';
import Layout from '../../components/layout/layout';
import Avatar from '../../assets/avatar.jpg';
import SpinnerIcon from '../../components/spinnerIcon/spinnerIcon';
import styles from './profilePage.module.css';

const ProfilePage = () => {
    const [ user ] = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    const userName = user.user.fullname.split(' ')[0];

    useEffect(() => {
        setIsLoading(true);
        if (user.user.fullname) setIsLoading(false)
    }, [user])

    return (
        <Layout>
            {isLoading ? <SpinnerIcon spinnerStyle='' /> :
                <div className={styles.page}>
                    <div className={styles.profile}> 
                        <img className={styles.avatar} src={Avatar} alt='avatar' />
                        <div className={styles.info}>
                            <p className={styles.name}>Welcome, {userName}!</p>
                            <button className={styles.update}>Update</button>
                        </div>
                    </div>
                    <p className={styles.quote}></p>
                </div>
            }
        </Layout>
    )
}

export default ProfilePage;