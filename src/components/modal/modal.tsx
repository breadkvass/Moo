
import { useEffect, useCallback, SyntheticEvent, FC } from 'react';
import Overlay from './overlay/overlay';
import styles from "./modal.module.css";

type ModalProps = {
    title?: string;
    closeHandler: () => void;
    cancelHandler: () => void;
}

const stopPropagation = (e: SyntheticEvent<Element, Event>) => e.stopPropagation();

const Modal: FC<ModalProps> = ({closeHandler, cancelHandler}) => {
    const escHandler = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") {
            e.stopPropagation();
            closeHandler;
        }
    }, []);
    
    useEffect(() => {
        document.addEventListener("keydown", escHandler, false);

        return () => {
            document.removeEventListener("keydown", escHandler, false);
        };

    }, [escHandler]);

    return (
        <Overlay closeHandler={closeHandler}>
            <div className={styles.modal} onClick={stopPropagation}>
                <h2 className={styles.title}>Requesting the quote</h2>
                <div className={styles.request}>
                    <p className={styles.text}>Step 1: Requesting author..</p>
                    <p className={styles.text}>Completed</p>
                </div>
                <div className={styles.request}>
                    <p className={styles.text}>Step 2: Requesting quote..</p>
                    <p className={styles.text}>Completed</p>
                </div>
                <button className={styles.cancel} onClick={cancelHandler} >Cancel</button>
            </div>
        </Overlay>
    );
}

export default Modal;
