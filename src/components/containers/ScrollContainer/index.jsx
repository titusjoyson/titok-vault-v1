import React from "react";
import { List } from "antd";
import InfiniteScroll from "react-infinite-scroller";

import "./styles.less";


function ScrollContainer(props) {
    const { data, renderItem } = props;
    return (
        <div className="infinite-container">
            <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={() => {}}
                hasMore={false}
                useWindow={false}
            >
                <List
                    dataSource={data}
                    renderItem={renderItem}
                >
                </List>
            </InfiniteScroll>
        </div>
    );
}

export default ScrollContainer;
