import {dummyData} from "../data/dummyData";

const DEFAULT_HEADERS = {
    'Content-Type': 'application/json;charset=utf-8',
    'X-Requested-With': 'XMLHttpRequest'
};
const HTTP_STATUS_NO_CONTENT = 204;
const HTTP_STATUS_UNAUTHORIZED = 401;
const HTTP_STATUS_FORBIDDEN = 403;

function FetchError(messageForUser) {
    const error = new Error();
    error.messageForUser = messageForUser;
    return error;
}

//addCsrf header is only necessary for POST/PUT/DELETE, not for GET
//we get the csrf-token from the cookie and add it in the X-XSRF-TOKEN header
function getHeaders(addCsrf, addExtraHeaders) {
    const headersWithExtra = {...DEFAULT_HEADERS, ...addExtraHeaders};
    if (!addCsrf) return headersWithExtra;

    const cookie = document.cookie.match(new RegExp('XSRF-TOKEN=([^;]+)'));
    const csrfToken = cookie && cookie[1];
    // console.log({csrfToken});
    if (!csrfToken) return headersWithExtra;

    return {...headersWithExtra, 'X-XSRF-TOKEN': csrfToken};
}

async function fetchCommon(method, url, bodyObject, addCsrf, addExtraHeaders) {
    let result = undefined;
    console.log(`${method} ${url}: start`);
    const fetchOptions = {
        method: method,
        headers: getHeaders(addCsrf, addExtraHeaders),
        body: JSON.stringify(bodyObject)
    };
    //exceptions will be catched by the use-mutations
    const response = await fetch(url, fetchOptions);

    if (response.ok) {
        result = (response.status !== HTTP_STATUS_NO_CONTENT) ? await response.json() : {};
    } else {
        if (response.status === HTTP_STATUS_UNAUTHORIZED || response.status === HTTP_STATUS_FORBIDDEN) {
            throw new FetchError("not logged in.")
        } else {
            const responseBody = await response.json();
            const errorMessage = responseBody.errors &&
                responseBody.errors.reduce((accumulator, error) => `${accumulator} ${error.defaultMessage}  --- `, "--- ");
            throw new FetchError(errorMessage || responseBody.message);
        }
    }
    return result;
}

//attention: dummyData may mock the fetch
export async function fetchGET(url) {
    return dummyData(url) || await fetchCommon("GET", url, undefined);
}

export async function fetchGETWithExtraHeaders(url, addExtraHeaders) {
    return await fetchCommon("GET", url, undefined, false, addExtraHeaders);
}

export async function fetchPUT(url, bodyObject) {
    return await fetchCommon("PUT", url, bodyObject, true);
}

export async function fetchPOST(url, bodyObject) {
    return await fetchCommon("POST", url, bodyObject, true);
}

export async function fetchDELETE(url) {
    return await fetchCommon("DELETE", url, undefined, true);
}
