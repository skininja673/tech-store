import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import {
    About,
    Home,
    SingleProduct,
    Cart,
    Checkout,
    Error,
    Products,
    PrivateRoute,
} from './pages';

function App() {
    return (
        <Router>
            <Navbar />
            <Sidebar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='about' element={<About />} />
                <Route path='cart' element={<Cart />} />
                <Route path='products' element={<Products />} />
                <Route path='products/:id' element={<SingleProduct />} />
                <Route path='*' element={<Error />} />
                <Route
                    path='checkout'
                    element={
                        <PrivateRoute>
                            <Checkout />
                        </PrivateRoute>
                    }
                />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
