import React, { userState } from "react";
import { Button } from "antd";
import { Card, Typography } from "antd";
import { Row, Col } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import uuid from "uuid";

import TextInput from "../Input";
import SelectInput from "../Input/select";

import DraggableWrapper from "../../DND/Draggable";
import { InputTypes } from "../../../com/const";

import "../styles.less";
import "./styles.less";

const options = [
    { id: 1, value: InputTypes.PASSWORD, text: "Password" },
    { id: 2, value: InputTypes.TEXT, text: "Text" },
];

function FormItem(props) {
    const { data, itemIndex, onDelete, onChange } = props;
    const rowNumber = itemIndex + 1;

    function onValueChange(value, type) {
        let newData = { ...data };
        switch (type) {
            case "label":
                newData.label = value;
                break;
            case "secret":
                newData.value = value;
                break;
            case "type":
                newData.type = value;
                break;
            default:
                break;
        }
        //onChange(newData);
    }

    return (
        <DraggableWrapper
            data={data}
            itemIndex={itemIndex}
            Component={() => (
                <Card className="input-item-card">
                    <Row justify={"start"} align={"middle"}>
                        <Col
                            className="input-item-card-left-col"
                            align={"start"}
                        >
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
                                onChange={(value) =>
                                    onValueChange(value, "label")
                                }
                            />
                            <Row justify={"start"} align={"middle"}>
                                <Col flex={1}>
                                    <TextInput
                                        name={`${data.id}-secret`}
                                        placeholder="Enter your secret"
                                        type={data.type}
                                        className="form-item-secret-input-item"
                                        inputClassName="form-item-secret-input"
                                        onChange={(value) =>
                                            onValueChange(value, "secret")
                                        }
                                    />
                                </Col>
                                <SelectInput
                                    name={`${data.id}-type`}
                                    options={options}
                                    defaultValue={data.type}
                                    onChange={(value) =>
                                        onValueChange(value, "type")
                                    }
                                />
                            </Row>
                        </Col>
                        <Col
                            align="center"
                            className="input-item-card-right-col"
                        >
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
            )}
        />
    );
}

export default FormItem;
