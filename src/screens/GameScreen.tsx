import {
  peopleResourcesToBattle,
  starshipsResourcesToBattle,
} from '@/api/consts';
import {PeopleResurcesUri, Resource, StarshipsResourcesUri} from '@/api/types';
import {Spacer} from '@/components';
import {MainParamList} from '@/navigation/types/MainParamList';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {Button, Title, useTheme} from 'react-native-paper';
import styled, {css} from 'styled-components/native';

export const GameScreen = () => {
  const {colors} = useTheme();
  const {navigate} = useNavigation<NativeStackNavigationProp<MainParamList>>();
  const [activeCategory, setActiveCategory] = useState<
    'Starships' | 'People'
  >();
  const [activeResource, setActiveResource] =
    useState<Resource<StarshipsResourcesUri | PeopleResurcesUri>>();

  useEffect(() => {
    setActiveResource(undefined);
  }, [activeCategory]);

  const resources =
    activeCategory === 'People'
      ? peopleResourcesToBattle
      : activeCategory === 'Starships'
      ? starshipsResourcesToBattle
      : [];

  return (
    <Main backgroundColor={colors.background}>
      <SelectTitle textColor={colors.primary}>Choose category</SelectTitle>
      <Row>
        <OptionButton
          isActive={activeCategory === 'People'}
          mode="contained"
          onPress={() => setActiveCategory('People')}>
          People
        </OptionButton>
        <Spacer width={24} />
        <OptionButton
          isActive={activeCategory === 'Starships'}
          mode="contained"
          onPress={() => setActiveCategory('Starships')}>
          Starships
        </OptionButton>
      </Row>
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

export const Main = styled.View<{backgroundColor: string}>`
  flex: 1;
  background-color: ${({backgroundColor}) => backgroundColor};
  justify-content: center;
  align-items: center;
`;

const SelectTitle = styled(Title)<{textColor: string}>`
  margin: 24px 0px 12px;
  color: ${({textColor}) => textColor};
`;

export const Row = styled.View`
  flex-direction: row;
  width: 100%;
  padding: 0px 16px;
`;

const OptionButton = styled(Button)<{isActive?: boolean}>`
  padding: ${({isActive}) => (isActive ? '0px 4px' : '4px')};
  flex: 1;
  justify-content: center;
  ${({isActive}) =>
    isActive &&
    css`
      border: 4px solid #ffffff;
    `}
`;

const ResourcesList = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
}))`
  flex: 1;
  width: 100%;
`;

const ResourceButton = styled(Button)<{isActive?: boolean}>`
  padding: ${({isActive}) => (isActive ? '0px 4px' : '4px')};
  margin-bottom: 8px;
  ${({isActive}) =>
    isActive &&
    css`
      border: 4px solid #ffffff;
    `}
`;

const ContinueButton = styled(Button)<{disabled?: boolean}>`
  padding: 4px 8px;
  margin-bottom: 16px;
  margin-top: 24px;
  background-color: ${({disabled}) => (disabled ? '	#E8E8E855' : '#F8F8F8')};
`;
