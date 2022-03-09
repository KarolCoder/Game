import {PeopleResurcesUri, StarshipsResourcesUri} from '@/api/types';
import {useGame} from '@/containers/useGame';
import {useFetch} from '@/hooks/useFetch';
import {getRandomInt} from '@/utils/functions';
import {useEffect, useMemo} from 'react';
import {getResult} from './functions';

export const useChooseCardScreen = () => {
  const {
    selectedGameValues,
    updateGameResourcesFromData,
    updateGameWinCounter,
    updateGameResult,
    resetGameValues,
  } = useGame();

  const {
    category,
    resource,
    resourcesFromData,
    result,
    selectedCard,
    winCounter,
  } = {...selectedGameValues};

  const {data, status, refreshData, resetData, getNextPage, nextPage} =
    useFetch<PeopleResurcesUri | StarshipsResourcesUri>({
      url: category === 'People' ? 'people' : 'starships',
      waitForFetching: true,
    });

  useEffect(() => {
    const resourceFromDataFirst =
      data && data.results && data.results.length > 0 && resource
        ? data.results[getRandomInt(0, data.results.length - 1)][
            resource.uriParam
          ]
        : undefined;
    const resourceFromDataSecond =
      data && data.results && data.results.length > 0 && resource
        ? data.results[getRandomInt(0, data.results.length - 1)][
            resource?.uriParam
          ]
        : undefined;
    updateGameResourcesFromData({
      firstResource: resourceFromDataFirst,
      secondResource: resourceFromDataSecond,
    });

    const dataResult = data
      ? getResult({
          firstValue: resourceFromDataFirst,
          secondValue: resourceFromDataSecond,
          resource: resource?.uriParam,
          selectedCard: selectedCard,
        })
      : 'unknown';
    if (dataResult === 'Winner') {
      updateGameWinCounter('You');
    } else if (dataResult === 'Loser') {
      updateGameWinCounter('Opponent');
    }
    updateGameResult(dataResult);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    return () => {
      resetGameValues();
    };
  }, [resetGameValues]);

  const firstValueDisplayed = useMemo(
    () =>
      Array.isArray(resourcesFromData?.firstResource)
        ? resourcesFromData?.firstResource.length.toString()
        : resourcesFromData?.firstResource,
    [resourcesFromData?.firstResource],
  );

  const secondValueDisplayed = useMemo(
    () =>
      Array.isArray(resourcesFromData?.secondResource)
        ? resourcesFromData?.secondResource.length.toString()
        : resourcesFromData?.secondResource,
    [resourcesFromData?.secondResource],
  );

  return {
    firstValueDisplayed,
    secondValueDisplayed,
    status,
    refreshData,
    resetData,
    getNextPage,
    nextPage,
    winCounter,
    result,
    resourcesFromData,
  };
};
