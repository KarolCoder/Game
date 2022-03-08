import {
  peopleResourcesToBattle,
  starshipsResourcesToBattle,
} from '@/api/consts';
import {StarshipsResourcesUri, PeopleResurcesUri, Resource} from '@/api/types';
import {useEffect, useState} from 'react';

export const useGameScreen = () => {
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

  return {
    resources,
    activeResource,
    setActiveCategory,
    activeCategory,
    setActiveResource,
  };
};
