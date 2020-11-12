import React from 'react';
import {Button, Card, Col, Row} from "antd";

const activeTab = "4";

export default function MouseTab (props) {

    if (props.activeTab !== activeTab) return <Card/>

    return (
        <Card title={"Myszka"}>
            <Row>
                <Col>
                    <Button type={"primary"}>Do gory</Button>
                </Col>
            </Row>
        </Card>
    )
}