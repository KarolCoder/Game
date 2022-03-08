import {Title} from 'react-native-paper';
import styled from 'styled-components/native';

export const Card = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: white;
  aspect-ratio: 0.6;
  flex: 1;
  border-radius: 8px;
`;

export const SelectTitle = styled(Title)<{textColor: string}>`
  margin: 24px 0px 12px;
  color: ${({textColor}) => textColor};
`;
