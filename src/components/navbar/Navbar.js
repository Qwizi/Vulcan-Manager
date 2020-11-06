import React from "react";
import {Menu} from "antd";

function Navbar() {
    return (
        <div>
            <div className={"logo"}>Vulcan</div>
            <Menu theme={"dark"} mode={"horizontal"}>
                <Menu.Item key={1}>ScreeenShots</Menu.Item>
            </Menu>
        </div>
    )
}

export default Navbar