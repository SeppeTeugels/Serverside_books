import {useNavigate, useParams} from "react-router-dom";
import React, {useCallback} from "react";
import {useForm} from "../../utilities/formutilities";
import {AUTHOR_EMPTY, useAuthor, useAuthorMutations} from "../../api/authorsapi";
import {useAuthenticationContext} from "../../contexts/authenticationcontext";
import {useMessageContext} from "../../contexts/messagecontext";
import {Form, Row} from "react-bootstrap";
import {ActionButton, ActionButtonBar} from "../../components/ui/ActionButton";
import {
    AuthorFormGroupCountry,
    AuthorFormGroupDescription,
    AuthorFormGroupName
} from "../../components/author/AuthorFormGroups";

export function AuthorEditPage() {
    const {id} = useParams();
    const {author} = useAuthor(id);
    const initialObjectInitializer = useCallback(author => ({...AUTHOR_EMPTY, ...author}), []);
    const {tempObject, onChange, resetTempObject} = useForm(initialObjectInitializer, author);

    const {isLoggedIn} = useAuthenticationContext();
    const {clearAllMessages} = useMessageContext();
    const navigate = useNavigate();
    const {editAuthor} = useAuthorMutations();

    async function handleSubmit(e) {
        e.preventDefault();
        clearAllMessages();
        if (await editAuthor(tempObject))
            navigate(`/authors/view/${author.id}`);
    }
    if (!isLoggedIn) return <div className="text-center m-5">not logged in </div>;
    if (!author) return <>author not found</>;

    return (
        <>
            <h1>Edit Author {author.name}</h1>
            <Form className="text-start m-5"
                  onSubmit={e => handleSubmit(e)}>
                <Row>
                    <AuthorFormGroupName tempObject={tempObject} onChange={onChange}/>
                    <AuthorFormGroupCountry tempObject={tempObject} onChange={onChange}/>
                    <AuthorFormGroupDescription tempObject={tempObject} onChange={onChange}/>
                </Row>

                <ActionButtonBar>
                    <ActionButton onClick={() => navigate(`/books/view/${author.id}`)}>cancel</ActionButton>
                    <ActionButton onClick={resetTempObject}>reset</ActionButton>
                    <ActionButton type="submit" variant="primary">save</ActionButton>
                </ActionButtonBar>
            </Form>
        </>
    )
}