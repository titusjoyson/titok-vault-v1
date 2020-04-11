import React from "react";
import { Layout } from "antd";

import LeftContainer from "../containers/LeftContainer";
import RightContainer from "../containers/RightContainer";
import SearchField from "../fields/SearchField";
import ScrollContainer from "../containers/ScrollContainer";

const data = [
    "tp enterprise dev server ssh",
    "tp enterprise staging server ssh",
    "tp enterprise live server ssh",
    "tp dev server ssh",
    "tp staging server ssh",
    "tp live server ssh",
    "tp enterprise dev server ssh",
    "tp enterprise staging server ssh",
    "tp enterprise live server ssh",
    "tp dev server ssh",
    "tp staging server ssh",
    "tp live server ssh",
    "tp enterprise dev server ssh",
    "tp enterprise staging server ssh",
    "tp enterprise live server ssh",
    "tp dev server ssh",
    "tp staging server ssh",
    "tp live server ssh",
]

function Home() {
    return (
        <Layout>
            <LeftContainer
                Header={SearchField}
                ScrollContainer={ScrollContainer}
                data={data}
            />
            <RightContainer />
        </Layout>
    );
}

export default Home;
