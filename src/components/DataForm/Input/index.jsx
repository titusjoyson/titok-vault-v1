import React from "react";
import { Form, Input } from "antd";

function TextInput(props) {
    let {
        name,
        label,
        placeholder,
        addonAfter,
        type,
        className,
        inputClassName,
    } = props;
    const { initialValue, onChange } = props;

    var FormInput = Input;
    if (type === "password") {
        FormInput = Input.Password;
    }
    if (className){
        className = "form-item " + className
    }else{
        className = "form-item"
    }
    return (
        <Form.Item name={name} label={label} className={className}>
            <FormInput
                placeholder={placeholder}
                addonAfter={addonAfter}
                className={inputClassName}
                autoComplete="off"
                initialValue={initialValue}
                onChange={(e)=>onChange(e.target.value)}
            />
        </Form.Item>
    );
}

export default TextInput;
