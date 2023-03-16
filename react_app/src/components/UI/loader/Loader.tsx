import React, {ReactNode} from 'react';
import styles from '../../../styles/Loader.module.css';

type Props = {
    children?: ReactNode,
}
const Loader = ({children}: Props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.myLoader}>
                {children}
            </div>
        </div>

    );
};

export default Loader;