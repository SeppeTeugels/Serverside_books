import React from "react";
import {Card, Col} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export function Book(props) {
    const {book} = props;
    const navigate = useNavigate();

    return <Col sx={12} sm={6} lg={4} xl={2} className='mt-3'>
        <Card className="h-100 shadow-sm"
              onClick={() => navigate(`/books/view/${book.id}`)}>
            <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>{book.authors?.map(a => a.name).join(",")}</Card.Text>
            </Card.Body>

        </Card>
    </Col>;
}
