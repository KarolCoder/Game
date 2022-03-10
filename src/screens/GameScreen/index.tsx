import {useGame} from '@/containers/useGame';
import {MainParamList} from '@/navigation/types/MainParamList';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {useTheme} from 'react-native-paper';
import {useGameScreen} from './hooks';
import {CategorySection} from './partials/CategorySection';
import {
  ContinueButton,
  Main,
  ResourceButton,
  ResourcesList,
  SelectTitle,
} from './styles';

export const GameScreen = () => {
  const {colors} = useTheme();
  const {navigate} = useNavigation<NativeStackNavigationProp<MainParamList>>();
  const {resources} = useGameScreen();
  const {updateGameCategory, updateGameResource, selectedGameValues} =
    useGame();
  const {category, resource} = {...selectedGameValues};

  return (
    <Main backgroundColor={colors.background}>
      <CategorySection
        activeCategory={category}
        setActiveCategory={updateGameCategory}
      />
      {category && (
        <SelectTitle textColor={colors.primary}>Choose resource</SelectTitle>
      )}
      <ResourcesList>
        {resources.map(({message, uriParam}, index) => (
          <ResourceButton
            key={message}
            testID={'resource button' + index}
            mode="contained"
            isActive={message === resource?.message}
            onPress={() => updateGameResource({message, uriParam})}>
            {message}
          </ResourceButton>
        ))}
      </ResourcesList>
      <ContinueButton
        testID="continue button"
        mode="contained"
        disabled={!(resource && category)}
        onPress={() => {
          if (category && resource) {
            navigate('ChooseCard');
          }
        }}>
        Continue
      </ContinueButton>
    </Main>
  );
};
