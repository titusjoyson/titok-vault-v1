import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Form, Button, Affix } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import FormItem from "../../DataForm/FormItem";
import TextInput from "../../DataForm/Input";
import DropableView from "../../DND/Dropable";

import {
    deleteSecret,
    changeViewMode,
    replaceSecret,
} from "../../../redux/actions/secrets";
import { ViewModes } from "../../../com/const";
import Secret, { SecretItem } from "../../../models/secret";

import "./styles.less";

const formItemLayout = {
    labelCol: {
        xs: { span: 2 },
        sm: { span: 2 },
    },
};

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

class RightContainerInner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props.selectedData,
        };
    }
    formRef = React.createRef();

    static getDerivedStateFromProps(props, state) {
        console.log("main: getDerivedStateFromProps");
        if (props.selectedData) {
            if (state.id !== props.selectedData.id) {
                let newData = { ...props.selectedData };
                if (newData.items.length <= 0) {
                    newData.items = [SecretItem()];
                }
                // replace current state
                return {
                    ...newData,
                };
            }
        }
        console.log("main: getDerivedStateFromProps:end");
        // Return null if the state hasn't changed
        return null;
    }

    preserveState = () => {
        const previousData = this.getValues();
        if (previousData) {
            this.props.actions.replaceSecret(previousData);
        }
    };

    onDragEnd = (result) => {
        const data = this.state.items;
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        const items = reorder(
            data,
            result.source.index,
            result.destination.index
        );
        this.setState({ items: items });
    };

    getValues = () => {
        let data = { ...this.state };
        const form = this.formRef.current;
        if (data.id) {
            data.title = form.getFieldValue(`${data.id}-title`);
            for (let i = 0; i < data.items.length; i++) {
                let item = data.items[i];
                item.label = form.getFieldValue(`${item.id}-label`);
                item.value = form.getFieldValue(`${item.id}-secret`);
                let type = form.getFieldValue(`${item.id}-type`);
                if (!type) {
                    item.type = "password";
                }
                data.items[i] = item;
            }
            return data;
        }
    };

    deleteItem = (id) => {
        let newItems = [...this.state.items];
        const deleteItemIdx = newItems.findIndex((i) => i.id === id);
        newItems.splice(deleteItemIdx, 1);
        this.setState({ items: newItems }, () => {
            this.preserveState();
        });
    };

    addItem = () => {
        let newItems = [...this.state.items, SecretItem()];
        this.setState({ items: newItems }, () => {
            this.preserveState();
        });
    };

    onChange = () => {
        window.setTimeout(() => this.preserveState(), 100);
    };

    render() {
        const { activeMode, actions } = this.props;
        if (!this.state.id) {
            return null;
        }
        console.log("main:rendering");
        return (
            <React.Fragment>
                <Form
                    {...formItemLayout}
                    ref={this.formRef}
                    layout="vertical"
                    name="cr"
                    onFinish={() => {}}
                >
                    <TextInput
                        name={`${this.state.id}-title`}
                        inputClassName="form-item-underline"
                        className="form-item-underline-item"
                        placeholder="Title"
                        initialValue={this.state.title}
                        onBlur={() => this.onChange()}
                    />
                    <DropableView
                        onDragEnd={(results) => this.onDragEnd(results)}
                    >
                        {this.state.items.map((d, idx) => (
                            <FormItem
                                key={`form-item-${d.id}`}
                                data={d}
                                itemIndex={idx}
                                onDelete={(id) => this.deleteItem(id)}
                                onBlur={() => this.onChange()}
                            />
                        ))}
                    </DropableView>
                </Form>
                <Affix
                    style={{ textAlign: "right", right: 32 }}
                    offsetBottom={44}
                >
                    <Button
                        className="right-container-add-icon"
                        type="primary"
                        htmlType="button"
                        shape="circle"
                        icon={<PlusOutlined />}
                        size={"large"}
                        onClick={() => this.addItem()}
                    ></Button>
                </Affix>
            </React.Fragment>
        );
    }
}

RightContainerInner.defaultProps = {
    id: null,
    items: [],
};

const mapStateToProps = (state) => {
    const secretList = state.secrets.data;
    const selectedSecretId = state.secrets.active;
    let selectedData = {};
    if (selectedSecretId) {
        const selItemIdx = secretList.findIndex(
            (i) => i.id === selectedSecretId
        );
        if (selItemIdx || selItemIdx === 0) {
            selectedData = secretList[selItemIdx];
        }
    }

    return {
        activeMode: state.secrets.activeMode,
        selectedData: selectedData,
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(
        {
            deleteSecret,
            changeViewMode,
            replaceSecret,
        },
        dispatch
    ),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RightContainerInner);
