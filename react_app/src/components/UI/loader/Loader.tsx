import React, {FC, ReactNode} from 'react';
import styles from '../../../styles/Loader.module.css';

type Props = {
    children?: ReactNode,
    process?: string
}
const Loader: FC<Props> = ({children, process}) => {
    return (
        <div className={styles.wrapper}>
            <h4>{process}&nbsp;</h4>
            <div className={styles.myLoader}>
                {children}
            </div>
        </div>

    );
};

export default Loader;