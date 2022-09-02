import {BookList} from "../../components/book/BookList";
import React from "react";
import {NewBookButton} from "../../components/book/BookButtons";
import {useBooks} from "../../api/booksapi";
import {NavButtonBar} from "../../components/ui/NavButton";

export function BookListPage() {
    const {books} = useBooks();

    return (
        <>
            <BookList books={books}/>
            <NavButtonBar>
                <NewBookButton/>
            </NavButtonBar>
        </>
    )
}