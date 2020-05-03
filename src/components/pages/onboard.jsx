import React, { useEffect } from "react";
import { Layout } from "antd";
import { useHistory } from "react-router-dom";
import GoogleDrive from "../../com/drive";

function Onboard() {
    const history = useHistory() 

    useEffect(()=>{
        history.push("/home")
        let drive = new GoogleDrive()
        // drive.handleClientLoad(
        //     (userProfile)=>{
        //         history.push("/home")
        //     },
        //     (error)=>{
        //         console.log("login Failed")
        //     }
        // )
    })

    return (
        <Layout>
            <p>Titus</p>
            <div id="google-signin2"></div>
            <button id="signout_button" style={{"display": "none"}}>
                Sign Out
            </button>

            <pre id="content" style={{"white-space": "pre-wrap"}}></pre>
        </Layout>
    );
}

export default Onboard;
