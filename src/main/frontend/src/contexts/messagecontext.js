import React, {createContext, useCallback, useContext, useMemo, useState} from 'react';

const MessageContext = createContext();


export function MessageProvider(props) {
    const [message, setMessage] = useState();
    const [error, setErrorState] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const setError = useCallback((exception) => {
        const errorMessage = exception.messageForUser || "Connection error";
        setErrorState(errorMessage);
        console.log(errorMessage, exception);
    }, []);

    //clear message and error
    const clearAllMessages = useCallback(() => {
        setMessage();
        setErrorState();
    }, []);

    const api = useMemo(() => ({
            message, setMessage, error, setError, isLoading, setIsLoading, clearAllMessages
        }), [message, setMessage, error, setError, isLoading, setIsLoading, clearAllMessages]
    );

    return (
        <MessageContext.Provider value={api}>
            {props.children}
        </MessageContext.Provider>
    )
}

export const useMessageContext = () => useContext(MessageContext);
