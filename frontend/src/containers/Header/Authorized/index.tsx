import React from "react";
import { useSelector } from "react-redux";
import { Menu, Dropdown, Icon } from "semantic-ui-react";
import getUsername from "../../../helpers/getUsername.helper";
import RootState from "../../../typings/rootState";

interface Props {
    logOut: () => void;
}

const Authorized: React.FC<Props> = ({ logOut }) => {
    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <>
            <Menu.Menu position="right">
                <Menu.Item>
                    <Dropdown
                        trigger={
                            <span>
                                <Icon name="setting" />
                                Profile
                            </span>
                        }
                    >
                        <Dropdown.Menu>
                            <Dropdown.Header>{getUsername(user as WebApi.Entity.User)}</Dropdown.Header>
                            <Dropdown.Item onClick={logOut}>Log out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Menu.Menu>
        </>
    );
};

export default Authorized;
