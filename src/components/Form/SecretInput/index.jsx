import React from "react";
import { Select, Button } from "antd";
import { Card, Typography } from "antd";
import { Row, Col } from "antd";
import { Draggable } from "react-beautiful-dnd";
import { DeleteOutlined } from "@ant-design/icons";

import FormItem from "../Item";

import "../styles.less";
import "./styles.less";

const { Option } = Select;

const selectAfter = (
    <Select defaultValue="password" className="select-after">
        <Option value="password">Secret</Option>
        <Option value="text">Text</Option>
    </Select>
);

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",

    // change background colour if dragging
    // background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
});

function SecretInput(props) {
    const { data, itemIndex } = props;
    const draggableId = data.id;
    const rowNumber = (itemIndex+1)
    return (
        <Draggable key={data.id} draggableId={draggableId} index={itemIndex}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}
                >
                    <Card className="input-item-card">
                        <Row justify={"start"} align={"middle"} >
                            <Col className="input-item-card-left-col" align={"start"}>
                                <Typography.Text className="input-item-card-left-col-text">
                                    {rowNumber}.
                                </Typography.Text>
                            </Col>
                            <Col className="input-item-card-middle-col">
                                <FormItem
                                    name={"label"}
                                    label={null}
                                    placeholder="Label:"
                                    className="form-item-label-input-item"
                                    inputClassName="form-item-label-input"
                                    value=""
                                />
                                <FormItem
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
                            <Col align="center" className="input-item-card-right-col">
                                <Button type="link" shape="circle" icon={<DeleteOutlined/>}  />
                            </Col>
                        </Row>
                    </Card>
                </div>
            )}
        </Draggable>
    );
}

export default SecretInput;
