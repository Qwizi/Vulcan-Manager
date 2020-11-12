import React, {useState, useEffect, useContext} from 'react';
import {Tabs} from "antd";
import {useParams, useHistory} from "react-router-dom";
import {SocketContext} from "react-socket-io";
import ManageTab from "./ManageTab";
import ConsoleTab from "./ConsoleTab";
import ProcessTab from "./ProcessTab";
import MouseTab from "./MouseTab";
import WallpaperTab from "./WallpaperTab";
import CookiesTab from "./CookiesTab";
import LoginDataTab from "./LoginDataTab";

const {TabPane} = Tabs;

export default function ClientTabs (props) {
    const [activeTab, setActiveTab] = useState("1");

    function handleOnTabChange(key) {
        setActiveTab(key);
    }

    return (
        <Tabs defaultActiveKey="1" onChange={handleOnTabChange}>
            <TabPane tab="Zarzadzaj" key={1}>
                <ManageTab client={props.client} activeTab={activeTab}/>
            </TabPane>
            <TabPane tab="Konsola" key="2">
                <ConsoleTab />
            </TabPane>
            <TabPane tab="Procesy" key="3">
                <ProcessTab client={props.client} activeTab={activeTab}/>
            </TabPane>
            <TabPane tab="Myszka" key="4">
                <MouseTab client={props.client} activeTab={activeTab}/>
            </TabPane>
            <TabPane tab="Tapeta" key="5">
                <WallpaperTab />
            </TabPane>
            <TabPane tab="Ciasteczka" key="6">
                <CookiesTab />
            </TabPane>
            <TabPane tab="Dane logowania" key="7">
                <LoginDataTab />
            </TabPane>
        </Tabs>
    )
}