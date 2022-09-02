import React from "react";
import {LoginNavLink, LogoutNavLink} from "./auth/AuthButtons";
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {GiBookshelf} from "react-icons/gi";

function BooksNavLink(props) {
    const {to, children} = props;
    return (
        <Link to={to} className="text-decoration-none link-light p-1">
            {children}
        </Link>

    );
}

export function AppNavbar() {
    return <>
        <Navbar fixed="top" bg="dark" variant="dark" className="shadow p-2">
            <Navbar.Brand>
                <BooksNavLink to="/">
                    <GiBookshelf color="inherit" style={{fontSize: "1.8em"}}/>
                </BooksNavLink>
            </Navbar.Brand>
            <Container>
                <Nav>
                    <BooksNavLink to="/">books</BooksNavLink>
                    <BooksNavLink to="/authors">authors</BooksNavLink>
                </Nav>
                <Nav className="justify-content-end">
                    <Nav.Item><LoginNavLink/></Nav.Item>
                    <Nav.Item><LogoutNavLink/></Nav.Item>
                </Nav>
            </Container>
        </Navbar>
        <div style={{height: "3.5em"}}/>
    </>;
}
