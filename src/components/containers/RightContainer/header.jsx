import React from "react";
import { Layout } from "antd";
import { Button, Tooltip } from "antd";
import { Row, Col } from "antd";
import { DeleteOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";

import "./styles.less";

const { Header } = Layout;


function ContainerHeader() {
    return (
        <Header
            theme="lite"
            className="right-container-header site-layout-background border-1"
        >
            <Row justify="end" align="middle">
                <Col align="center">
                    <Tooltip title="Edit Secret" className="right-container-header-button">
                        <Button
                            type="gost"
                            shape="circle"
                            icon={<EditOutlined />}
                        />
                    </Tooltip>
                    <Tooltip title="Save Secret" className="right-container-header-button">
                        <Button
                            type="gost"
                            shape="circle"
                            icon={<SaveOutlined />}
                        />
                    </Tooltip>
                    <Tooltip title="Delete Secret" className="right-container-header-button">
                        <Button
                            type="gost"
                            shape="circle"
                            icon={<DeleteOutlined />}
                        />
                    </Tooltip>
                </Col>
            </Row>
        </Header>
    );
}

export default ContainerHeader;
