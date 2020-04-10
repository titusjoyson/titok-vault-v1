import React from "react";
import { Layout } from "antd";
import { Button, Tooltip } from "antd";
import { Row, Col } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

function RightContainer() {
    const headerHeight = 54;
    return (
        <Layout className="site-layout">
            <Header
                className="site-layout-background"
                style={{
                    padding: 0,
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    height: headerHeight,
                    backgroundColor: "blue",
                }}
            >
                <Row justify="end">
                    <Col>
                        <Tooltip title="search">
                            <Button
                                type="gost"
                                shape="circle"
                                icon={<DeleteOutlined />}
                            />
                        </Tooltip>
                    </Col>
                </Row>
            </Header>
            <Content
                className="site-layout-background"
                style={{
                    margin: "24px 16px",
                    padding: 24,
                    minHeight: 280,
                }}
            >
                Content
            </Content>
        </Layout>
    );
}

export default RightContainer;
