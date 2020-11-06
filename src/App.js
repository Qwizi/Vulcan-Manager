import React, {useContext, useEffect} from "react";
import Navbar from "./components/navbar/Navbar";
import {Switch, BrowserRouter, Route} from 'react-router-dom';
import Home from "./views/Home";
import {Layout} from 'antd';
import {Event, SocketContext} from 'react-socket-io';
const {Header, Content, Footer} = Layout;

function App() {
    function onConnected () {
        console.log('Polaczono')
    }

    function onClientConnected (data) {
        console.log(data);
    }

    return (
        <BrowserRouter>
            <Layout>
                <Header>
                    <Navbar/>
                </Header>
                <Content style={{padding: '0 50px', marginTop: '50px'}}>
                    <Switch>
                        <Route path={"/"}>
                            <Home />
                        </Route>
                    </Switch>
                </Content>
                <Footer>
                    Vulcan
                </Footer>
            </Layout>
            <Event event={"connect"} handler={onConnected}/>
            <Event event={"client_connected"} handler={onClientConnected}/>
        </BrowserRouter>
    );
}

export default App;
