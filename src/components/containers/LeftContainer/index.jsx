import React, { useState } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Layout } from "antd";
import { List } from "antd";
import SearchField from "../../Input/SearchField";
import ScrollContainer from "../ScrollContainer";

import styles from "./styles.js";
import "./styles.css";
import { defaultTheme } from "../../../theme/const";
import { addSecret, selectSecret } from '../../../redux/actions/secrets';

const { Sider } = Layout;
const theme = defaultTheme;

function LeftContainer(props) {
    const [collapsed, setCollapsed] = useState(0);
    const { secretList, selectedSecret, actions } = props;

    const listClass = "scroll-list-item";
    const listSelectedClass = listClass + " scroll-list-item-active";
    
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
                <SearchField 
                    onButtonClick={()=>actions.addSecret()}
                />
            </div>
            <ScrollContainer
                data={secretList || []}
                renderItem={(item) => (
                    <List.Item
                        className={
                            item.id === selectedSecret ? listSelectedClass : listClass
                        }
                        onClick={() => actions.selectSecret(item.id)}
                    >
                        {item.title || "New Secret..."}
                    </List.Item>
                )}
            />
        </Sider>
    );
}

const mapStateToProps = (state) => ({
    secretList: state.secrets.data,
    selectedSecret: state.secrets.active,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        addSecret,
        selectSecret
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftContainer);
