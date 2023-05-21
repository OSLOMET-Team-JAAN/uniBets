import React, {FC, ReactNode} from 'react';
import cl from '../../../styles/layout/ErrorModal.module.css';

type Props = {
    visible: boolean,
    setVisible: (b: boolean) => void,
    children: ReactNode,
}

const ErrorModal: FC<Props> = ({visible, setVisible, children}) => {
    return (
        <div 
            className={visible ? [cl.myModal, cl.active].join(' ') : cl.myModal} 
            onClick={() => setVisible(false)}>
            <div
                className={visible ? [cl.modal__content, cl.active].join(' ') : cl.modal__content}
                onClick={e => e.stopPropagation()}>
                <img 
                    alt="modal_pic" 
                    src={require('../../../styles/images/modal_attention.jpeg')}/>
                {children}
            </div>
        </div>
    );
};

export default ErrorModal;