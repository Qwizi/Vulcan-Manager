import React, {useState} from 'react';
import {Card, Table} from "antd";


export default function ClientsCard (props) {
    const tableColumns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Nazwa',
            dataIndex: 'name',
            key: 'name'
        }
    ];

    return (
        <Card title={"Polaczeni klienci"} hoverable>
            <Table columns={tableColumns}/>
        </Card>
    )
}