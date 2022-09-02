import {useBook} from "../../api/booksapi";
import {Link, useParams} from "react-router-dom";
import {DeleteBookButton, EditBookButton, NewBookButton} from "../../components/book/BookButtons";
import React from "react";
import {BookList} from "../../components/book/BookList";
import {NavButtonBar, NavButtonHome} from "../../components/ui/NavButton";
import {SubCollection} from "../../components/ui/SubCollection";

function BookTitle(props) {
    const {book} = props;
    return <h1>{book?.title}</h1>;
}

function AuthorName(props) {
    const {author} = props;

    return <span className="fw-bold">
        <Link to={`/authors/view/${author.id}`}>
            {author.name}
        </Link>
    </span>
}

function BookAuthors(props) {
    const {book} = props;
    return <div>
        by {" "}
        {book?.authors?.map((a, index) => <span key={a.id}>{index ? ", " : ""}<AuthorName author={a}/></span>)}
    </div>;
}

function BookSerie(props) {
    const {book} = props;

    if (!book?.serie) return;
    return (
        <div className="mt-1 py-2 px-5">
            Serie: {book.serie.name} (nr {book.nrInSerie})
        </div>
    )
}

function BookDescription(props) {
    const {book} = props;
    if (!book?.description) return;

    return (
        <div className="border-top mt-3 py-2 px-5">
            {book?.description}
        </div>
    )
}

function BookSameSerie(props) {
    const {book} = props;

    if (!book?.booksSameSerie) return;
    return (
        <SubCollection title="books in this serie">
            <BookList books={book.booksSameSerie}/>
        </SubCollection>
    )
}

function BookSameAuthors(props) {
    const {book} = props;

    if (!book?.booksSameAuthors?.length) return;

    return (
        <SubCollection title="books by same author(s)">
            <BookList books={book.booksSameAuthors}/>
        </SubCollection>
    )
}

export function BookViewPage() {
    const {id} = useParams();
    const {book} = useBook(id);

    if (!book) return <>book not found</>;

    return (
        <>
            <div className="border border-primary border-2 ">
                <BookTitle book={book}/>
                <BookAuthors book={book}/>
                <BookSerie book={book}/>
                <BookDescription book={book}/>
            </div>
            <BookSameSerie book={book}/>
            <BookSameAuthors book={book}/>
            <NavButtonBar>
                <NavButtonHome/>
                <NewBookButton/>
                <EditBookButton book={book}/>
                <DeleteBookButton book={book}/>
            </NavButtonBar>
        </>
    )
}