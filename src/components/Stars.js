import React from 'react';
import styled from 'styled-components';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
const Stars = ({ stars, reviews }) => {
    // return <h4>stars</h4>;

    // return (
    //     <div>
    //         {Array(4)
    //             .fill(true)
    //             .map((item) => (
    //                 <BsStarFill />
    //             ))}
    //     </div>
    // );

    const tempStars = Array.from({ length: 5 }, (_, index) => {
        // index can vary from 0 to 4
        //valid number will be either: 0 or 0.5 or 1 or 1.5 or 2 or 2.5 or 3 or 3.5 or 4 or 4.5 or 5
        const number = index + 0.5;
        return (
            <span key={index}>
                {stars >= index + 1 ? (
                    <BsStarFill />
                ) : stars >= number ? (
                    <BsStarHalf />
                ) : (
                    <BsStar />
                )}
            </span>
        );
    });

    return (
        <Wrapper>
            {/* stars manually rendered */}
            <div className='stars'>{tempStars}</div>

            {/* reviews */}
            <p className='reviews'>({reviews} customer reviews)</p>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    span {
        color: #ffb900;
        font-size: 1rem;
        margin-right: 0.25rem;
    }
    p {
        margin-left: 0.5rem;
        margin-bottom: 0;
    }
    margin-bottom: 0.5rem;
`;
export default Stars;
