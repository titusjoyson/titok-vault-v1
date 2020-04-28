import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Layout } from "antd";
import { Row, Col } from "antd";
import RoundIconButtons from "../../Buttons/roundIconButtons";
import { deleteSecret, changeViewMode } from "../../../redux/actions/secrets";
import { ViewModes } from "../../../com/const";

import "./styles.less";

const { Header } = Layout;

function ContainerHeader(props) {
    const { activeMode, selectedSecret, actions } = props;
    
    function _getActionButton() {
        switch (activeMode) {
            case ViewModes.VIEW:
                return (
                    <RoundIconButtons
                        title="Edit Secret"
                        iconName="edit"
                        onClick={() => {
                            actions.changeViewMode(ViewModes.EDIT)
                        }}
                    />
                );
            case ViewModes.EDIT:
                return (
                    <RoundIconButtons
                        title="View Secret"
                        iconName="save"
                        onClick={() => {
                            actions.changeViewMode(ViewModes.VIEW)
                        }}
                    />
                );
            default:
                return null;
        }
    }

    return (
        <Header
            theme="lite"
            className="right-container-header site-layout-background border-1"
        >
            <Row justify="end" align="middle">
                <Col align="center">
                    {_getActionButton()}
                    <RoundIconButtons
                        title="Delete Secret"
                        iconName="delete"
                        onClick={() => {
                            actions.deleteSecret(selectedSecret);
                        }}
                    />
                </Col>
            </Row>
        </Header>
    );
}

const mapStateToProps = (state) => ({
    selectedSecret: state.secrets.active,
    activeMode: state.secrets.activeMode,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(
        {
            deleteSecret,
            changeViewMode,
        },
        dispatch
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContainerHeader);
