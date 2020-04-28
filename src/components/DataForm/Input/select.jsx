import React from "react";
import { Select, Form } from "antd";

const { Option } = Select;

function SelectInput(props) {
    const { options, defaultValue, onChange, name } = props;
    return (
        <Form.Item name={name} style={{marginBottom: 0}}>
            <Select
                defaultValue={defaultValue || options[0].value}
                style={{ width: 110 }}
                onChange={(value)=>onChange(value)}
            >
                {options.map((data, idx) => (
                    <Option value={data.value} key={idx}>
                        {data.text}
                    </Option>
                ))}
            </Select>
        </Form.Item>
    );
}

SelectInput.defaultProps = {
    defaultValue: null,
};

export default SelectInput;
