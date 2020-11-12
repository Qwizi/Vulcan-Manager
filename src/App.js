import React, {useState, useContext, useEffect} from "react";
import Navbar from "./components/navbar/Navbar";
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Home from "./views/Home";
import {Breadcrumb, Layout, Menu, notification, Result} from 'antd';
import {SocketContext} from "react-socket-io";
import Client from "./views/Client";
import SubMenu from "antd/es/menu/SubMenu";
import NotFound from "./views/NotFound";

const {Header, Content, Footer} = Layout;

const componentName = 'App.js';

function App() {
    const [clients, setClients] = useState([]);
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.emit('clients');
        socket.on('connect', () => {
            console.info(componentName+' Polaczono');
        })
        socket.on('clients', data => {
            setClients(data);
            if (data.length > 0) {
                console.info(componentName+' Polaczeni klienci');
                console.table(data);
            }
            else {
                console.info(componentName+ ' Brak polaczonych klientow')
            }
        })
        socket.on('notification', data => {
            const types = ['success', 'warning'];
            let type = data.status;
            if (!types.includes(data.status)) type = 'success';

            notification[type]({
                message: data.message,
                description: data.message
            })
            console.info(componentName+ " Nowa wiadomosc");
            console.table(data);
        })
        socket.on('client_connected', data => {
            setClients(oldClients => [...oldClients, data.client]);
            console.info(componentName+" Polaczono nowego klienta");
            console.table(data);
        })
        socket.on('client_disconnected',  data => {
            setClients(oldClients => oldClients.filter(client => client.sid !== data.client.sid));
            console.info(componentName+" Rozlaczono klienta");
            console.table(data);
        })
        socket.on('error', data => {
            console.log(data);
        })

    }, [])

    function addBreadcrumb ({tag, url, name}) {
        if (!breadcrumbs.find(breadcrumb => breadcrumb.tag === tag)) {
            setBreadcrumbs(oldState => [...oldState, {tag: tag, url: url, name: name}])
        }
    }

    function removeBreadcrumb (tag) {
        setBreadcrumbs(breadcrumbs.filter(breadcrumb => breadcrumb.tag !== tag));
    }

    function renderBreadcrumbs () {
        return breadcrumbs.map(breadcrumb => {
                return (
                    <Breadcrumb.Item key={breadcrumb.url}>
                        <Link to={breadcrumb.url}>{breadcrumb.name}</Link>
                    </Breadcrumb.Item>
                )
        })
    }

    function renderClientsMenuItem () {
        return clients.map(client => {
            return (
                <Menu.Item key={client.sid}>
                    <Link to={`/clients/${client.sid}`}>{client.sid}</Link>
                </Menu.Item>
            )
        })
    }

    const breadcrumbItems = [
        <Breadcrumb.Item key="home">
            <Link to="/">Strona główna</Link>
        </Breadcrumb.Item>,
    ].concat(renderBreadcrumbs());

    return (
        <BrowserRouter>
            <Layout>
                <Header>
                    <Navbar/>
                </Header>
                <Content style={{padding: '0 50px', marginTop: '50px'}}>
                    <Breadcrumb style={{padding: '0 80px', marginBottom: '15px'}}>
                        {breadcrumbItems}
                    </Breadcrumb>
                    <Switch>
                        <Route exact path={"/"}>
                            <Home
                                clients={clients}
                            />
                        </Route>
                        <Route path={"/clients/:clientId"} >
                            <Client
                                addBreadcrumb={addBreadcrumb}
                                removeBreadcrumb={removeBreadcrumb}
                            />
                        </Route>
                        <Route component={NotFound}/>
                    </Switch>
                </Content>
                <Footer>
                    Vulcan
                </Footer>
                <Menu theme={"dark"} mode={"horizontal"} style={{position: 'sticky', width: '100%', bottom: 0}}>
                    <SubMenu key={"clientsSubMenu"} title={`Online: ${clients.length}`}>
                        <Menu.ItemGroup title={'Dostępni klienci'}>
                            {renderClientsMenuItem()}
                        </Menu.ItemGroup>
                    </SubMenu>
                </Menu>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
