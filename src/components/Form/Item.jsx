import React from "react";
import { Form, Input } from "antd";

import "./styles.less";

function FormItem(props) {
    const { title, label, placeholder, addonAfter, type } = props;
    var FormInput = Input;
    if (type === "password"){
        FormInput = Input.Password
    }

    return (
        <Form.Item name={title} label={label} className="form-item">
            <FormInput placeholder={placeholder} addonAfter={addonAfter}/>
        </Form.Item>
    );
}

export default FormItem;
