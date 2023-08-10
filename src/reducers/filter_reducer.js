import {
    LOAD_PRODUCTS,
    SET_LISTVIEW,
    SET_GRIDVIEW,
    UPDATE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
    if (action.type === LOAD_PRODUCTS) {
        // we need to know the most expensive product and cheapest product will be 0
        let maxPrice = action.payload.map((p) => p.price);
        maxPrice = Math.max(...maxPrice);

        return {
            ...state,
            all_products: [...action.payload],
            filtered_products: [...action.payload],
            filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
        };
    }

    if (action.type === SET_GRIDVIEW) {
        return { ...state, grid_view: true };
    }
    if (action.type === SET_LISTVIEW) {
        return { ...state, grid_view: false };
    }
    if (action.type === UPDATE_SORT) {
        return { ...state, sort: action.payload };
    }

    if (action.type === SORT_PRODUCTS) {
        const { sort, filtered_products } = state;
        let tempProducts = [...filtered_products];

        if (sort === 'price-lowest') {
            tempProducts = tempProducts.sort((a, b) => a.price - b.price);
            // tempProducts = tempProducts.sort((a, b) => {
            //     if (b.price > a.price) return -1;
            //     if (b.price < a.price) return +1;
            //     return 0;
            // });
        }
        if (sort === 'price-highest') {
            // long way to compare sort, unlike the first one
            tempProducts = tempProducts.sort((a, b) => {
                if (b.price < a.price) return -1;
                if (b.price > a.price) return +1;
                return 0;
            });
            // tempProducts = tempProducts.sort((a, b) => b.price - a.price);
        }
        if (sort === 'name-a') {
            tempProducts = tempProducts.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
        }
        if (sort === 'name-z') {
            tempProducts = tempProducts.sort((a, b) =>
                b.name.localeCompare(a.name)
            );
        }
        return { ...state, filtered_products: tempProducts };
    }

    // -----------------------------
    if (action.type === UPDATE_FILTERS) {
        const { name, value } = action.payload;

        return { ...state, filters: { ...state.filters, [name]: value } };
    }

    if (action.type === FILTER_PRODUCTS) {
        // [...all_products] means a fresh copy of all_products
        const { all_products } = state;
        let tempProducts = [...all_products];
        // const {
        //     filters: {
        //         text,
        //         category,
        //         company,
        //         color,
        //         min_price,
        //         max_price,
        //         price,
        //         shipping,
        //     },
        // } = state;
        const {
            text,
            category,
            company,
            color,
            min_price,
            max_price,
            price,
            shipping,
        } = state.filters;

        // filtering starts
        // if text is not empty then
        if (text) {
            tempProducts = tempProducts.filter((product) =>
                product.name.toLowerCase().startsWith(text)
            );
        }

        // category
        if (category !== 'all') {
            tempProducts = tempProducts.filter(
                (product) => product.category === category
            );
        }

        // company
        if (company !== 'all') {
            tempProducts = tempProducts.filter(
                (product) => product.company === company
            );
        }

        // color
        if (color !== 'all') {
            tempProducts = tempProducts.filter((product) => {
                return product.colors.find((c) => c === color);
            });
        }

        // shipping
        if (shipping) {
            tempProducts = tempProducts.filter(
                (product) => product.shipping === true
            );
        }

        // price
        tempProducts = tempProducts.filter((product) => product.price <= price);

        return { ...state, filtered_products: tempProducts };
    }

    if (action.type === CLEAR_FILTERS) {
        return {
            ...state,
            filters: {
                // text is for search box
                ...state.filters,
                text: '',
                category: 'all',
                company: 'all',
                color: 'all',
                price: state.filters.max_price,
                shipping: false,
            },
        };
    }
    throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
