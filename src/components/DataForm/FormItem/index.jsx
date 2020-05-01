import React, { useState } from "react";
import { Button } from "antd";
import { Card, Typography } from "antd";
import { Row, Col } from "antd";
import { DeleteOutlined, CopyOutlined } from "@ant-design/icons";

import TextInput from "../Input";
import SwitchInput from "../Input/switch";

import DraggableWrapper from "../../DND/Draggable";
import { InputTypes } from "../../../com/const";
import { copyToClipboard } from "../../../utils/com";

import "../styles.less";
import "./styles.less";

function FormItem(props) {
    const { data, itemIndex, onDelete, onChange, readOnly } = props;
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
                            readOnly={readOnly}
                            size={"small"}
                            name={`${data.id}-label`}
                            placeholder="Label:"
                            className="form-item-label-input-item"
                            inputClassName="form-item-label-input"
                            defaultValue={data.label}
                            onChange={(value) => onChange(value, "label")}
                        />
                        <Row justify={"start"} align={"middle"}>
                            <Col flex={1}>
                                <TextInput
                                    readOnly={readOnly}
                                    size={"middle"}
                                    name={`${data.id}-secret`}
                                    placeholder="Enter your secret"
                                    type={valueType}
                                    className="form-item-secret-input-item"
                                    inputClassName="form-item-secret-input"
                                    defaultValue={data.value}
                                    onChange={(value) =>
                                        onChange(value, "value")
                                    }
                                />
                            </Col>
                            {!readOnly ? (
                                <SwitchInput
                                    name={`${data.id}-type`}
                                    defaultValue={data.type}
                                    onChange={(value) => {
                                        const type = value
                                            ? InputTypes.PASSWORD
                                            : InputTypes.TEXT;
                                        setValueType(type);
                                        onChange(type, "type");
                                    }}
                                />
                            ) : null}
                        </Row>
                    </Col>
                    <Col align="center" className="input-item-card-right-col">
                        {!readOnly ? (
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
                        ) : (
                            <Button
                                //type="link"
                                shape="circle"
                                icon={
                                    <CopyOutlined
                                        style={{ color: "rgba(0,0,0,.65)" }}
                                    />
                                }
                                onClick={() => copyToClipboard(data.value)}
                            />
                        )}
                    </Col>
                </Row>
            </Card>
        </DraggableWrapper>
    );
}

export default FormItem;
