import {
  peopleResourcesToBattle,
  starshipsResourcesToBattle,
} from '@/api/consts';
import {useGame} from '@/containers/useGame';
import {useEffect, useMemo} from 'react';

export const useGameScreen = () => {
  const {selectedGameValues, updateGameResource} = useGame();
  const {category} = {...selectedGameValues};

  useEffect(() => {
    updateGameResource(undefined);
  }, [category, updateGameResource]);

  const resources = useMemo(
    () =>
      category === 'People'
        ? peopleResourcesToBattle
        : category === 'Starships'
        ? starshipsResourcesToBattle
        : [],
    [category],
  );

  return {
    resources,
  };
};
