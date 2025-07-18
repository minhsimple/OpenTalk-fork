import React from "react";
import "/src/css/Input.css";
import { FaPencilAlt } from "react-icons/fa";

const Input = ({
                   label,
                   name,
                   type = "text",
                   value,
                   onChange,
                   placeholder,
                   required = false,
                   editable = false,
                   error,
                   validate = {},
               }) => {
    return (
        <div className="custom-input-wrapper">
            {label && (
                <label htmlFor={name} className="input-label">
                    {label} {required && <span className="required">*</span>}
                </label>
            )}

            <div className="input-container">
                <input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    readOnly={!editable}
                    {...validate}
                    className={`input-field ${error ? "input-error" : ""}`}
                />
                {editable && (
                    <FaPencilAlt className="input-icon-inside" title="Editable" />
                )}
            </div>

            {error && <p className="error-text">{error}</p>}
        </div>
    );
};

export default Input;
