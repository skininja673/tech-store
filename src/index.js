import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { ProductsProvider } from './context/products_context';
import { FilterProvider } from './context/filter_context';
import { CartProvider } from './context/cart_context';
import { UserProvider } from './context/user_context';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
/**
 * dev-jtiqp0hfnxo5y08o.us.auth0.com
 * EfcTVmJPLzC6vo6YWO34HrBuCKaxrCnZ
 */

root.render(
    <Auth0Provider
        domain={process.env.REACT_APP_AUTH_DOMAIN}
        // clientId='OXRaDfg2uwUDlFDT03LUFgOswdkPDo4J'
        clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
        authorizationParams={{
            redirect_uri: window.location.origin,
        }}
    >
        <UserProvider>
            <ProductsProvider>
                <FilterProvider>
                    <CartProvider>
                        <App />
                    </CartProvider>
                </FilterProvider>
            </ProductsProvider>
        </UserProvider>
    </Auth0Provider>
);
