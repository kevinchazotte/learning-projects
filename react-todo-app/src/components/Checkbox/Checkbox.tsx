import "./Checkbox.css"

import React from 'react';

interface CheckboxProps {
    checked: boolean;
    onChange?: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newCheckedState = event.target.checked;
        if (onChange) {
            onChange(newCheckedState);
        }
    };

    return (
        <input className="custom-checkbox" type="checkbox" checked={checked} onChange={handleChange}/>
    );
};

export default Checkbox;
