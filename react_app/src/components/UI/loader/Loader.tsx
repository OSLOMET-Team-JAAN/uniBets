import React, {FC, ReactNode} from 'react';
import styles from '../../../styles/Loader.module.css';

const Loader: FC = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.myLoader}>
                <img
                    className={styles.ball}
                    alt="ball"
                    src={require('../../../styles/images/ball.png')}
                />
            </div>
        </div>

    );
};

export default Loader;