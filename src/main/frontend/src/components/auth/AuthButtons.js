import {useAuthenticationContext} from "../../contexts/authenticationcontext";
import React from "react";
import {IfLoggedIn, IfNotLoggedIn} from "./IfLoggedIn";
import {Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

export function LoginNavLink() {
    return (<IfNotLoggedIn>
        <Link to="/login" className="text-decoration-none link-light p-1 ">login</Link>
    </IfNotLoggedIn>)
}

export function LogoutNavLink() {
    const {logout, username} = useAuthenticationContext();
    const userInfo = `logged in as ${username}`;

    return <IfLoggedIn>
        <Nav.Link className="link-light p-1"
                  title={userInfo}
                  onClick={logout}>logout</Nav.Link>
    </IfLoggedIn>;
}
