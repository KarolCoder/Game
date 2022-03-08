import styled from 'styled-components/native';
import {Button, Title} from 'react-native-paper';

export const StarWarsImage = styled.ImageBackground`
  flex: 1;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const ButtonWrapper = styled.View`
  width: 100%;
  margin-top: auto;
  padding: 0px 16px;
`;

export const BottomButton = styled(Button)`
  margin-bottom: 16px;
`;

export const TopText = styled(Title)<{textColor: string}>`
  margin-top: 40px;
  color: ${({textColor}) => textColor};
`;
