import {PeopleResurcesUri, StarshipsResourcesUri} from '@/api/types';
import {Spacer} from '@/components';
import {useFetch} from '@/hooks/useFetch';
import {MainParamList} from '@/navigation/types/MainParamList';
import {getRandomInt, getResult} from '@/utils/functions';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Paragraph,
  Title,
  useTheme,
  Button,
  ActivityIndicator,
} from 'react-native-paper';
import styled from 'styled-components/native';

export const ChooseCardScreen = () => {
  const {colors} = useTheme();
  const {
    params: {activeCategory, activeResource},
  } = useRoute<RouteProp<MainParamList, 'ChooseCard'>>();
  const {navigate} = useNavigation<NativeStackNavigationProp<MainParamList>>();
  const {data, status, refreshData, resetData, getNextPage, nextPage} =
    useFetch<PeopleResurcesUri | StarshipsResourcesUri>({
      url: activeCategory === 'People' ? 'people' : 'starships',
      waitForFetching: true,
    });
  const [selectedCard, setSelectedCard] = useState<number | undefined>();
  const [resourcesFromData, setResourcesFromData] = useState<{
    firstResource: string | string[] | undefined;
    secondResource: string | string[] | undefined;
  }>();
  const [result, setResult] = useState<
    'Tie' | 'Winner' | 'Loser' | 'unknown' | undefined
  >('unknown');
  const [winCounter, setWinCounter] =
    useState<{you: number; opponent: number}>();

  useEffect(() => {
    const resourceFromDataFirst =
      data && data.results && data.results.length > 0
        ? data.results[getRandomInt(0, data.results.length - 1)][
            activeResource.uriParam
          ]
        : undefined;
    const resourceFromDataSecond =
      data && data.results && data.results.length > 0
        ? data.results[getRandomInt(0, data.results.length - 1)][
            activeResource.uriParam
          ]
        : undefined;
    setResourcesFromData({
      firstResource: resourceFromDataFirst,
      secondResource: resourceFromDataSecond,
    });
    const dataResult = data
      ? getResult({
          firstValue: resourceFromDataFirst,
          secondValue: resourceFromDataSecond,
          resource: activeResource.uriParam,
          selectedCard: selectedCard,
        })
      : 'unknown';

    if (dataResult === 'Winner') {
      setWinCounter(prev => {
        if (!prev) {
          return {you: 1, opponent: 0};
        } else {
          return {...prev, you: prev.you + 1};
        }
      });
    } else if (dataResult === 'Loser') {
      setWinCounter(prev => {
        if (!prev) {
          return {you: 0, opponent: 1};
        } else {
          return {...prev, opponent: prev.opponent + 1};
        }
      });
    }
    setResult(dataResult);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const firstValueDisplayed = Array.isArray(resourcesFromData?.firstResource)
    ? resourcesFromData?.firstResource.length.toString()
    : resourcesFromData?.firstResource;

  const secondValueDisplayed = Array.isArray(resourcesFromData?.secondResource)
    ? resourcesFromData?.secondResource.length.toString()
    : resourcesFromData?.secondResource;

  return (
    <Main backgroundColor={colors.background}>
      {status === 'fetching' && (
        <ActivityIndicatorWrapper>
          <ActivityIndicator animating size={'large'} />
        </ActivityIndicatorWrapper>
      )}
      <Row>
        <CategoryBox>
          <SmallText textColor={colors.primary}>Category</SmallText>
          <BigText textColor={colors.primary}>{activeCategory}</BigText>
        </CategoryBox>
        <CategoryBox>
          <SmallText textColor={colors.primary}>Resource</SmallText>
          <BigText textColor={colors.primary}>{activeResource.message}</BigText>
        </CategoryBox>
      </Row>
      <SelectTitle textColor={colors.primary}>Choose card</SelectTitle>
      <Row>
        <Card
          disabled={
            (!!resourcesFromData?.firstResource &&
              !!resourcesFromData?.secondResource) ||
            status === 'fetching'
          }
          onPress={() => {
            setSelectedCard(0);
            if (!nextPage) {
              refreshData();
            } else {
              getNextPage();
            }
          }}>
          <Title>{firstValueDisplayed ? firstValueDisplayed : '?'}</Title>
        </Card>
        <Spacer width={24} />
        <Card
          disabled={
            (!!resourcesFromData?.firstResource &&
              !!resourcesFromData?.secondResource) ||
            status === 'fetching'
          }
          onPress={() => {
            setSelectedCard(1);
            if (!nextPage) {
              refreshData();
            } else {
              getNextPage();
            }
          }}>
          <Title>{secondValueDisplayed ? secondValueDisplayed : '?'}</Title>
        </Card>
      </Row>
      {status === 'error' && (
        <SmallText textColor={colors.error}>
          There was some issue, please try again
        </SmallText>
      )}
      {result === 'Winner' ? (
        <BigText textColor={colors.primary}>
          Congratualtions, you won!!!
        </BigText>
      ) : result === 'Loser' ? (
        <BigText textColor={colors.primary}>You lose, loser :D</BigText>
      ) : result === 'Tie' ? (
        <BigText textColor={colors.primary}>Tie, try again</BigText>
      ) : !result ? (
        <BigText textColor={colors.primary}>
          Couldn't resolve winner please go to start
        </BigText>
      ) : null}
      {winCounter && (
        <Row>
          <CategoryBox>
            <SmallText textColor={colors.primary}>Your wins</SmallText>
            <BigText textColor={colors.primary}>{winCounter.you}</BigText>
          </CategoryBox>
          <CategoryBox>
            <SmallText textColor={colors.primary}>Opponent wins</SmallText>
            <BigText textColor={colors.primary}>{winCounter.opponent}</BigText>
          </CategoryBox>
        </Row>
      )}
      {!!resourcesFromData?.firstResource &&
        !!resourcesFromData?.secondResource && (
          <Row>
            <BottomButton
              mode="contained"
              disabled={!(activeResource && activeCategory)}
              onPress={() => resetData()}>
              Reset cards
            </BottomButton>
            <Spacer width={24} />
            <BottomButton
              mode="contained"
              disabled={!(activeResource && activeCategory)}
              onPress={() => navigate('Welcome')}>
              Go to start
            </BottomButton>
          </Row>
        )}
    </Main>
  );
};

const Main = styled.ScrollView.attrs(() => ({
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

const ActivityIndicatorWrapper = styled.View`
  position: absolute;
  align-items: center;
  justify-content: center;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 1;
`;

const CategoryBox = styled.View`
  justify-content: center;
  align-items: center;
`;

const BigText = styled(Title)<{textColor: string}>`
  color: ${({textColor}) => textColor};
`;

const SmallText = styled(Paragraph)<{textColor: string}>`
  color: ${({textColor}) => textColor};
`;

const SelectTitle = styled(Title)<{textColor: string}>`
  margin: 24px 0px 12px;
  color: ${({textColor}) => textColor};
`;
const Row = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  padding: 24px 16px;
`;

const Card = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: white;
  aspect-ratio: 0.6;
  flex: 1;
  border-radius: 8px;
`;

const BottomButton = styled(Button)`
  padding: 4px 8px;
  flex: 1;
`;
