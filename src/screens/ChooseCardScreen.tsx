import {Spacer} from '@/components';
import {useFetch} from '@/hooks/useFetch';
import {MainParamList} from '@/navigation/types/MainParamList';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
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
  const {data, status, getData, resetData} = useFetch({
    url: activeCategory === 'People' ? 'people' : 'starships',
    waitForFetching: true,
    resource: activeResource.uriParam,
  });
  const resourceFromDataFirst =
    data && data.results && data.results.length > 0
      ? data.results[0].model
      : undefined;
  const resourceFromDataSecond =
    data && data.results && data.results.length > 1
      ? data.results[1].model
      : undefined;
  const result = 'winner';

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
            (resourceFromDataFirst && resourceFromDataSecond) ||
            status === 'fetching'
          }
          onPress={() => getData()}>
          <Title>{resourceFromDataFirst ? resourceFromDataFirst : '?'}</Title>
        </Card>
        <Spacer width={24} />
        <Card
          disabled={
            (resourceFromDataFirst && resourceFromDataSecond) ||
            status === 'fetching'
          }
          onPress={() => getData()}>
          <Title>{resourceFromDataSecond ? resourceFromDataSecond : '?'}</Title>
        </Card>
      </Row>
      {status === 'error' && (
        <SmallText textColor={colors.accent}>
          There was some issue, please try again
        </SmallText>
      )}
      {result !== 'winner' ? (
        <BigText textColor={colors.primary}>
          Congratualtions, you won!!!
        </BigText>
      ) : (
        <BigText textColor={colors.primary}>You lose, loser :D</BigText>
      )}
      {resourceFromDataFirst && resourceFromDataSecond && (
        <Row>
          <ContinueButton
            mode="contained"
            disabled={!(activeResource && activeCategory)}
            onPress={() => resetData()}>
            Reset cards
          </ContinueButton>
          <Spacer width={24} />
          <ContinueButton
            mode="contained"
            disabled={!(activeResource && activeCategory)}
            onPress={() => navigate('Welcome')}>
            Go to start
          </ContinueButton>
        </Row>
      )}
    </Main>
  );
};

const Main = styled.View<{backgroundColor: string}>`
  flex: 1;
  background-color: ${({backgroundColor}) => backgroundColor};
  align-items: center;
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

const BottomsBottomWrapper = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  padding: 24px 16px;
`;

const ContinueButton = styled(Button)<{disabled?: boolean}>`
  padding: 4px 8px;
  flex: 1;
`;
