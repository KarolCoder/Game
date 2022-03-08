import styled, {css} from 'styled-components/native';
import {Button, Title} from 'react-native-paper';

export const Main = styled.View<{backgroundColor: string}>`
  flex: 1;
  background-color: ${({backgroundColor}) => backgroundColor};
  justify-content: center;
  align-items: center;
`;

export const SelectTitle = styled(Title)<{textColor: string}>`
  margin: 24px 0px 12px;
  color: ${({textColor}) => textColor};
`;

export const Row = styled.View`
  flex-direction: row;
  width: 100%;
  padding: 0px 16px;
`;

export const ResourcesList = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
}))`
  flex: 1;
  width: 100%;
`;

export const ResourceButton = styled(Button)<{isActive?: boolean}>`
  padding: ${({isActive}) => (isActive ? '0px 4px' : '4px')};
  margin-bottom: 8px;
  ${({isActive}) =>
    isActive &&
    css`
      border: 4px solid #ffffff;
    `}
`;

export const ContinueButton = styled(Button)<{disabled?: boolean}>`
  padding: 4px 8px;
  margin-bottom: 16px;
  margin-top: 24px;
  background-color: ${({disabled}) => (disabled ? '	#E8E8E855' : '#F8F8F8')};
`;
