import React, {createContext, useCallback, useContext, useMemo} from 'react';
import {useMessageContext} from "./messagecontext";
import {fetchGET, fetchGETWithExtraHeaders, fetchPOST} from "../api/fetch";
import {useQuery, useQueryClient} from "@tanstack/react-query";

const AuthenticationContext = createContext();

const REACT_QUERY_ID_USERNAME = "username";

const AUTH_URL = "/api/authenticate";
const SIGNUP_URL = "/api/signup";
const LOGOUT_URL = "/logout";

const authQueryConfig = {
    staleTime: 0,
    cacheTime: 1000 * 60 * 5,
    retry: false
}

export function useAuthenticated() {
    const result = useQuery({
        queryKey: [REACT_QUERY_ID_USERNAME],
        queryFn: async () => {
            try {
                return await fetchGET(AUTH_URL) || ""
            } catch (e) {
                return ""; //means not logged in
            }
        },
        ...authQueryConfig
    });
    return {...result, username: result.data?.username};
}

export function AuthenticationProvider(props) {
    const {username} = useAuthenticated();
    const {setError} = useMessageContext();
    const queryClient = useQueryClient()

    const authenticate = useCallback(async (username, password) => {
        const extraHeaders = {authorization: "Basic " + window.btoa(`${username}:${password}`)};
        try {
            return await fetchGETWithExtraHeaders(AUTH_URL, extraHeaders);
        } catch (e) {
            setError({messageForUser: "username/password not correct"});
        } finally {
            queryClient.invalidateQueries([REACT_QUERY_ID_USERNAME])
        }
    }, [setError, queryClient]);

    const signup = useCallback(async (username, email, password) => {
        try {
            return await fetchPOST(SIGNUP_URL, {username, email, password});
        } catch (e) {
            setError({messageForUser: "unable to register username/password"});
        } finally {
            queryClient.invalidateQueries([REACT_QUERY_ID_USERNAME])
        }
    }, [setError, queryClient]);

    const logout = useCallback(async () => {
        try {
            return await fetchPOST(LOGOUT_URL);
        } finally {
            await queryClient.invalidateQueries([REACT_QUERY_ID_USERNAME])
        }
    }, [queryClient]);

    const isLoggedIn = useMemo(() => !!username, [username]);

    const api = useMemo(() => ({
            username,
            authenticate,
            signup,
            logout,
            isLoggedIn
        }), [username, authenticate, signup, logout, isLoggedIn]
    );

    return (
        <AuthenticationContext.Provider value={api}>
            {props.children}
        </AuthenticationContext.Provider>
    )
}

export const useAuthenticationContext = () => useContext(AuthenticationContext);
