import {IfLoggedIn} from "../auth/IfLoggedIn";
import {useNavigate} from "react-router-dom";
import {MdAdd, MdDelete, MdEdit} from "react-icons/md";
import React from "react";
import {useBookMutations} from "../../api/booksapi";
import {NavButtonLink, NavButtonOnClick} from "../ui/NavButton";

export function NewBookButton() {
    return (
        <IfLoggedIn>
            <NavButtonLink to="/books/new">
                <MdAdd color="inherit"/>
            </NavButtonLink>
        </IfLoggedIn>
    );
}

export function EditBookButton(props) {
    const {book} = props;
    return (
        <IfLoggedIn>
            <NavButtonLink to={`/books/edit/${book?.id}`}>
                <MdEdit color="inherit"/>
            </NavButtonLink>
        </IfLoggedIn>
    );
}

export function DeleteBookButton(props) {
    const {book} = props;
    const {deleteBook} = useBookMutations();
    const navigate = useNavigate();

    return (
        <IfLoggedIn>
            <NavButtonOnClick onClick={async () => {
                deleteBook(book);
                navigate("/");
            }}>
                <MdDelete color="inherit"/>
            </NavButtonOnClick>
        </IfLoggedIn>
    );
}

