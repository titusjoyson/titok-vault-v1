import React, { useState } from "react";
import { Button } from "antd";
import { Card, Typography } from "antd";
import { Row, Col } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import TextInput from "../Input";
import SelectInput from "../Input/select";

import DraggableWrapper from "../../DND/Draggable";
import { InputTypes } from "../../../com/const";

import "../styles.less";
import "./styles.less";

const options = [
    { id: 1, value: InputTypes.PASSWORD, text: "Protected" },
    { id: 2, value: InputTypes.TEXT, text: "Text" },
];

function FormItem(props) {
    const { data, itemIndex, onDelete, onBlur } = props;
    const rowNumber = itemIndex + 1;

    const [valueType, setValueType] = useState(data.type);

    return (
        <DraggableWrapper draggableId={data.id} itemIndex={itemIndex}>
            <Card className="input-item-card">
                <Row justify={"start"} align={"middle"}>
                    <Col className="input-item-card-left-col" align={"start"}>
                        <Typography.Text className="input-item-card-left-col-text">
                            {rowNumber}.
                        </Typography.Text>
                    </Col>
                    <Col className="input-item-card-middle-col">
                        <TextInput
                            name={`${data.id}-label`}
                            placeholder="Label:"
                            className="form-item-label-input-item"
                            inputClassName="form-item-label-input"
                            defaultValue={data.label}
                            onBlur={() => onBlur()}
                        />
                        <Row justify={"start"} align={"middle"}>
                            <Col flex={1}>
                                <TextInput
                                    name={`${data.id}-secret`}
                                    placeholder="Enter your secret"
                                    type={valueType}
                                    className="form-item-secret-input-item"
                                    inputClassName="form-item-secret-input"
                                    defaultValue={data.value}
                                    onBlur={() => onBlur()}
                                />
                            </Col>
                            <SelectInput
                                name={`${data.id}-type`}
                                options={options}
                                defaultValue={data.type}
                                onChange={(value) => {
                                    setValueType(value);
                                    onBlur();
                                }}
                            />
                        </Row>
                    </Col>
                    <Col align="center" className="input-item-card-right-col">
                        <Button
                            type="link"
                            shape="circle"
                            icon={
                                <DeleteOutlined
                                    style={{ color: "rgba(0,0,0,.65)" }}
                                />
                            }
                            onClick={() => onDelete(data.id)}
                        />
                    </Col>
                </Row>
            </Card>
        </DraggableWrapper>
    );
}

export default FormItem;
