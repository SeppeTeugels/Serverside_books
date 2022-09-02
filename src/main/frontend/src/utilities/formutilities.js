import {useCallback, useEffect, useState} from "react";

/** Usage:
 * Hook useForm initializes some simple utilities that are useful in a form.
 * The hook holds a state tempObject. This state is initialized from the result of a function: initialObjectInitializer.
 * You can use the change-functions in the onChange-callbacks of the FormControls.
 * You can use the latest version of tempObject in your obSubmit function.
 *
 * Function initialObjectInitializer and object initialObject are used to initialize tempObject.
 * Function initialObjectInitializer is required.
 * Object initialObject is not required. It is needed to reset the initial-state when this initialObject changes.
 *
 * Attention: functionInitialObjectInitializer has to be the same on each render
 *      so either it is a function outside a Component or else wrap it in useCallback
 *
 * If initialObject never changes then pass only the function
 * Eg: when the form creates a new book, initialObject is always the same object with empty fields.
 * So in that case the function is sufficient.
 *
 * If initialObject can change you have to provide an initialObjectInitializer function and also the initialObject object.
 * Eg: when the form edits a new book - and the book possibly has be re-fetched from the database by react-query
 * In that case you also pass the object.
 */
export function useForm(initialObjectInitializer, initialObject) {
    const [tempObject, setTempObject] = useState(() => initialObjectInitializer(initialObject));

    const onChange = useCallback((event, fieldName) => {
        const newTempObject = {...tempObject};
        newTempObject[fieldName] = event.target.value;
        setTempObject(newTempObject);
    }, [tempObject]);

    const onChangeNumber = useCallback((event, fieldName) => {
        const newTempObject = {...tempObject};
        newTempObject[fieldName] = parseInt(event.target.value) || null;
        setTempObject(newTempObject);
    }, [tempObject]);

    //function for a normal input field type select (==Form.Control as="select"
    //the selected options are marked with property selected
    //also works for multiple select
    const onChangeInputTypeSelect = useCallback((event, fieldName) => {
        const newTempObject = {...tempObject};
        newTempObject[fieldName] = Array.from(event.target.options).filter(o => o.selected).map(o => o.value);
        setTempObject(newTempObject);
    }, [tempObject]);

    //function for a input field from package react-select
    //the event parameter is an array of selected options
    //each options is a pair {value, label}
    //see https://react-select.com/props
    const onReactSelect = useCallback((event, fieldName) => {
        const newTempObject = {...tempObject};
        newTempObject[fieldName] = event.map(o => o.value);
        setTempObject(newTempObject);
    }, [tempObject]);

    const resetTempObject = useCallback(() => {
        setTempObject(initialObjectInitializer(initialObject));
    }, [initialObject, initialObjectInitializer]);

    useEffect(() => resetTempObject(), [resetTempObject]);

    return {
        tempObject,
        setTempObject,
        onChange,
        onChangeNumber,
        onChangeInputTypeSelect,
        onReactSelect,
        resetTempObject
    };
}



