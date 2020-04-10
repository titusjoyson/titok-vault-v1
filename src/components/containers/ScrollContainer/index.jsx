import React, { useState } from "react";
import { List, Avatar, Spin } from "antd";
import InfiniteScroll from "react-infinite-scroller";


function ScrollContainer(props) {
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
                    dataSource={props.data}
                    renderItem={props.renderItem}
                >
                    <div className="loading-container">
                        <Spin />
                    </div>
                </List>
            </InfiniteScroll>
        </div>
    );
}

export default ScrollContainer;
