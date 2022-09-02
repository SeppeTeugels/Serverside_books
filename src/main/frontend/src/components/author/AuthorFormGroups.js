import {Form} from "react-bootstrap";
import React from "react";

export function AuthorFormGroupName(props) {
    const {tempObject, onChange} = props;
    return (
        <Form.Group controlId="name" className="mb-3">
            <Form.Label>name: </Form.Label>
            <Form.Control required value={tempObject?.name || ""}
                          onChange={event => onChange(event, "name")}/>
        </Form.Group>
    );
}

export function AuthorFormGroupDescription(props) {
    const {tempObject, onChange} = props;
    return (
        <Form.Group controlId="description" className="mb-3">
            <Form.Label>description: </Form.Label>
            <Form.Control as="textarea"
                          value={tempObject?.description || ""}
                          onChange={event => onChange(event, "description")}/>
        </Form.Group>
    );
}

export function AuthorFormGroupCountry(props) {
    const {tempObject, onChange} = props;
    return (
        <Form.Group controlId="country" className="mb-3">
            <Form.Label>country: </Form.Label>
            <Form.Control value={tempObject?.country || ""}
                          onChange={event => onChange(event, "country")}/>
        </Form.Group>
    );
}