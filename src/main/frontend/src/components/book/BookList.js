import React from "react";
import {Book} from "./Book";
import {Row} from "react-bootstrap";

export function BookList(props) {
    const {books} = props;
    return <Row>
            {books?.map(b =>
                <Book key={b.id} book={b}/>)}
        </Row>;
}