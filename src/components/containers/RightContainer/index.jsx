import React, { useState } from "react";
import { Layout } from "antd";
import { Form, Row, Col, Button, Affix } from "antd";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { PlusOutlined } from "@ant-design/icons";

import Header from "./header";
import SecretInput from "../../Form/SecretInput";
import FormItem from "../../Form/Item";

import "./styles.less";

const { Content } = Layout;

const formItemLayout = {
    labelCol: {
        xs: { span: 2 },
        sm: { span: 2 },
    },
};

const rawData = [
    {
        id: "item-1",
        label: null,
        value: null,
        type: null,
    },
    {
        id: "item-2",
        label: null,
        value: null,
        type: null,
    },
    {
        id: "item-3",
        label: null,
        value: null,
        type: null,
    },
    {
        id: "item-4",
        label: null,
        value: null,
        type: null,
    },
    {
        id: "item-5",
        label: null,
        value: null,
        type: null,
    },
    {
        id: "item-6",
        label: null,
        value: null,
        type: null,
    },
    {
        id: "item-7",
        label: null,
        value: null,
        type: null,
    },
    {
        id: "item-8",
        label: null,
        value: null,
        type: null,
    },
    {
        id: "item-9",
        label: null,
        value: null,
        type: null,
    },
];

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "white",
});

function DropableView() {
    const [data, setData] = useState(rawData);

    function onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            data,
            result.source.index,
            result.destination.index
        );

        setData(items);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                    >
                        {data.map((d, idx) => (
                            <SecretInput data={d} itemIndex={idx} key={idx} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

function _renderContext(mode, form) {
    switch (mode) {
        case "edit":
            return (
                <React.Fragment>
                    <Form
                        {...formItemLayout}
                        form={form}
                        layout="vertical"
                        name="title-form"
                        onFinish={() => {}}
                        autoComplete="off"
                    >
                        <FormItem
                            name={null}
                            label={null}
                            placeholder="Title"
                            inputClassName="form-item-underline"
                            className="form-item-underline-item"
                            value=""
                        />
                        <DropableView />
                        <Affix
                            style={{ textAlign: "right", right: 32 }}
                            offsetBottom={44}
                        >
                            <Button
                                className="right-container-add-icon"
                                type="primary"
                                htmlType="button"
                                shape="circle"
                                icon={<PlusOutlined />}
                                size={"large"}
                            ></Button>
                        </Affix>
                    </Form>
                </React.Fragment>
            );
        case "view":
            return <div />;
        default:
            return;
    }
}

function RightContainer() {
    const [form] = Form.useForm();
    const mode = "edit";

    return (
        <Layout className="site-layout">
            <Header />
            <Content
                className="site-layout-background"
                style={{
                    margin: "4px 0px 0px 0px",
                    overflow: "auto",
                    padding: 24,
                    minHeight: 280,
                }}
            >
                {_renderContext(mode, form)}
            </Content>
        </Layout>
    );
}

export default RightContainer;
