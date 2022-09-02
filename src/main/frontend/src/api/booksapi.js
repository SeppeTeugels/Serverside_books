import {useMessageContext} from "../contexts/messagecontext";
import {useQuery} from "@tanstack/react-query";
import {fetchDELETE, fetchGET, fetchPOST, fetchPUT} from "./fetch";
import {useMyMutation} from "./mymutation";

const REACT_QUERY_ID_BOOKS = "books";
const BASE_URL = "/api/books";

const bookQueryConfig = {
    staleTime: 0,
    cacheTime: 1000 * 60 * 5,
}

export const BOOK_EMPTY ={title: "", authorIds: [], description: ""};

export function useBooks() {
    const {setError} = useMessageContext();

    const result = useQuery({
        queryKey: [REACT_QUERY_ID_BOOKS],
        queryFn: async () => await fetchGET(BASE_URL),
        onError: e => setError(e),
        ...bookQueryConfig
    });
    return {...result, books: result.data};
}

export function useBook(id) {
    const {setError} = useMessageContext();

    const result = useQuery({
        queryKey: [REACT_QUERY_ID_BOOKS, id],
        queryFn: async () => id ? await fetchGET(`${BASE_URL}/${id}`) : {},
        onError: e => setError(e),
        ...bookQueryConfig
    });
    return {...result, book: result.data};
}

export function useBookMutations() {
    async function createFunction(book) {
        if (!book) return;
        const savedBook = await fetchPOST(BASE_URL, book);
        if (!savedBook) return;
        return await fetchPUT(`${BASE_URL}/${savedBook.id}/authors`, book.authorIds);
    }

    async function editFunction(book) {
        if (!book) return;
        const savedBook = await fetchPUT(`${BASE_URL}/${book.id}`, book);
        if (!savedBook) return;
        return await fetchPUT(`${BASE_URL}/${savedBook.id}/authors`, book.authorIds);
    }

    async function deleteFunction(book) {
        return await fetchDELETE(`${BASE_URL}/${book.id}`)
    }

    return {
        createBook: useMyMutation(createFunction, REACT_QUERY_ID_BOOKS, book => `book ${book.title} created`),
        editBook: useMyMutation(editFunction, REACT_QUERY_ID_BOOKS, book => `book ${book.title} modified`),
        deleteBook: useMyMutation(deleteFunction, REACT_QUERY_ID_BOOKS, book => `book ${book.title} deleted.`)
    };

}