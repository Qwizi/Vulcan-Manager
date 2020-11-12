import React, {useState, useEffect, useContext} from 'react';
import {Card} from "antd";
import {SocketContext} from "react-socket-io";

const activeTab = "3";

export default function ProcessTab (props) {
    const [processList, setProcessList] = useState([]);
    const socket = useContext(SocketContext);

    useEffect(() => {
        if (props.activeTab === activeTab && props.client && props.client.sid) {
            socket.emit('process_list', {clientId: props.client.sid})
        }
    }, [])

    if (props.activeTab !== activeTab) return <Card/>

    return (
        <Card title={"Procesy"}>
            Procesy
        </Card>
    )
}