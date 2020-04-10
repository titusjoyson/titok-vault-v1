import React, { useState } from "react";
import { Layout } from "antd";
import styles from "./styles.js";
import "./styles.css";
import { defaultTheme } from '../../../theme/const';

const { Sider } = Layout;
const theme = defaultTheme;

function LeftContainer(props) {
    const [collapsed, setCollapsed] = useState(0);
    const {Header, Body} = props;

    return (
        <Sider
            breakpoint="md"
            collapsedWidth="0"
            width={300}
            trigger={null}
            mode="inline"
            collapsible
            collapsed={collapsed}
            theme={theme}
            onBreakpoint={(broken) => {
                setCollapsed(broken);
            }}
            onCollapse={(collapsed, type) => {
                // console.log(collapsed, type);
            }}
            style={styles.slider}
            className="left-constainer-wrapper"
        >
            <div
                className="site-layout-background"
                style={styles.header}
            >
                <Header/>
            </div>
            <Body/>
        </Sider>
    );
}

export default LeftContainer;
