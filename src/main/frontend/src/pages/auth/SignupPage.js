import React, {useCallback} from "react";
import {useAuthenticationContext} from "../../contexts/authenticationcontext";
import {useMessageContext} from "../../contexts/messagecontext";
import {Link, useNavigate} from "react-router-dom";
import {Col, Form, Row} from "react-bootstrap";
import {EmailControl, PasswordControl, UsernameControl} from "../../components/auth/AuthControls";
import {ActionButton, ActionButtonBar} from "../../components/ui/ActionButton";
import {useForm} from "../../utilities/formutilities";

export function SignupPage() {
    const initialObjectInitializer = useCallback(() => ({username: "", password: ""}), []);
    const {tempObject, onChange, resetTempObject} = useForm(initialObjectInitializer);
    const {isLoggedIn, signup, username} = useAuthenticationContext();
    const {clearAllMessages} = useMessageContext();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        clearAllMessages();
        const result = await signup(tempObject.username, tempObject.email, tempObject.password);
        if (result) navigate("/", {replace: true});
    }

    if (isLoggedIn) return <div className="text-center m-5">logged in as {username}</div>;

    return (
        <>
            <h1 className="mt-1">Signup</h1>
            <Form className="text-start m-5"
                  onSubmit={e => handleSubmit(e)}>
                <Row>
                    <UsernameControl onChange={onChange} tempObject={tempObject}/>
                    <PasswordControl onChange={onChange} tempObject={tempObject}/>
                    <EmailControl onChange={onChange} tempObject={tempObject}/>
                </Row>
                <Row>
                    <Col>already registered? <Link to="/login">go to login</Link></Col>
                </Row>
                <ActionButtonBar>
                    <ActionButton onClick={() => navigate(`/`)}>cancel</ActionButton>
                    <ActionButton onClick={resetTempObject}>reset</ActionButton>
                    <ActionButton variant="primary" type="submit">signup</ActionButton>
                </ActionButtonBar>
            </Form>
        </>
    )
}