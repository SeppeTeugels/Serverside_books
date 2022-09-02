import {Form, Row} from "react-bootstrap";
import React, {useCallback, useMemo} from "react";
import {useAuthenticationContext} from "../../contexts/authenticationcontext";
import {BOOK_EMPTY, useBookMutations} from "../../api/booksapi";
import {useAuthors} from "../../api/authorsapi";
import {useMessageContext} from "../../contexts/messagecontext";
import {useForm} from "../../utilities/formutilities";
import {useNavigate} from "react-router-dom";
import {ActionButton, ActionButtonBar} from "../../components/ui/ActionButton";
import {BookFormGroupAuthors, BookFormGroupDescription, BookFormGroupTitle} from "../../components/book/BookFormGroups";

export function BookCreatePage() {
    const initialObjectInitializer = useCallback(() => BOOK_EMPTY, []);
    const {tempObject, onChange, onReactSelect, resetTempObject} = useForm(initialObjectInitializer);
    const {isLoggedIn} = useAuthenticationContext();
    const {clearAllMessages} = useMessageContext();
    const navigate = useNavigate();
    const {createBook} = useBookMutations();
    const {authors} = useAuthors();

    async function handleSubmit(e) {
        e.preventDefault();
        clearAllMessages();
        const newBook = await createBook(tempObject);
        if (newBook)
            navigate(`/books/view/${newBook.id}`);
    }

    const authorOptions = useMemo(() => authors?.map(a => ({value: a.id, label: a.name})), [authors]);

    if (!isLoggedIn) return <div className="text-center m-5">not logged in </div>;
    return (
        <>
            <h1>New Book</h1>
            <Form className="text-start m-5"
                  onSubmit={e => handleSubmit(e)}>
                <Row>
                    <BookFormGroupTitle tempObject={tempObject} onChange={onChange}/>
                    <BookFormGroupAuthors authorOptions={authorOptions}
                                          onReactSelect={onReactSelect}/>
                    <BookFormGroupDescription tempObject={tempObject} onChange={onChange}/>

                </Row>

                <ActionButtonBar>
                    <ActionButton onClick={() => navigate(`/`)}>cancel</ActionButton>
                    <ActionButton onClick={resetTempObject}>reset</ActionButton>
                    <ActionButton type="submit" variant="primary">add</ActionButton>
                </ActionButtonBar>
            </Form>
        </>
    )

}