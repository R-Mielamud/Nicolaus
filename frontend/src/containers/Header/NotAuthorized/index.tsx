import React from "react";
import { Icon, Menu } from "semantic-ui-react";
import history from "../../../helpers/history.helper";

const NotAuthorized: React.FC = () => {
    return (
        <Menu.Menu position="right">
            <Menu.Item>
                <div className="headerText" onClick={() => history.push("/register")}>
                    <Icon name="user circle" />
                    Sign up
                </div>
            </Menu.Item>
            <Menu.Item>
                <div className="headerText" onClick={() => history.push("/login")}>
                    <Icon name="sign in" />
                    Log in
                </div>
            </Menu.Item>
        </Menu.Menu>
    );
};

export default NotAuthorized;
