import React from "react";
import { List } from "antd";

import "./styles.less";

function Item(props) {
    const { data } = props;
    return (
        <List.Item className="scroll-list-item">{data}</List.Item>
    );
}

export default Item;
