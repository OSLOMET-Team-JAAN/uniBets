import React, {FC} from 'react';
import st from '../../../styles/layout/DangerButton.module.css';

// classes gives us to receive styles as object properties

interface Props {
    children?: React.ReactNode;
    onClick?: () => void;
    value?: string,
    abbr?: string
}

const MyDangerButton: FC<Props> = ({children, ...props}) => {
    return (
        <>
            <button className={st.myDangerBtn} {...props}>
                {children}
            </button>
        </>

    );
}

export default MyDangerButton;


// How to build custom buttons component
// https://www.twilio.com/blog/intro-custom-button-component-typescript-react