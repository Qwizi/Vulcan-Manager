import React, {useEffect} from 'react';
import {Card} from "antd";
import ScreenshotCard from "../home/ScreenshotCard";
import WebsiteCard from "../home/WebsiteCard";

const activeTab = "1";

export default function ManageTab (props) {
    if (props.activeTab !== activeTab) return <Card/>
    return (
        <Card>
            <ScreenshotCard client={props.client}/>
            <WebsiteCard client={props.client}/>
        </Card>
    )
}