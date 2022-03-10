import {MainParamList} from '@/navigation/types/MainParamList';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';

import {Title, useTheme} from 'react-native-paper';
import {BottomButton, ButtonWrapper, StarWarsImage, TopText} from './styles';

export const WelcomeScreen = () => {
  const {colors} = useTheme();
  const {navigate} = useNavigation<NativeStackNavigationProp<MainParamList>>();
  return (
    <StarWarsImage
      source={require('@/assets/images/starWars.jpeg')}
      resizeMode="cover">
      <TopText textColor={colors.primary}>Star Wars Game</TopText>
      <ButtonWrapper>
        <BottomButton
          accessibilityHint="bottom button"
          mode="contained"
          onPress={() => navigate('Game')}>
          <Title>Play</Title>
        </BottomButton>
      </ButtonWrapper>
    </StarWarsImage>
  );
};
