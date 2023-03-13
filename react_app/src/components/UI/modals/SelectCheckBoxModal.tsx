import React, {ReactElement, ReactNode} from 'react';
import cl from '../../../styles/SelectCheckBoxModal.module.css';

type Props = {
    visible: boolean,
    setVisible: (b: boolean) => void,
    children?: any
}

const SelectCheckBoxModal = ({visible, setVisible, children}: Props) => {
    return (
        <div className={visible ? [cl.myModalWindow, cl.active].join(' ') : cl.myModalWindow} onClick={() => setVisible(false)}>
            <div
                className={visible ? [cl.modal__content, cl.active].join(' ') : cl.modal__content}
                onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default SelectCheckBoxModal;