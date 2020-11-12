import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Card, Table} from "antd";


export default function ClientsCard (props) {
    const tableColumns = [
        {
            title: 'Sid',
            dataIndex: 'sid',
            key: 'sid',
            render: text => (<Link to={`/clients/${text}`}>{text}</Link>)
        },
        {
            title: 'Nazwa',
            dataIndex: 'name',
            key: 'name'
        }
    ];


    return (
        <Card title={"Polaczeni klienci"} hoverable>
            <Table dataSource={props.clients} columns={tableColumns}/>
        </Card>
    )
}