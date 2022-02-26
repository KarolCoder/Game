import {PeopleResurcesUri, Resource, StarshipsResourcesUri} from '@/api/types';

type ChooseCardProps = {
  activeCategory: 'Starships' | 'People';
  activeResource: Resource<StarshipsResourcesUri | PeopleResurcesUri>;
};

export type MainParamList = {
  Welcome: undefined;
  Game: undefined;
  ChooseCard: ChooseCardProps;
};
