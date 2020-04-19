import React, { useState } from "react";
import { Layout } from "antd";
import { List } from "antd";

import styles from "./styles.js";
import "./styles.css";
import { defaultTheme } from "../../../theme/const";

const { Sider } = Layout;
const theme = defaultTheme;

function LeftContainer(props) {
    const [collapsed, setCollapsed] = useState(0);
    const [selected, setSelected] = useState(null);
    const { Header, ScrollContainer, data } = props;
    const listClass = "scroll-list-item"
    const listSelectedClass = listClass + " scroll-list-item-active"
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
            className="left-constrainer-wrapper border-1"
        >
            <div style={styles.header}>
                <Header />
            </div>
            <ScrollContainer
                data={data}
                renderItem={(item, idx) => (
                    <List.Item
                        className={
                            (idx === selected
                                ? listSelectedClass
                                : listClass)
                        }
                        onClick={() => setSelected(idx)}
                    >
                        {item}
                    </List.Item>
                )}
            />
        </Sider>
    );
}

export default LeftContainer;
