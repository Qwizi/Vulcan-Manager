import React from 'react';
import {Result} from "antd";
import Container from "../components/Container";

export default function NotFound (props) {
    return (
        <Container>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
            />
        </Container>
    )
}