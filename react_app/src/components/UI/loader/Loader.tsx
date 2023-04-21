import React, {FC, ReactNode} from 'react';
import styles from '../../../styles/Loader.module.css';

type Props = {
    children?: ReactNode,
}
const Loader: FC<Props> = ({children}) => {
    return (
        <div className={styles.wrapper}>
            <h4>Loading..&nbsp;</h4>
            <div className={styles.myLoader}>
                {children}
            </div>
        </div>

    );
};

export default Loader;