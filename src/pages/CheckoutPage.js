import React from 'react';
import styled from 'styled-components';
import { PageHero, StripeCheckout } from '../components';
// extra imports
import { useCartContext } from '../context/cart_context';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/user_context';

const CheckoutPage = () => {
    const { myUser } = useUserContext();
    return (
        <main>
            <PageHero title='checkout' />
            <Wrapper className='page'>
                <h4>checkout here</h4>
                <h5>{`Hi ${myUser.given_name}`}</h5>
                <h5>Thank you for shopping !</h5>
                <h5>we accept all credit cards.</h5>
            </Wrapper>
        </main>
    );
};
const Wrapper = styled.div`
    /* margin: 2rem auto; */

    h4,
    h5 {
        display: flex;
        justify-content: center;
        margin: 1rem auto;
    }
    h4 {
        margin-bottom: 3rem;
    }
`;
export default CheckoutPage;
