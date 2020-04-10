import React from "react";
import { Layout } from "antd";
import LeftContainer from '../containers/LeftContainer';
import RightContainer from '../containers/RightContainer';
import SearchField from '../fields/SearchField';
import ScrollContainer from '../containers/ScrollContainer';

function Home() {
    return (
        <Layout>
            <LeftContainer
                Header={SearchField}
                Body={ScrollContainer}
            />
            <RightContainer/>
        </Layout>
    );
}

export default Home;
