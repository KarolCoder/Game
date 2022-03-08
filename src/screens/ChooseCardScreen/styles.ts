import {Paragraph, Title, Button} from 'react-native-paper';
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

export const CategoryBox = styled.View`
  justify-content: center;
  align-items: center;
`;

export const BigText = styled(Title)<{textColor: string}>`
  color: ${({textColor}) => textColor};
`;

export const SmallText = styled(Paragraph)<{textColor: string}>`
  color: ${({textColor}) => textColor};
`;

export const SelectTitle = styled(Title)<{textColor: string}>`
  margin: 24px 0px 12px;
  color: ${({textColor}) => textColor};
`;
export const Row = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  padding: 24px 16px;
`;

export const Card = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: white;
  aspect-ratio: 0.6;
  flex: 1;
  border-radius: 8px;
`;

export const BottomButton = styled(Button)`
  padding: 4px 8px;
  flex: 1;
`;
