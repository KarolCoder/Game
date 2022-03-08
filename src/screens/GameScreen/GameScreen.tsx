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
import {useTheme} from 'react-native-paper';
import {
  ContinueButton,
  Main,
  OptionButton,
  ResourceButton,
  ResourcesList,
  Row,
  SelectTitle,
} from './styles';

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
