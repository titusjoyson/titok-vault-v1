import React from "react";
import { Form } from "antd";
import { Switch } from "antd";
import { InputTypes } from "../../../com/const";

function SwitchInput(props) {
    const { defaultValue, onChange, name } = props;

    const defaultChecked = defaultValue === InputTypes.PASSWORD
    return (
        <Form.Item name={name} style={{ marginBottom: 0 }}>
            <Switch
                checkedChildren={"Protected"}
                unCheckedChildren={"Protect"}
                defaultChecked={defaultChecked}
                onChange={(value) => onChange(value)}
            />
        </Form.Item>
    );
}

SwitchInput.defaultProps = {
    defaultValue: null,
};

export default SwitchInput;
