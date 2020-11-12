import React, {useState, useEffect, useContext} from 'react';
import {SocketContext} from 'react-socket-io';
import {Button, Card, Form, Input, Transfer} from "antd";

export default function CreateGroupCard (props) {
    const [clientsMockData, setClientsMockData] = useState([]);
    const [clientsTargetData, setClientsTargetData] = useState([]);
    const [form] = Form.useForm();
    const socket = useContext(SocketContext);

    useEffect(() => {
        let clients = [];
        if (props.clients) {
            props.clients.map((client, index) => {
                console.log(client.sid);
                clients.push({
                    key: index.toString(),
                    title: client.sid,
                    description: client.sid
                })
            })
            console.log(clients);
            setClientsMockData(clients);
        }
    }, [props.clients])

    function handleChangeTransfer(targetKeys) {
        setClientsTargetData(targetKeys);
    }

    function handleFinishForm(values) {
        const groupName = values.name;
        let clients = [];
        clientsTargetData.map(target => {
            return clients.push(clientsMockData[target].title);
        })
        socket.emit('new-group', {name: groupName, clients: clients});
        setClientsTargetData([]);
    }

    return (
        <Card title={'Stworz grupe'}>
            <Transfer
                dataSource={clientsMockData}
                targetKeys={clientsTargetData}
                titles={['Dostepni klienci', 'Dodani klienci']}
                render={item => item.title}
                listStyle={{width: 250}}
                onChange={handleChangeTransfer}
            />
            <Form
                form={form}
                labelCol={{span: 2}}
                wrapperCol={{span: 8}}
                name={'groups_form'}
                onFinish={handleFinishForm}
            >
                <Form.Item
                    label={'Nazwa grupy'}
                    name={"name"}
                >
                    <Input
                        placeholder={"Test 1"}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type={"primary"} htmlType="submit">Stworz</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}