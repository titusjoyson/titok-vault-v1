import React from "react";
import { Select, Button } from "antd";
import { Card, Typography } from "antd";
import { Row, Col } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import TextInput from "../Input";
import DraggableWrapper from "../../DND/Draggable";

import "../styles.less";
import "./styles.less";

const { Option } = Select;

const selectAfter = (
    <Select defaultValue="password" className="select-after">
        <Option value="password">Secret</Option>
        <Option value="text">Text</Option>
    </Select>
);

function FormItem(props) {
    const { data, itemIndex } = props;
    const rowNumber = itemIndex + 1;
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
                                name={"label"}
                                label={null}
                                placeholder="Label:"
                                className="form-item-label-input-item"
                                inputClassName="form-item-label-input"
                                value=""
                            />
                            <TextInput
                                name={"secret"}
                                label={null}
                                placeholder="Enter your secret"
                                type={"password"}
                                addonAfter={selectAfter}
                                className="form-item-secret-input-item"
                                inputClassName="form-item-secret-input"
                                value=""
                            />
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
                            />
                        </Col>
                    </Row>
                </Card>
            )}
        />
    );
}

export default FormItem;
