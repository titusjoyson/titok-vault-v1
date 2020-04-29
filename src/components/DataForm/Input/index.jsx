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
        readOnly
    } = props;
    const { defaultValue, onBlur } = props;

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
        <Form.Item 
            name={name} 
            label={label} 
            className={className}
        >
            <FormInput
                name={`name-${name}`}
                placeholder={placeholder}
                addonAfter={addonAfter}
                className={inputClassName}
                autoComplete={"new-password"}
                defaultValue={defaultValue}
                onBlur={()=>onBlur()}
                size={props.size || "middle"}
                readOnly={readOnly}
            />
        </Form.Item>
    );
}

export default TextInput;
