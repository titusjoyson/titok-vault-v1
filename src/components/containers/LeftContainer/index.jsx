import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Layout } from "antd";
import { List } from "antd";
import SearchField from "../../Input/SearchField";
import ScrollContainer from "../ScrollContainer";

import styles from "./styles.js";
import "./styles.css";
import { defaultTheme } from "../../../theme/const";
import { addSecret, selectSecret } from "../../../redux/actions/secrets";

import { binarySearch } from "../../../utils/search";

const { Sider } = Layout;
const theme = defaultTheme;

class LeftContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            items: props.secretList,
            selectedSecret: props.selectedSecret,
        };
    }
    searchValue = "";

    static getDerivedStateFromProps(props, state) {
        return {
            items: props.secretList,
            selectedSecret: props.selectedSecret,
        }
    }

    typingTimeout = null;
    onSearch = (value) => {
        clearTimeout(this.typingTimeout);

        // Make a new timeout set to go off in 1000ms (1 second)
        this.typingTimeout = setTimeout(() => {
            let result = binarySearch(this.props.secretList, value);
            this.setState({ items: result });
        }, 300);
    };

    render() {
        const listClass = "scroll-list-item";
        const listSelectedClass = listClass + " scroll-list-item-active";

        const { items, collapsed, selectedSecret } = this.state;
        const { actions } = this.props;

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
                    this.setState({ collapsed: broken });
                }}
                onCollapse={(collapsed, type) => {
                    // console.log(collapsed, type);
                }}
                className="left-constrainer-wrapper border-1"
            >
                <div style={styles.header}>
                    <SearchField
                        onButtonClick={() => actions.addSecret()}
                        onChange={(value) => this.onSearch(value)}
                    />
                </div>
                <ScrollContainer
                    data={items}
                    renderItem={(item) => (
                        <List.Item
                            className={
                                item.id === selectedSecret
                                    ? listSelectedClass
                                    : listClass
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
}

const mapStateToProps = (state) => ({
    secretList: state.secrets.data,
    selectedSecret: state.secrets.active,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(
        {
            addSecret,
            selectSecret,
        },
        dispatch
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftContainer);
