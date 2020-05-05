import React from "react";
import { Button, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

function getIcon(iconName){
    switch(iconName){
        case "delete":
            return <DeleteOutlined/>
        case "edit":
            return <EditOutlined/>
        case "save":
            return <EyeOutlined/>
        default:
            return null
    }
}

function RoundIconButtons(props) {
    const { title, onClick, iconName } = props;
    return (
        <Tooltip title={title} className="right-container-header-button">
            <Button type="gost" shape="circle" icon={getIcon(iconName)} onClick={()=>onClick()} />
        </Tooltip>
    );
}

export default RoundIconButtons;