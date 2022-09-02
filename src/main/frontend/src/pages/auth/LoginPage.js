import {useAuthenticationContext} from "../../contexts/authenticationcontext";
import {PasswordControl, UsernameControl} from "../../components/auth/AuthControls";
import React, {useCallback} from "react";
import {useMessageContext} from "../../contexts/messagecontext";
import {Col, Form, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {ActionButton, ActionButtonBar} from "../../components/ui/ActionButton";
import {useForm} from "../../utilities/formutilities";

export function LoginPage() {
    const initialObjectInitializer = useCallback(() => ({username: "", password: ""}), []);
    const {tempObject, onChange, resetTempObject} = useForm(initialObjectInitializer);
    const {isLoggedIn, authenticate, username} = useAuthenticationContext();
    const {clearAllMessages} = useMessageContext();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        clearAllMessages();
        const result = await authenticate(tempObject.username, tempObject.password);
        if (result) navigate("/", {replace: true});
    }

    if (isLoggedIn) return <div className="text-center m-5">logged in as {username}</div>;

    return (
        <>
            <h1 className="mt-1">Login</h1>
            <Form className="text-start m-5"
                  onSubmit={e => handleSubmit(e)}>
                <Row>
                    <UsernameControl onChange={onChange} tempObject={tempObject}/>
                    <PasswordControl onChange={onChange} tempObject={tempObject}/>
                </Row>
                <Row>
                    <Col>not registered? <Link to="/signup">go to signup</Link></Col>
                </Row>
                <ActionButtonBar>
                    <ActionButton onClick={() => navigate(`/`)}>cancel</ActionButton>
                    <ActionButton onClick={resetTempObject}>reset</ActionButton>
                    <ActionButton variant="primary" type="submit">login</ActionButton>
                </ActionButtonBar>
            </Form>
        </>
    )
}