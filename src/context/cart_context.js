import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/cart_reducer';
import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    TOGGLE_CART_ITEM_AMOUNT,
    CLEAR_CART,
    COUNT_CART_TOTALS,
    CLEAR_FILTERS,
} from '../actions';

// this function will check weather we have data in local storage by a key of cart. if we do than do cart = {that}, if not then empty array
const getLocalStorage = () => {
    let cart = localStorage.getItem('cart');

    // if cart is not empty, then get data from it
    if (cart) {
        return JSON.parse(localStorage.getItem('cart'));
    } else {
        return [];
    }
};

const initialState = {
    cart: getLocalStorage(),
    total_items: 0,
    total_amount: 0,
    shipping_fee: 534, //shipping fee is 5$ 34cents
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        // set local storage with cart state
        localStorage.setItem('cart', JSON.stringify(state.cart));
        dispatch({ type: COUNT_CART_TOTALS });
    }, [state.cart]);

    // add to cart
    const addToCart = (id, color, amount, product) => {
        dispatch({
            type: ADD_TO_CART,
            payload: { id, color, amount, product },
        });
        return;
    };

    //remove item
    const removeItem = (id) => {
        dispatch({ type: REMOVE_CART_ITEM, payload: id });
    };

    // toggle amount
    const toggleAmount = (id, value) => {
        dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
    };
    // clear cart
    const clearCart = () => {
        dispatch({ type: CLEAR_CART });
    };

    return (
        <CartContext.Provider
            value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};
// make sure use
export const useCartContext = () => {
    return useContext(CartContext);
};
