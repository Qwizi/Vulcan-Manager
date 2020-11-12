import React, {useEffect} from "react";
import {withRouter} from 'react-router-dom';

import Container from "../components/Container";
import ScreenshotCard from "../components/home/ScreenshotCard";
import WebsiteCard from "../components/home/WebsiteCard";
import ClientsCard from "../components/home/ClientsCard";
import GroupsCard from "../components/home/GroupsCard";

export default function Home(props) {
    return (
        <Container>
            <GroupsCard clients={props.clients} />
        </Container>
    )
}