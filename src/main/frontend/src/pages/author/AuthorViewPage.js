import {useParams} from "react-router-dom";
import React from "react";
import {BookList} from "../../components/book/BookList";
import {NavButtonBar, NavButtonHome} from "../../components/ui/NavButton";
import {useAuthor} from "../../api/authorsapi";
import {DeleteAuthorButton, EditAuthorButton, NewAuthorButton} from "../../components/author/AuthorButtons";
import {SubCollection} from "../../components/ui/SubCollection";

function AuthorName(props) {
    const {author} = props;
    return <h1>{author?.name}</h1>;
}

function AuthorDescription(props) {
    const {author} = props;
    if (!author?.description) return;

    return (
        <div className="border-top border-1 mt-2 py-4 px-5">
            {author?.description}
        </div>
    )
}

function AuthorCountry(props) {
    const {author} = props;
    if (!author?.country) return;

    return (
        <div className="mt-3 py-2 px-5">
            {author?.country}
        </div>
    )
}

function BooksByAuthor(props) {
    const {author} = props;

    if (!author?.books?.length) return;
    return (
        <SubCollection title="books">
            <BookList books={author.books}/>
        </SubCollection>
    )
}

export function AuthorViewPage() {
    const {id} = useParams();
    const {author} = useAuthor(id);

    if (!author) return <>author not found</>;

    return (
        <>
            <div className="border border-primary border-2 ">
                <AuthorName author={author}/>
                <AuthorCountry author={author}/>
                <AuthorDescription author={author}/>
            </div>
            <BooksByAuthor author={author}/>
            <NavButtonBar>
                <NavButtonHome/>
                <NewAuthorButton/>
                <EditAuthorButton author={author}/>
                <DeleteAuthorButton author={author}/>
            </NavButtonBar>
        </>
    )
}