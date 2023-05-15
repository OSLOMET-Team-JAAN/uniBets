import React, { FC, ReactNode, useState } from 'react';
import style from '../../../styles/TipButton.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

type Tips = {
    title: string,
    children?: ReactNode,
}

type TipCont = {
    children?: ReactNode,
}

const TipButton: FC<Tips> = ({ title, children }) => {
    const [showHelp, setShowHelp] = useState<boolean>(false);
    const toggleHelp = () => {
        setShowHelp(!showHelp);
    }

    const TipButtonContainer: FC<TipCont> = ({ children }) => {
        return (
            <div 
                className={style.tipContainer}>
                {children}
            </div>
        )
    }
    return (
        <TipButtonContainer>
            <button
                className={style.tipButton}
                onClick={toggleHelp}
                aria-describedby="tip"
            >
                {!showHelp && <FontAwesomeIcon icon={faInfoCircle} />}
                {showHelp && (
                    <div id="tip" className={`${style.helpNote} ${showHelp ? style.show : ''}`}>
                    <span style={{ fontWeight: "bolder" }}
                    >
                        <FontAwesomeIcon icon={faInfoCircle} />&nbsp;
                        {title}
                    </span>
                        {children}
                    </div>
                )}
            </button>
        </TipButtonContainer>
    );
};

export default TipButton;
