import styled, { css } from 'styled-components/native';

interface FlexBoxProps {
    width?: string; 
    height?: string;
    bgColor?: string;
}

export const FlexBox = styled.View<FlexBoxProps>`
    ${({ width, height, bgColor }) => css`
        width: ${width || '100px'};
        height: ${height || '100px'};
        background-color: ${bgColor || 'blue'};
    `}
`