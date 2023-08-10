import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/filter_reducer';
import {
    LOAD_PRODUCTS,
    SET_GRIDVIEW,
    SET_LISTVIEW,
    UPDATE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
} from '../actions';

import { useProductsContext } from './products_context';

const initialState = {
    filtered_products: [],
    all_products: [],
    grid_view: true,
    sort: 'price-lowest',
    filters: {
        // text is for search box
        text: '',
        category: 'all',
        company: 'all',
        color: 'all',
        min_price: 0,
        max_price: 0,
        price: 0,
        shipping: false,
    },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
    const { products } = useProductsContext();
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({ type: LOAD_PRODUCTS, payload: products });
    }, [products]);

    useEffect(() => {
        // this will sort the products
        dispatch({ type: SORT_PRODUCTS });
        dispatch({ type: FILTER_PRODUCTS });
    }, [state.sort, products, state.filters]);

    const setGridView = () => {
        dispatch({ type: SET_GRIDVIEW });
    };
    const setListView = () => {
        dispatch({ type: SET_LISTVIEW });
    };

    const updateSort = (e) => {
        // name of the select, if there were multiple selects
        // then to recognize we would go for name

        const value = e.target.value;
        dispatch({ type: UPDATE_SORT, payload: value });
    };

    const updateFilters = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        // if name is category that means we are clicking on button
        if (name === 'category') {
            value = e.target.textContent;
        }

        if (name === 'color') {
            value = e.target.dataset.color;
        }

        // when user change the input range, then value is converted from int to string. we need to cast.
        if (name === 'price') {
            value = Number(value);
        }

        if (name === 'shipping') {
            value = e.target.checked;
        }
        dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
    };

    const clearFilters = () => {
        dispatch({ type: CLEAR_FILTERS });
    };

    return (
        <FilterContext.Provider
            value={{
                ...state,
                setGridView,
                setListView,
                updateSort,
                updateFilters,
                clearFilters,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};
// make sure use
export const useFilterContext = () => {
    return useContext(FilterContext);
};
