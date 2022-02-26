import {MainParamList} from '@/navigation/types/MainParamList';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';

import {Button, Title, useTheme} from 'react-native-paper';
import styled from 'styled-components/native';

export const WelcomeScreen = () => {
  const {colors} = useTheme();
  const {navigate} = useNavigation<NativeStackNavigationProp<MainParamList>>();
  return (
    <StarWarsImage
      source={require('@/assets/images/starWars.jpeg')}
      resizeMode="cover">
      <TopText textColor={colors.primary}>Star Wars Game</TopText>
      <ButtonWrapper>
        <BottomButton mode="contained" onPress={() => navigate('Game')}>
          <Title>Play</Title>
        </BottomButton>
      </ButtonWrapper>
    </StarWarsImage>
  );
};

const StarWarsImage = styled.ImageBackground`
  flex: 1;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ButtonWrapper = styled.View`
  width: 100%;
  margin-top: auto;
  padding: 0px 16px;
`;

const BottomButton = styled(Button)`
  margin-bottom: 16px;
`;

const TopText = styled(Title)<{textColor: string}>`
  margin-top: 40px;
  color: ${({textColor}) => textColor};
`;
