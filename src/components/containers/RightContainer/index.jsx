import React, { useState } from "react";

import { Layout } from "antd";
import { Form, Button, Affix } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import Header from "./header";
import FormItem from "../../DataForm/FormItem";
import TextInput from "../../DataForm/Input";
import DropableView from "../../DND/Dropable";

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
                        <TextInput
                            name={null}
                            label={null}
                            placeholder="Title"
                            inputClassName="form-item-underline"
                            className="form-item-underline-item"
                            value=""
                        />
                        <DropableView rawData={rawData} DraggableItem={FormItem} />
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

function RightContainer(props) {
    const [ viewMode, setViewMode ] = useState("view")
    const [form] = Form.useForm();

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
                {_renderContext(viewMode, form)}
            </Content>
        </Layout>
    );
}

export default RightContainer;