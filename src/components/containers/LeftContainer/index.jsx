import React from "react";
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

import { timerFunction } from "../../../utils/timer";

const { Sider } = Layout;
const theme = defaultTheme;

class LeftContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            items: null,
        };
    }
    searchValue = "";

    doSearch = (items, value) => {
        let query = value.toLowerCase();
        let newItemsQuery = "new secret".indexOf(query);
        if (newItemsQuery >= 0 && query) {
            return items.filter((item) => !item.title);
        } else if(query) {
            return items.filter((item) => {
                if (item.title) {
                    return item.title.toLowerCase().indexOf(query) >= 0;
                }else{
                    return null;
                }
            });
        }else{
            return null
        }
    };

    typingTimeout = null;
    onSearch = (value) => {
        timerFunction(this.typingTimeout, ()=>{
            let result = this.doSearch(this.props.secretList, value);
            this.setState({ items: result });
        })
    };

    render() {
        const listClass = "scroll-list-item";
        const listSelectedClass = listClass + " scroll-list-item-active";

        const { items, collapsed } = this.state;
        const { secretList, selectedSecret, actions } = this.props;

        let results = secretList;
        if (items) {
            results = items;
        }

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
                    data={results}
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
