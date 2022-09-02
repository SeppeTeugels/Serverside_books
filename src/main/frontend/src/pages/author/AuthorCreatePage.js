import React, {useCallback} from "react";
import {useForm} from "../../utilities/formutilities";
import {useAuthenticationContext} from "../../contexts/authenticationcontext";
import {useMessageContext} from "../../contexts/messagecontext";
import {useNavigate} from "react-router-dom";
import {AUTHOR_EMPTY, useAuthorMutations} from "../../api/authorsapi";
import {ActionButton, ActionButtonBar} from "../../components/ui/ActionButton";
import {Form, Row} from "react-bootstrap";
import {
    AuthorFormGroupCountry,
    AuthorFormGroupDescription,
    AuthorFormGroupName
} from "../../components/author/AuthorFormGroups";

export function AuthorCreatePage() {
    const initialObjectInitializer = useCallback(() => AUTHOR_EMPTY, []);
    const {tempObject, onChange, resetTempObject} = useForm(initialObjectInitializer);
    const {isLoggedIn} = useAuthenticationContext();
    const {clearAllMessages} = useMessageContext();
    const navigate = useNavigate();
    const {createAuthor} = useAuthorMutations();

    async function handleSubmit(e) {
        e.preventDefault();
        clearAllMessages();
        const newAuthor = await createAuthor(tempObject);
        if (newAuthor)
            navigate(`/authors/view/${newAuthor.id}`);
    }

    if (!isLoggedIn) return <div className="text-center m-5">not logged in </div>;
    return (
        <>
            <h1>New Author</h1>
            <Form className="text-start m-5"
                  onSubmit={e => handleSubmit(e)}>
                <Row>
                    <AuthorFormGroupName tempObject={tempObject} onChange={onChange}/>
                    <AuthorFormGroupDescription tempObject={tempObject} onChange={onChange}/>
                    <AuthorFormGroupCountry tempObject={tempObject} onChange={onChange}/>
                </Row>
                <ActionButtonBar>
                    <ActionButton onClick={() => navigate(`/authors`)}>cancel</ActionButton>
                    <ActionButton onClick={resetTempObject}>reset</ActionButton>
                    <ActionButton type="submit" variant="primary">add</ActionButton>
                </ActionButtonBar>
            </Form>
        </>
    )
}