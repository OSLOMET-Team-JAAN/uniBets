import React from 'react';
import styles from '../../../styles/MyDropDown.module.css';

interface Props {
    defaultValue: string
    options: IOption[]
    value: any
    onChange: (a: any) => void
}

interface IOption {
    value: string | number
    label: string
}

const MyDropDown = ({options, defaultValue, value, onChange}: Props) => {
    return (
        <div>
            <select
                className={styles.mySelect}
                //double binding by value and onChange
                value={value}
                //onChange(event.target.value) - choosing user
                onChange={event => onChange(event.target.value)}
            >
                <option value=""
                        disabled
                >
                    {defaultValue}
                </option>
                {options.map(option =>
                    <option
                        key={option.value}
                        value={option.value}>
                        {option.label}
                    </option>
                )}
            </select>
        </div>


    );
};

export default MyDropDown;

