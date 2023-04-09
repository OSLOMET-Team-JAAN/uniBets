import React, {ReactNode} from 'react';
import cl from "../../../styles/InfoModal.module.css";


type Props = {
    visible: boolean,
    setVisible: (b: boolean) => void,
    children: ReactNode,
}


const InfoModal = ({visible, setVisible, children}: Props) => {
    return (
        <div className={visible ? [cl.myModal, cl.active].join(' ') : cl.myModal} onClick={() => setVisible(false)}>
            <div
                className={visible ? [cl.modal__content, cl.active].join(' ') : cl.modal__content}
                onClick={e => e.stopPropagation()}>
                <img alt="modal_pic" src={require('../../../styles/images/confirm.jpg')}/>
                {children}
            </div>
        </div>
    );
};

export default InfoModal;