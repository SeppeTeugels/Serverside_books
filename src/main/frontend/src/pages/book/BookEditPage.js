import {Form, Row} from "react-bootstrap";
import React, {useCallback, useMemo} from "react";
import {useAuthenticationContext} from "../../contexts/authenticationcontext";
import {BOOK_EMPTY, useBook, useBookMutations} from "../../api/booksapi";
import {useAuthors} from "../../api/authorsapi";
import {useMessageContext} from "../../contexts/messagecontext";
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "../../utilities/formutilities";
import {ActionButton, ActionButtonBar} from "../../components/ui/ActionButton";
import {BookFormGroupAuthors, BookFormGroupDescription, BookFormGroupTitle} from "../../components/book/BookFormGroups";


export function BookEditPage() {
    const {id} = useParams();
    const {book} = useBook(id);
    const initialObjectInitializer = useCallback(book => ({
        ...BOOK_EMPTY, ...book, authorIds: book?.authors.map(a => a.id)
    }), []);
    const {tempObject, onChange, onReactSelect, resetTempObject} = useForm(initialObjectInitializer, book);


    const {isLoggedIn} = useAuthenticationContext();
    const {clearAllMessages} = useMessageContext();
    const navigate = useNavigate();
    const {editBook} = useBookMutations();
    const {authors} = useAuthors();

    async function handleSubmit(e) {
        e.preventDefault();
        clearAllMessages();
        if (await editBook(tempObject))
            navigate(`/books/view/${book.id}`);
    }

    const authorOptions = useMemo(() => authors?.map(a => ({value: a.id, label: a.name})), [authors]);
    const authorOptionsSelected = useMemo(() => authorOptions?.filter(option => tempObject?.authorIds?.includes(option.value)), [authorOptions, tempObject]);

    if (!isLoggedIn) return <div className="text-center m-5">not logged in </div>;
    if (!book) return <>book not found</>;

    return (
        <>
            <h1>Edit Book {book.title}</h1>
            <Form className="text-start m-5"
                  onSubmit={e => handleSubmit(e)}>
                <Row>
                    <BookFormGroupTitle tempObject={tempObject} onChange={onChange}/>
                    <BookFormGroupAuthors authorOptions={authorOptions} authorOptionsSelected={authorOptionsSelected}
                                          onReactSelect={onReactSelect}/>
                    <BookFormGroupDescription tempObject={tempObject} onChange={onChange}/>
                </Row>

                <ActionButtonBar>
                    <ActionButton onClick={() => navigate(`/books/view/${book.id}`)}>cancel</ActionButton>
                    <ActionButton onClick={resetTempObject}>reset</ActionButton>
                    <ActionButton type="submit" variant="primary">save</ActionButton>
                </ActionButtonBar>
            </Form>
        </>
    )

}