import {
  PeopleResurcesUri,
  Resource,
  StarshipsResourcesUri,
  SwapiUrlType,
} from './types';

export const swapiUrls: Record<SwapiUrlType, string> = {
  people: 'https://swapi.dev/api/people/',
  starships: 'https://swapi.dev/api/starships/',
};

export const peopleResourcesToBattle: Array<Resource<PeopleResurcesUri>> = [
  {uriParam: 'films', message: 'Films'},
  {uriParam: 'height', message: 'Height'},
  {uriParam: 'mass', message: 'Mass'},
  {uriParam: 'species', message: 'Species'},
  {uriParam: 'starships', message: 'Starships'},
  {uriParam: 'vehicles', message: 'Vehicles'},
];

export const starshipsResourcesToBattle: Array<
  Resource<StarshipsResourcesUri>
> = [
  {uriParam: 'cost_in_credits', message: 'Cost'},
  {uriParam: 'length', message: 'Length'},
  {uriParam: 'crew', message: 'Crew'},
  {uriParam: 'passengers', message: 'Passengers'},
  {uriParam: 'max_atmosphering_speed', message: 'Max athomspering speed'},
  {uriParam: 'hyperdrive_rating', message: 'Hyperdrive rating'},
  {uriParam: 'MGLT', message: 'Maximum number of Megalights'},
  {uriParam: 'cargo_capacity', message: 'Cargo capacity'},
  {uriParam: 'consumables', message: 'Consumables'},
  {uriParam: 'films', message: 'Films'},
  {uriParam: 'pilots', message: 'Pilots'},
];
