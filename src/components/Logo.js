import styled from 'styled-components';
import React from 'react';

const Logo = () => {
    return (
        <Wrapper>
            <span>Tech</span>Store
        </Wrapper>
    );
};

const Wrapper = styled.h3`
    margin-bottom: 0;
    color: var(--clr-grey-1);
    span {
        color: var(--clr-primary-5);
    }
`;

export default Logo;
