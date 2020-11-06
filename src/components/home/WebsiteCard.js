import React, {useState} from 'react';
import {Button, Card, Form, Input, Progress, Select, Switch} from "antd";
import {Option} from "antd/es/mentions";

export default function WebsiteCard (props) {
    const [selectVisibleState, setSelectVisibleState] = useState(false);
    const [urlValue, setUrlValue] = useState('');
    const [percent, setPercentValue] = useState(0);

    function handleUrlChange (e) {
        setUrlValue(e.target.value);
    }

    function handleSwitchChange (checked) {
        console.log(checked);
        setSelectVisibleState(checked);
    }
    let selectInput = '';

    if (selectVisibleState) selectInput =  (
        <Form.Item>
            <Select name={"action"}>
                <Option value={'send_msg'}>Wyslij wiadomosc</Option>
            </Select>
        </Form.Item>
    )

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
        <Card title={"Uruchom strone"} hoverable style={{ margin: '10px' }}>
            <Form labelCol={{span: 2}} wrapperCol={{span: 8}} name={'website_form'}>
                <Form.Item
                    label={"Podaj adres"}
                    rules={[
                        {
                            required: true
                        }
                    ]}>
                    <Input
                        onChange={handleUrlChange}
                        placeholder={"https://google.com"}
                        name={"url"}
                        value={urlValue}
                    />
                </Form.Item>
                <Form.Item label={"Zastosuj akcje"}>
                    <Switch onChange={handleSwitchChange}/>
                </Form.Item>
                {selectInput}
                <Form.Item>
                    <Button type={"primary"}>Wyslij</Button>
                </Form.Item>
            </Form>
            <Progress percent={percent} />
        </Card>
    )
}