import {Button, Row} from "react-bootstrap";
import React from "react";


//default ActionButton is outline-primary
//Main Button should be primary
export function ActionButton(props) {
    const {children} = props;

    return (
        <div className="m-1 col-auto">
            <Button size="lg" variant="outline-primary" {...props}>
                {children}
            </Button>
        </div>
    );
}

//a horizontal bar with centered buttons
//fill up with ActionButtons
export function ActionButtonBar(props) {
    const {children}=props;
    return (
        <Row className="m-5 justify-content-center">
            {children}
        </Row>
        )
}