import {IfLoggedIn} from "../auth/IfLoggedIn";
import {NavButtonLink, NavButtonOnClick} from "../ui/NavButton";
import {MdAdd, MdDelete, MdEdit} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {useAuthorMutations} from "../../api/authorsapi";

export function NewAuthorButton() {
    return (
        <IfLoggedIn>
            <NavButtonLink to="/authors/new">
                <MdAdd color="inherit"/>
            </NavButtonLink>
        </IfLoggedIn>
    );
}

export function EditAuthorButton(props) {
    const {author} = props;
    return (
        <IfLoggedIn>
            <NavButtonLink to={`/authors/edit/${author?.id}`}>
                <MdEdit color="inherit"/>
            </NavButtonLink>
        </IfLoggedIn>
    );
}

export function DeleteAuthorButton(props) {
    const {author} = props;
    const {deleteAuthor} = useAuthorMutations();
    const navigate = useNavigate();

    return (
        <IfLoggedIn>
            <NavButtonOnClick onClick={async () => {
                deleteAuthor(author);
                navigate("/authors");
            }}>
                <MdDelete color="inherit"/>
            </NavButtonOnClick>
        </IfLoggedIn>
    );
}
