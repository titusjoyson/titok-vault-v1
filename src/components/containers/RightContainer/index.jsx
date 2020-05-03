import React from "react";

import { Layout } from "antd";

import Header from "./header";
import RightContainerInner from './body';

import "./styles.less";

const { Content } = Layout;


function RightContainer(props) {

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
                <RightContainerInner/>
            </Content>
        </Layout>
    );
}

export default RightContainer;