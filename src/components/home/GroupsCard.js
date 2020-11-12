import React, {useState, useEffect, useContext} from 'react';
import {Card, Table} from "antd";
import {SocketContext} from 'react-socket-io';
import CreateGroupCard from "./CreateGroupCard";
import {Link} from "react-router-dom";

export default function GroupsCard (props) {
    const [groups, setGroups] = useState([]);
    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.emit('groups');
        socket.on('groups', data => {
            setGroups(data.groups);
        })
        socket.on('new-group', data => {
            addGroup(data.group);
        })
    }, [])

    const groupTableColumns = [
        {
            title: 'Nazwa grupy',
            dataIndex: 'name',
            key: 'name',
            render: text => (<Link to={`/groups/${text}`}>{text}</Link>)
        }
    ]

    function addGroup (group) {
        setGroups(oldGroups => [...oldGroups, group]);
    }

    return (
        <Card title={'Grupy'}>
            <Table
                dataSource={groups}
                columns={groupTableColumns}
            />
            <CreateGroupCard clients={props.clients}/>
        </Card>
    )
}