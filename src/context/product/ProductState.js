import ProductContext from "./ProductContext";
import React, { useContext, useReducer } from 'react';

export default function ProductState(props) {
    return (
        <ProductContext.Provider value={useReducer(props.reducer, props.initialState)}>
            {props.children}
        </ProductContext.Provider>
    )
}

export const useStateValue = () => useContext(ProductContext);