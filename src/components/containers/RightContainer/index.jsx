import React from "react";
import { Layout } from "antd";
import { Divider } from "antd";
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    Button,
} from "antd";
import Header from "./header";
import FormItem from '../../Form/Item';

import "./styles.less";

const { Content } = Layout;
const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 2 },
        sm: { span: 2 },
    }
};

const selectAfter = (
    <Select defaultValue="password" className="select-after">
        <Option value="password">Secret</Option>
        <Option value="text">Text</Option>
    </Select>
);

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
                    >
                        <FormItem
                            name={null} 
                            label="Title:"
                            placeholder="Title"
                        />
                        <Divider orientation="left"></Divider>
                        <FormItem
                            name={null} 
                            label="Label:"
                            placeholder="eg, ssh connection string"
                        />
                        <FormItem
                            name={null} 
                            label="Value:"
                            placeholder="eg, ssh -L 9999:127.0.0.1:80 user@remoteserver"
                            type={"password"}
                            addonAfter={selectAfter}
                        />
                        <Divider orientation="left"></Divider>
                        <Row>
                            <Col span={24} style={{ textAlign: "right" }}>
                                <Form.Item>
                                    <Button type="primary" htmlType="button">
                                        Add Another
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
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
                    margin: "24px 16px",
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
