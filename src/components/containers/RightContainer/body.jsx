import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Form, Button } from "antd";
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
        if (props.selectedData) {
            if (!props.selectedData.id) {
                // clean right container state
                return Secret("");
            }
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
        // Return null if the state hasn't changed
        return null;
    }

    onDragEnd = (result) => {
        const data = this.props.selectedData;
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        const items = reorder(
            data.items,
            result.source.index,
            result.destination.index
        );

        data.items = items;
        this.props.actions.replaceSecret(data);
        this.setState({ items: items });
    };

    deleteItem = (id) => {
        let data = { ...this.props.selectedData };
        let newItems = [...data.items];
        const deleteItemIdx = newItems.findIndex((i) => i.id === id);
        newItems.splice(deleteItemIdx, 1);
        
        data.items = newItems;
        this.props.actions.replaceSecret(data);
        this.setState({ items: newItems });
    };

    addItem = () => {
        let data = { ...this.props.selectedData };
        data.items = [...data.items, SecretItem()];
        this.props.actions.replaceSecret(data);  
        this.setState({ items: data.items });
    };

    onChange = (value, field, idx=null) => {
        let data = { ...this.props.selectedData };
        if (field === "title") {
            data.title = value;
        } else {
            data.items[idx][field] = value;
        }
        this.props.actions.replaceSecret(data);
    };

    _renderAddButton = (readOnly) => {
        if (readOnly) {
            return null;
        }
        return (
            <div className="right-container-add-icon-wrap">
                <Button
                    className="right-container-add-icon"
                    type="primary"
                    htmlType="button"
                    shape="circle"
                    icon={<PlusOutlined />}
                    size={"large"}
                    onClick={() => this.addItem()}
                ></Button>
            </div>
        );
    };

    render() {
        const { activeMode } = this.props;
        const { id, title, items } = this.state;
        if (!this.state.id) {
            return null;
        }
        const readOnly = activeMode === ViewModes.VIEW;
        let titleIC = "form-item-underline";
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
                        readOnly={readOnly}
                        name={`${id}-title`}
                        inputClassName={titleIC}
                        className="form-item-underline-item"
                        placeholder="Title"
                        defaultValue={title}
                        onChange={(value) => this.onChange(value, "title")}
                    />
                    <DropableView
                        onDragEnd={(results) => this.onDragEnd(results)}
                    >
                        {items.map((d, idx) => (
                            <FormItem
                                readOnly={readOnly}
                                key={`form-item-${d.id}`}
                                data={d}
                                itemIndex={idx}
                                onDelete={(did) => this.deleteItem(did)}
                                onChange={(value, field) =>
                                    this.onChange(value, field, idx)
                                }
                            />
                        ))}
                    </DropableView>
                </Form>
                {this._renderAddButton(readOnly)}
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
