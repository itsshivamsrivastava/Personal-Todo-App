import React from 'react';
import './Input.css';

const Input = ({ label, type = 'text', value, onChange, placeholder, maxLength, required, className, icon }) => {
    return (
        <div className={`custom-input-group ${className || ''}`}>
            {icon && <span className="custom-input-icon">{icon}</span>}
            <input
                id={label}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                maxLength={maxLength}
                required={required}
                className="custom-input"
                autoComplete="off"
            />
        </div>
    );
};

export default Input;