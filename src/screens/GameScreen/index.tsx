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
  const {
    resources,
    activeResource,
    setActiveCategory,
    activeCategory,
    setActiveResource,
  } = useGameScreen();

  return (
    <Main backgroundColor={colors.background}>
      <CategorySection
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      {activeCategory && (
        <SelectTitle textColor={colors.primary}>Choose resource</SelectTitle>
      )}
      <ResourcesList>
        {resources.map(({message, uriParam}) => (
          <ResourceButton
            key={message}
            mode="contained"
            isActive={message === activeResource?.message}
            onPress={() => setActiveResource({message, uriParam})}>
            {message}
          </ResourceButton>
        ))}
      </ResourcesList>
      <ContinueButton
        mode="contained"
        disabled={!(activeResource && activeCategory)}
        onPress={() => {
          if (activeCategory && activeResource) {
            navigate('ChooseCard', {
              activeCategory: activeCategory,
              activeResource: activeResource,
            });
          }
        }}>
        Continue
      </ContinueButton>
    </Main>
  );
};
