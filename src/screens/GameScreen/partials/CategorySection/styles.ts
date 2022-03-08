import styled, {css} from 'styled-components/native';
import {Button} from 'react-native-paper';

export const OptionButton = styled(Button)<{isActive?: boolean}>`
  padding: ${({isActive}) => (isActive ? '0px 4px' : '4px')};
  flex: 1;
  justify-content: center;
  ${({isActive}) =>
    isActive &&
    css`
      border: 4px solid #ffffff;
    `}
`;
