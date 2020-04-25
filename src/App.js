import React from "react";
import { Provider } from "react-redux";
import configureStore from "./redux/store";
import Home from "./components/pages/home";
import "./App.less";


function App() {
    return (
        <Provider store={configureStore()}>
            <Home />
        </Provider>
    );
}


export default App;
