import React from "react";
import {MdArrowBack} from "react-icons/md";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";


export function NavButtonLink(props) {
    const {to, children} = props;
    return (
        <div className="m-1 shadow">
            <Link to={to}>
                <Button className=" " size='sm'>
                    {children}
                </Button>
            </Link>
        </div>
    );
}

export function NavButtonOnClick(props) {
    const {onClick, children} = props;
    return (
        <div className="m-1 shadow">
            <Button className=" " size='sm'
                    onClick={onClick}>
                {children}
            </Button>
        </div>
    );
}

export function NavButtonHome() {
    return (
        <NavButtonLink to={`/`}>
            <MdArrowBack color="inherit"/>
        </NavButtonLink>
    );
}

//a vertical bar top-left with buttons
//fill up with (blue) NavButtons
export function NavButtonBar(props) {
    const {children} = props;
    return (
        <div className="flex-column position-absolute start-0 top-0 mt-1">
            {children}
        </div>
    )
}
