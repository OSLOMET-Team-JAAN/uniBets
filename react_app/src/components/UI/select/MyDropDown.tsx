import React from 'react';
import styles from '../../../styles/MyDropDown.module.css';

interface Props {
    defaultValue: string,
    options: IOption[],
    value: any,
    name?: string,
    onChange: (a: any) => void
}

interface IOption {
    value: any
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
                <option 
                    value=""
                    disabled
                >
                    {defaultValue}
                </option>
                {options.map((option, index) =>
                    <option
                        key={index}
                        value={option.value}>
                        {option.label}
                    </option>
                )}
            </select>
        </div>


    );
};

export default MyDropDown;

