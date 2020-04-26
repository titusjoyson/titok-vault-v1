import React, { useReducer, useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Form, Button, Affix } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import FormItem from "../../DataForm/FormItem";
import TextInput from "../../DataForm/Input";
import DropableView from "../../DND/Dropable";

import { deleteSecret, changeViewMode } from "../../../redux/actions/secrets";
import { ViewModes } from "../../../com/const";
import Secret, { SecretItem } from "../../../models/secret";

import "./styles.less";

const useCompare = (val) => {
    const prevVal = usePrevious(val);
    return prevVal !== val;
};

const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

function reducer(state, action) {
    let newItems = [];
    switch (action.type) {
        case "new":
            return { ...state, ...action.payload };
        case "addItem":
            return { ...state, items: [...state.items, SecretItem()] };
        case "removeItem":
            newItems = [...state.items];
            const deleteItemIdx = newItems.findIndex(
                (i) => i.id === action.payload
            );
            newItems.splice(deleteItemIdx, 1);
            return { ...state, items: newItems };
        case "updateTitle":
            return { ...state, title: action.payload };
        case "updateItems":
            newItems = [...state.items];
            const updateItemIdx = newItems.findIndex(
                (i) => i.id === action.payload
            );
            newItems[updateItemIdx] = action.payload;
            return { ...state, items: newItems };
        case "replaceItems":
            return { ...state, items: action.payload };
        default:
            throw new Error();
    }
}

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

function RightContainerInner(props) {
    const { activeMode, selectedData } = props;
    const [form] = Form.useForm();
    const [state, dispatch] = useReducer(reducer, Secret(""));

    const hasIdChanged = useCompare(selectedData.id);

    useEffect(() => {
        if (hasIdChanged) {
            let newData = { ...selectedData };
            if (newData.items.length <= 0) {
                newData.items = [SecretItem()];
            }
            dispatch({ type: "new", payload: newData });
        }
    });

    if (!state.id) {
        return null;
    }

    function onDragEnd(result) {
        const data = state.items;
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        const items = reorder(
            data,
            result.source.index,
            result.destination.index
        );
        dispatch({ type: "replaceItems", payload: items });
    }

    return (
        <React.Fragment>
            <Form
                {...formItemLayout}
                form={form}
                layout="vertical"
                name="title-form"
                onFinish={() => {}}
                autoComplete="off"
            >
                <TextInput
                    name="title"
                    inputClassName="form-item-underline"
                    className="form-item-underline-item"
                    placeholder="Title"
                    initialValue={selectedData.title}
                    onChange={() => {}}
                    // onChange={(value) =>
                    //     dispatch({ type: "updateTitle", payload: value })
                    // }
                />
                <DropableView
                    data={state.items || []}
                    onDragEnd={onDragEnd}
                    renderChild={(d, idx) => {
                        return (
                            <FormItem
                                data={d}
                                itemIndex={idx}
                                key={d.id}
                                onDelete={(id) =>
                                    dispatch({
                                        type: "removeItem",
                                        payload: id,
                                    })
                                }
                                onChange={(data) =>
                                    dispatch({
                                        type: "updateItems",
                                        payload: data,
                                    })
                                }
                            />
                        );
                    }}
                />
            </Form>
            <Affix style={{ textAlign: "right", right: 32 }} offsetBottom={44}>
                <Button
                    className="right-container-add-icon"
                    type="primary"
                    htmlType="button"
                    shape="circle"
                    icon={<PlusOutlined />}
                    size={"large"}
                    onClick={() => dispatch({ type: "addItem" })}
                ></Button>
            </Affix>
        </React.Fragment>
    );
}

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
        },
        dispatch
    ),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RightContainerInner);
