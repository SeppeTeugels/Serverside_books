import React, {useCallback} from "react";
import {useMessageContext} from "../../contexts/messagecontext";
import {FiAlertTriangle} from 'react-icons/fi';
import {MdSync} from 'react-icons/md';
import {Alert} from "react-bootstrap";

export function MessageBar() {
    const {message, clearAllMessages, error, isLoading} = useMessageContext();

    const getNoteColor = useCallback(() => {
        if (error) return `danger`;
        if (isLoading || message) return 'primary';
        return "";
    }, [error, isLoading, message]);

    const getMessageToShow = useCallback(() => {
        if (error) return <><FiAlertTriangle className="icons-message-class-name"/> {error}</>;
        if (isLoading) return <MdSync className="icons-message-class-name"/>;
        return message || <>&nbsp;</>;
    }, [error, isLoading, message]);

    return <Alert variant={getNoteColor()}
                  onClick={() => clearAllMessages()}
                  className="fixed-bottom m-0 text-center"
                  style={{zIndex: 9999}}>
        <span>{getMessageToShow()}</span>
    </Alert>

}