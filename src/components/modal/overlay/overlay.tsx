import styles from './overlay.module.css';
import { FC, ReactElement, SyntheticEvent } from "react";

type OverlayProps = {
    closeHandler: Function;
    children: ReactElement;
}

const Overlay: FC<OverlayProps> = ({closeHandler, children}) => {
    const onClickHandler = (e: SyntheticEvent<Element, Event>) => {
        e.stopPropagation();
        closeHandler();
    }

    return (
        <div className={styles.overlay} onClick={onClickHandler}>
            {children}
        </div>
    )
}

export default Overlay;