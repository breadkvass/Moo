import { useEffect, useCallback, SyntheticEvent, FC, useContext, useState } from 'react';
import { AuthorContext } from '../../utils/authorContext';
import { getQuote } from '../../utils/api';
import { ModalContext } from '../../hooks/useModal/useModalProvider';
import Overlay from './overlay/overlay';
import styles from "./modal.module.css";

type ModalProps = {
    cancelHandler: () => void;
}

const stopPropagation = (e: SyntheticEvent<Element, Event>) => e.stopPropagation();

const Modal: FC<ModalProps> = ({cancelHandler}) => {
    const [ author, { setQuote, setIsLoadingQuote } ] = useContext(AuthorContext);
    const [ , closeModal ] = useContext(ModalContext);
    const [ isError, setIsError ] = useState(false);
    const token = localStorage.getItem('token');

    const escHandler = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") {
            e.stopPropagation();
            closeModal();
        }
    }, []);

    const fetchQuote = (token: string, authorId: number) => {
        setIsLoadingQuote(true)
        setTimeout(() => {
            getQuote(token, authorId)
                .then((data) => setQuote(data.data.quote))
                .catch(() => setIsError(true))
                .finally(() => setIsLoadingQuote(false))
        }, 5000)
    }

    useEffect(() => {
        document.addEventListener("keydown", escHandler, false);

        return () => {
            document.removeEventListener("keydown", escHandler, false);
        };

    }, [escHandler]);

    useEffect(() => {
        if (!author.isLoading && token && author.id) {
            fetchQuote(token, author.id)
        }
    }, [author.isLoading])

    useEffect(() => {
        if (!author.isLoadingQuote) {
            closeModal()
        }
    }, [author.isLoadingQuote])
    
    return (
        <Overlay closeHandler={() => closeModal()}>
            <div className={styles.modal} onClick={stopPropagation}>
                <h2 className={styles.title}>Requesting the quote</h2>
                <div className={styles.request}>
                    <p className={styles.text}>Step 1: Requesting author..</p>
                    {!author.isLoading && <p className={styles.text}>Completed</p>}
                </div>
                <div className={styles.request}>
                    <p className={styles.text}>Step 2: Requesting quote..</p>
                    <p className={styles.text}>
                        {isError && 'Error'}
                        {!author.isLoadingQuote && !isError && 'Completed'}
                    </p>
                </div>
                <button className={styles.cancel} onClick={cancelHandler}>Cancel</button>
            </div>
        </Overlay>
    );
}

export default Modal;