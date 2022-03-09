import {
  PeopleResurcesUri,
  Resource,
  ResultValue,
  StarshipsResourcesUri,
} from '@/api/types';

export type GameCategory = 'Starships' | 'People';
export type GameResource = Resource<StarshipsResourcesUri | PeopleResurcesUri>;
export type GameCard = Resource<StarshipsResourcesUri | PeopleResurcesUri>;
export type WinCounter = {you?: number; opponent?: number};
export type GameResult = 'Tie' | 'Winner' | 'Loser' | 'unknown' | undefined;
export type ResourcesFromData = {
  firstResource?: ResultValue;
  secondResource?: ResultValue;
};

export type GameValues = {
  category?: GameCategory;
  resource?: GameResource;
  selectedCard?: number;
  winCounter?: WinCounter;
  result?: GameResult;
  resourcesFromData?: ResourcesFromData;
};
