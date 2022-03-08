import {Paragraph, Title} from 'react-native-paper';
import styled from 'styled-components/native';

export const Main = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
}))<{backgroundColor: string}>`
  flex: 1;
  background-color: ${({backgroundColor}) => backgroundColor};
`;

export const ActivityIndicatorWrapper = styled.View`
  position: absolute;
  align-items: center;
  justify-content: center;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 1;
`;

export const BigText = styled(Title)<{textColor: string}>`
  color: ${({textColor}) => textColor};
`;

export const SmallText = styled(Paragraph)<{textColor: string}>`
  color: ${({textColor}) => textColor};
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  padding: 24px 16px;
`;
