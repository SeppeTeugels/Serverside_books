import {Form} from "react-bootstrap";
import React from "react";
import Select from "react-select";

export function BookFormGroupTitle(props) {
    const {tempObject, onChange} = props;
    return (
        <Form.Group controlId="title" className="mb-3">
            <Form.Label>title: </Form.Label>
            <Form.Control required value={tempObject?.title || ""}
                          onChange={event => onChange(event, "title")}/>
        </Form.Group>
    );
}

export function BookFormGroupAuthors(props) {
    const {authorOptions, authorOptionsSelected, onReactSelect} = props;
    return (
        <Form.Group controlId="authorIds" className="mb-3">
            <Form.Label>authors: </Form.Label>
            <Select isMulti isClearable
                    options={authorOptions}
                    value={authorOptionsSelected}
                    onChange={event => onReactSelect(event, "authorIds")}/>
        </Form.Group>
    );
}

export function BookFormGroupDescription(props) {
    const {tempObject, onChange} = props;
    return (
        <Form.Group controlId="title" className="mb-3">
            <Form.Label>description: </Form.Label>
            <Form.Control as="textarea"
                          value={tempObject?.description || ""}
                          onChange={event => onChange(event, "description")}/>
        </Form.Group>
    );
}
