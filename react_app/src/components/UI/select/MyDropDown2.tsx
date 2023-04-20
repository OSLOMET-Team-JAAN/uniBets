import React, { FC } from 'react';

type Option = {
    value: {
        order: string;
        orderBy: string;
    };
    label: string;
};

type Props = {
    options: Option[];
    value: Option['value'];
    defaultValue: string;
    onChange: (value: Option['value']) => void;
};

const MyDropDown2: FC<Props> = ({ options, defaultValue, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = options.find((option) => option.label === e.target.value)?.value;
        if (selectedValue) {
            onChange(selectedValue);
        }
    };

    return (
        <select 
            value={defaultValue} 
            onChange={handleChange}>
            <option 
                value={defaultValue} 
                disabled>
                {defaultValue}
            </option>
            {options.map(({ label }) => (
                <option 
                    key={label} 
                    value={label}>
                    {label}
                </option>
            ))}
        </select>
    );
};

export default MyDropDown2;