import styled, { keyframes } from 'styled-components';

import { MAX_MOBILE_DEVICE } from '../../utils/constant/device-size';

export const Wrapper = styled.div`
    width: 50%;

    @media screen and (max-width: ${MAX_MOBILE_DEVICE}px) {
        width: 100%;
    }
`;

const draw = (dashOffset) => keyframes`
    100% {
            stroke-dashoffset: ${dashOffset};
    }
`;

export const DonutCircle = styled.circle`
    cx: ${(props) => props.cx};
    cy: ${(props) => props.cy};
    r: ${(props) => props.r};
    fill: ${(props) => props.fill};

    stroke: ${(props) => props.color};
    stroke-width: ${(props) => props.width};
    stroke-dasharray: ${(props) => props.dashArray};
    stroke-dashoffset: ${(props) => props.dashArray};
    transform: rotate(${(props) => props.angle}deg);
    transform-origin: ${(props) => props.cx}px ${(props) => props.cy}px;

    animation: ${(props) => draw(props.dashOffset)} ${(props) => props.currentDuration}ms
        ${(props) => props.delay}ms linear forwards;
`;
