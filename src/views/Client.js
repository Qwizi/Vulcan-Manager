import React, {useEffect, useState, useContext} from 'react';
import { Switch, Route, useRouteMatch, useParams, useHistory, withRouter} from "react-router-dom";
import ClientTabs from "../components/client/ClientTabs";
import Container from "../components/Container";
import {SocketContext} from "react-socket-io";
const componentName = 'views.Client.js';

export default withRouter(function Client (props) {
    const [client, setClient] = useState({});
    const match = useRouteMatch();
    const params = useParams();
    const history = useHistory();
    const socket = useContext(SocketContext);
    const {location} = props;

    useEffect(() => {
        props.addBreadcrumb({tag: 'manage_client', url: location.pathname, name: 'Zarzadzaj klientem '+params.clientId})
        console.log(componentName+ ' params clientId: '+params.clientId);
        socket.emit('client', {clientId: params.clientId});
        socket.on('client', data => {
            if (data === null) {
                console.error(componentName+ ' Klient o takim id nie istnieje');
                history.goBack();
            }
            console.log(componentName+ ' Otrzymalem dane o kliencie '+data.sid);
            console.table(data);
            setClient(data);
        })
        return () => {
            props.removeBreadcrumb('manage_client');
            setClient({});
        }
    }, [])

    return (
        <Switch>
            <Route path={`${match.path}`}>
                <Container>
                    <ClientTabs client={client}/>
                </Container>
            </Route>
        </Switch>

    )
})