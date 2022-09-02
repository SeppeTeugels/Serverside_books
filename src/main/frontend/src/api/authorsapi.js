import {fetchDELETE, fetchGET, fetchPOST, fetchPUT} from "./fetch";
import {useMessageContext} from "../contexts/messagecontext";
import {useQuery} from "@tanstack/react-query";
import {useMyMutation} from "./mymutation";

const REACT_QUERY_ID_AUTHORS = "authors";
const BASE_URL = "/api/authors";

const authorQueryConfig = {
    staleTime: 0,
    cacheTime: 1000 * 60 * 5,
}

export const AUTHOR_EMPTY = {name: "", country: "", description: "",};

export function useAuthors() {
    const {setError} = useMessageContext();

    const result = useQuery({
        queryKey: [REACT_QUERY_ID_AUTHORS],
        queryFn: async () => await fetchGET(BASE_URL),
        onError: e => setError(e),
        ...authorQueryConfig
    });
    return {...result, authors: result.data};
}

export function useAuthor(id) {
    const {setError} = useMessageContext();

    const result = useQuery({
        queryKey: [REACT_QUERY_ID_AUTHORS, id],
        queryFn: async () => id ? await fetchGET(`${BASE_URL}/${id}`) : {},
        onError: e => setError(e),
        ...authorQueryConfig
    });
    return {...result, author: result.data};
}

export function useAuthorMutations() {
    async function createFunction(author) {
        if (!author) return;
        return await (fetchPOST(BASE_URL, author));
    }

    async function editFunction(author) {
        if (!author) return;
        return await fetchPUT(`${BASE_URL}/${author.id}`, author);
    }

    async function deleteFunction(author) {
        return await fetchDELETE(`${BASE_URL}/${author.id}`)
    }

    return {
        createAuthor: useMyMutation(createFunction, REACT_QUERY_ID_AUTHORS, author => `author ${author.name} created.`),
        editAuthor: useMyMutation(editFunction, REACT_QUERY_ID_AUTHORS, author => `author ${author.name} modified.`),
        deleteAuthor: useMyMutation(deleteFunction, REACT_QUERY_ID_AUTHORS, author => `author ${author.title} deleted.`)

    }
}