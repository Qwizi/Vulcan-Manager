import React, {useState, useEffect, useContext} from 'react';
import {Button, Card, Progress} from "antd";
import {SocketContext} from "react-socket-io";

const componentName = 'home.ScreenshootCard.js';

export default function ScreenshotCard (props) {
    const [percent, setPercent] = useState(0);
    const [loading, setLoading] = useState(false);
    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.on('progress', data => {
            if (data.idSuffix === 'screenshoot') {
                setPercent(data.value);
                if (data.value === 100) {
                    setTimeout(() => {
                        setLoading(false);
                        setPercent(0);
                    }, 1000)
                }
            }
        })
    })

    function handleClick () {
        console.info(componentName+' Kliknieto w przycisk zrzut ekranu')
        setLoading(true);
        if (props.client && props.client.sid) {
            console.info(componentName+' Chce zrzut ekranu od '+props.client.sid);
            socket.emit('screenshoot', {clientId: props.client.sid});
        } else {
            console.info(componentName+' Chce zrzut ekranu od wszystkich')
            socket.emit('screenshoot');
        }
    }

    let progressBar = '';

    if (percent > 0) {
        progressBar = <Progress percent={percent}/>
    }

    return (
        <Card title={"Zrzut ekranu"} hoverable style={{margin: '10px'}}>
            <Button type={"primary"} onClick={handleClick} loading={loading}>Zrzut ekranu</Button>
            {progressBar}
        </Card>
    )
}