import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../utils/authContext';
import { ModalContext } from '../../hooks/useModal/useModalProvider';
import { AuthorContext } from '../../utils/authorContext';
import { getAuthor } from '../../utils/api';
import Layout from '../../components/layout/layout';
import Avatar from '../../assets/avatar.jpg';
import SpinnerIcon from '../../components/spinnerIcon/spinnerIcon';
import Modal from '../../components/modal/modal';
import styles from './profilePage.module.css';

const ProfilePage = () => {
    const [ user ] = useContext(AuthContext);
    const [ openModal, closeModal ] = useContext(ModalContext);
    const [ author, { setId, setName, setIsLoading, setIsLoadingQuote, setIsError } ] = useContext(AuthorContext);
    const [ isLoadingProfile, setIsLoadingProfile ] = useState(false);
    const [ userName, setUserName ] = useState('');
    const [ qoute, setQuote ] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        setIsLoadingProfile(true);
        if (user.user.fullname) {
            const userName = user.user.fullname.split(' ')[0];
            setIsLoadingProfile(false)
            setUserName(userName)
        }
    }, [user])

    useEffect(() => {
        if (author.name && author.quote) {
            setQuote(`${author.name}: ${author.quote}`)
        }
    }, [author.name, author.quote])

    const stopRequestHandler = () => {
        closeModal();
    }

    const onUpdateHadler = async () => {
        setIsLoadingQuote(true)
        openModal(<Modal cancelHandler={stopRequestHandler} />);
        if (token) {
            fetchAuthor(token)
        }
        else {
            closeModal();
            setIsError(true);
            setIsLoadingQuote(false);
        };
    }

    const fetchAuthor = async (token: string) => {
        setIsLoading(true);
        setIsLoadingQuote(true);
        setTimeout(() => {
            getAuthor(token)
                .then((data) => {
                    setId(data.data.authorId);
                    setName(data.data.name);
                })
                .catch(() => setIsError(true))
                .finally(() => {
                    setIsLoading(false);
                })
        }, 5000)
    }

    return (
        <Layout>
            {isLoadingProfile ? <SpinnerIcon /> :
                <div className={styles.page}>
                    <div className={styles.profile}> 
                        <img className={styles.avatar} src={Avatar} alt='avatar' />
                        <div className={styles.info}>
                            <p className={styles.name}>Welcome, {userName}!</p>
                            <button className={styles.update} onClick={() => onUpdateHadler()}>
                                {author.isError ? 'Error' : 'Update'}
                            </button>
                        </div>
                    </div>
                    <p className={styles.quote}>{qoute}</p>
                </div>
            }
        </Layout>
    )
}

export default ProfilePage;