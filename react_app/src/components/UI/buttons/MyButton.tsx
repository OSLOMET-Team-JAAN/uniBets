import React, {FC} from 'react';
import styles from '../../../styles/layout/MyButton.module.css';

// classes gives us to receive styles as object properties

interface Props {
    children?: React.ReactNode;
    onClick?: () => void;
    value?: string,
    addStyles?: string | undefined,
    abbr?: string
}

const MyButton: FC<Props> = ({children, addStyles, ...props}) => {
    return (
        <button
            {...props}
            className={[styles.myBtn, addStyles].join(' ')}
        >
            {children}
        </button>
    );
}

export default MyButton;


// How to build custom buttons component
// https://www.twilio.com/blog/intro-custom-button-component-typescript-react