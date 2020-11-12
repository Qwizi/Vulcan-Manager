import React from "react";
import {Link} from 'react-router-dom';
import {Menu} from "antd";

function Navbar() {
    return (
        <div>
            <Link className={"logo"} to={"/"}>Vulcan</Link>
            <Menu theme={"dark"} mode={"horizontal"}>
                <Menu.Item key={1}>ScreeenShots</Menu.Item>
            </Menu>
        </div>
    )
}

export default Navbar