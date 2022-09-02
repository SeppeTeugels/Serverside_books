import {Form} from "react-bootstrap";
import React from "react";

export function UsernameControl(props) {
    const {firstInputRefElement, onChange, tempObject} = props;
    const fieldName = "username";
    return <Form.Group controlId="username" className="mb-3">
        <Form.Label>username: </Form.Label>
        <Form.Control required
                      placeholder="enter username" autoComplete="username"
                      value={tempObject[fieldName]}
                      ref={firstInputRefElement}
                      onChange={event => onChange(event, fieldName)}/>
    </Form.Group>;
}

export function PasswordControl(props) {
    const {onChange, tempObject} = props;
    const fieldName = "password";
    return <Form.Group controlId="password" className="mb-3">
        <Form.Label>password: </Form.Label>
        <Form.Control type="password"
                      required
                      placeholder="Password" autoComplete="current-password"
                      value={tempObject[fieldName]}
                      onChange={event => onChange(event, fieldName)}/>
    </Form.Group>;
}

export function EmailControl(props) {
    const {onChange, tempObject} = props;
    const fieldName = "email";
    return <Form.Group controlId="email" className="mb-3">
        <Form.Label>email: </Form.Label>
        <Form.Control required
                      placeholder="Enter email" autoComplete="email"
                      value={tempObject[fieldName]}
                      onChange={event => onChange(event, fieldName)}/>
    </Form.Group>;
}