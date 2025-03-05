import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../utils/authContext';
import Layout from '../../components/layout/layout';
import Avatar from '../../assets/avatar.jpg';
import SpinnerIcon from '../../components/spinnerIcon/spinnerIcon';
import Modal from '../../components/modal/modal';
import { ModalContext } from '../../hooks/useModal/useModalProvider';
import styles from './profilePage.module.css';

const ProfilePage = () => {
    const [ user ] = useContext(AuthContext);
    const [ openModal, closeModal ] = useContext(ModalContext);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ userName, setUserName ] = useState('');

    useEffect(() => {
        setIsLoading(true);
        if (user.user.fullname) {
            const userName = user.user.fullname.split(' ')[0];
            setIsLoading(false)
            setUserName(userName)
        }
    }, [user])

    const stopRequestHandler = () => {
        closeModal();
    }

    const onUpdateHadler = () => {
        openModal(
            <Modal closeHandler={closeModal} cancelHandler={stopRequestHandler} />
        )
    }

    return (
        <Layout>
            {isLoading ? <SpinnerIcon /> :
                <div className={styles.page}>
                    <div className={styles.profile}> 
                        <img className={styles.avatar} src={Avatar} alt='avatar' />
                        <div className={styles.info}>
                            <p className={styles.name}>Welcome, {userName}!</p>
                            <button className={styles.update} onClick={() => onUpdateHadler()}>Update</button>
                        </div>
                    </div>
                    <p className={styles.quote}></p>
                </div>
            }
        </Layout>
    )
}

export default ProfilePage;