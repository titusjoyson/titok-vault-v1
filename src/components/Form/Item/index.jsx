import React from "react";
import { Form, Input } from "antd";

function FormItem(props) {
    let {
        title,
        label,
        name,
        placeholder,
        addonAfter,
        type,
        className,
        inputClassName,
        value
    } = props;
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
        <Form.Item name={title} label={label} className={className}>
            <FormInput
                placeholder={placeholder}
                addonAfter={addonAfter}
                className={inputClassName}
                autoComplete="off"
                value={value}
                name={name}
            />
        </Form.Item>
    );
}

export default FormItem;
