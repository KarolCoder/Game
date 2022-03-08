import {MainParamList} from '@/navigation/types/MainParamList';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {useTheme, ActivityIndicator} from 'react-native-paper';
import {useChooseCardScreen} from './hooks';
import {BottomButtons} from './partials/BottomButtons';
import {CardsSection} from './partials/CardsSection';
import {ResultLabel} from './partials/ResultLabel';
import {TextSection} from './partials/TextSection';
import {ActivityIndicatorWrapper, Main, SmallText} from './styles';

export const ChooseCardScreen = () => {
  const {colors} = useTheme();
  const {
    params: {activeCategory, activeResource},
  } = useRoute<RouteProp<MainParamList, 'ChooseCard'>>();
  const {navigate} = useNavigation<NativeStackNavigationProp<MainParamList>>();
  const {
    firstValueDisplayed,
    secondValueDisplayed,
    status,
    refreshData,
    resetData,
    getNextPage,
    nextPage,
    winCounter,
    result,
    setSelectedCard,
    resourcesFromData,
  } = useChooseCardScreen({activeCategory, activeResource});

  return (
    <Main backgroundColor={colors.background}>
      {status === 'fetching' && (
        <ActivityIndicatorWrapper>
          <ActivityIndicator animating size={'large'} />
        </ActivityIndicatorWrapper>
      )}
      <TextSection
        leftTopText="Category"
        bottomLeftText={activeCategory}
        rightTopText="Resource"
        bottomRightText={activeResource.message}
      />
      <CardsSection
        {...{
          resourcesFromData,
          setSelectedCard,
          refreshData,
          getNextPage,
          firstValueDisplayed,
          secondValueDisplayed,
          nextPage,
          status,
        }}
      />
      {status === 'error' && (
        <SmallText textColor={colors.error}>
          There was some issue, please try again
        </SmallText>
      )}
      <ResultLabel result={result} />
      {winCounter && (
        <TextSection
          leftTopText="Your wins"
          bottomLeftText={winCounter.you}
          rightTopText="Opponent wins"
          bottomRightText={winCounter.opponent}
        />
      )}
      {!!resourcesFromData?.firstResource &&
        !!resourcesFromData?.secondResource && (
          <BottomButtons
            onLeftPress={() => resetData()}
            onRightPress={() => navigate('Welcome')}
            isDisabled={!(activeResource && activeCategory)}
          />
        )}
    </Main>
  );
};
