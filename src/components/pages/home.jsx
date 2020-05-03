import React from "react";
import { Layout } from "antd";

import LeftContainer from "../containers/LeftContainer";
import RightContainer from "../containers/RightContainer";


function Home() {

    return (
        <Layout>
            <LeftContainer/>
            <RightContainer />
        </Layout>
    );
}

export default Home;
