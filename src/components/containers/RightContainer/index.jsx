import React from "react";
import { Layout } from "antd";
import Header from "./header";

import "./styles.less";

const { Content } = Layout;

function RightContainer() {
    return (
        <Layout className="site-layout">
            <Header/>
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
