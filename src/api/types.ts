export type SwapiUrlType = 'people' | 'starships';

export type PeopleResurcesUri =
  | 'height'
  | 'mass'
  | 'films'
  | 'species'
  | 'starships'
  | 'vehicles';

export type StarshipsResourcesUri =
  | 'cost_in_credits'
  | 'length'
  | 'crew'
  | 'passengers'
  | 'max_atmosphering_speed'
  | 'hyperdrive_rating'
  | 'MGLT'
  | 'cargo_capacity'
  | 'consumables'
  | 'films'
  | 'pilots';

export type Resource<T> = {uriParam: T; message: string};
