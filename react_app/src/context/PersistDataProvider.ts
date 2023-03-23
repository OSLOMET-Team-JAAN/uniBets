import { useState, useEffect } from 'react';
import {ICSVdata} from "../models/ICSVdata";


// This hook receives two parameters:
// storageKey: This is the name of our storage that gets used when we retrieve/save our persistent data.
// initialState: This is our default value, but only if the store doesn't exist, otherwise it gets overwritten by the store.
export default (storageKey: string, initialState: any): any => {

    // Initiate the internal state.
    const [state, setInternalState] = useState(initialState);

    // Only on our initial load, retrieve the data from the store and set the state to that data.
    useEffect(() => {

        // Retrieve the data from the store.
        const storage = localStorage.getItem(storageKey);

        // If the store exists, overwrite the state with the store's data.
        // Otherwise if the store doesn't exist then "initialState" remains our default value.
        if (storage) return setInternalState(JSON.parse(storage));
    }, []);
   
    // Create a replacement method that will set the state like normal, but that also saves the new state into the store.
    const setState = (newState: any) => {
        let newJSONData = JSON.stringify(newState)
        localStorage.setItem(storageKey, newJSONData);
        setInternalState(JSON.parse(newJSONData));
    };

    return [state, setState];
};