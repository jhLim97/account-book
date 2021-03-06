import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { MAX_MOBILE_DEVICE } from '../../utils/constant/device-size';

export const Wrapper = styled.header`
    width: 100vw;
    min-width: 228px;
    height: 100px;

    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;

    border-radius: 3px;
    box-sizing: border-box;
    box-shadow: ${({ theme }) => theme.shadow.pale};

    background-color: ${({ theme }) => theme.color.darkBlue};

    @media screen and (max-width: ${MAX_MOBILE_DEVICE}px) {
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;

        border-radius: 0px;
    }
`;

export const Title = styled.h1`
    margin: 0px 15px;

    font-weight: bold;
    font-family: sans-serif;
    font-size: ${({ theme }) => theme.fontSize.medium};

    color: ${({ theme }) => theme.color.white};
`;

export const DateBox = styled.div`
    margin: 7px 0px 0px 0px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    font-size: ${({ theme }) => theme.fontSize.small};
`;

export const ArrowButton = styled.button`
    margin: 3px 0px 0px 15px;
`;

export const Date = styled.strong`
    margin-left: 15px;

    font-weight: bold;
    color: ${({ theme }) => theme.color.white};
`;

export const PageBox = styled.div`
    margin: 7px 0px 0px 20px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    @media screen and (max-width: ${MAX_MOBILE_DEVICE}px) {
        margin-left: 0px;
    }
`;

export const PageTarget = styled(Link)`
    margin-left: 10px;
    text-decoration: none;

    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSize.small};

    color: ${({ theme }) =>
        (props) =>
            props.selected ? theme.color.white : theme.color.black};

    &:hover {
        cursor: pointer;
        color: ${({ theme }) => theme.color.white};
    }
`;
