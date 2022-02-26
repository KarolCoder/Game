import styled from 'styled-components/native';

export const Spacer = styled.View<{width?: number; height?: number}>`
  width: ${({width}) => (width ? width : 0)}px;
  height: ${({height}) => (height ? height : 0)}px;
`;
