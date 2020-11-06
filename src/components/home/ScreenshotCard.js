import React, {useState} from 'react';
import {Button, Card, Progress} from "antd";

export default function ScreenshotCard (props) {
    const [percent, setPercentValue] = useState(0);
    return (
        <Card title={"Zrzut ekranu"} hoverable style={{margin: '10px'}}>
            <Button type={"primary"}>Zrzut ekranu</Button>
            <Progress percent={percent}/>
        </Card>
    )
}