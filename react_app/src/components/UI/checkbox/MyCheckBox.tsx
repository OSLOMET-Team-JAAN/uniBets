import React, {FC, MutableRefObject, ReactNode} from 'react';
import styles from '../../../styles/MyCheckBox.module.css';

interface Props {
    id?: string;
    type: string;
    value: string;
    onChange?: (e:any) => void;
    onClick?: () => void;
    checked: boolean,
    label?: string
}

const MyCheckBox: FC<Props> = ({...props}) => {
    return (
        <div>
            <input
                id={props.id}
                type="checkbox"
            />
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    );
};

export default MyCheckBox;