import {PeopleResurcesUri, Resource, StarshipsResourcesUri} from '@/api/types';
import {useFetch} from '@/hooks/useFetch';
import {getRandomInt, getResult} from '@/utils/functions';
import {useEffect, useState} from 'react';
import {GameResult} from './types';

export const useChooseCardScreen = ({
  activeCategory,
  activeResource,
}: {
  activeCategory: 'Starships' | 'People';
  activeResource: Resource<StarshipsResourcesUri | PeopleResurcesUri>;
}) => {
  const {data, status, refreshData, resetData, getNextPage, nextPage} =
    useFetch<PeopleResurcesUri | StarshipsResourcesUri>({
      url: activeCategory === 'People' ? 'people' : 'starships',
      waitForFetching: true,
    });

  const [selectedCard, setSelectedCard] = useState<number | undefined>();
  const [resourcesFromData, setResourcesFromData] = useState<{
    firstResource: string | string[] | undefined;
    secondResource: string | string[] | undefined;
  }>();
  const [result, setResult] = useState<GameResult>('unknown');
  const [winCounter, setWinCounter] =
    useState<{you: number; opponent: number}>();

  useEffect(() => {
    const resourceFromDataFirst =
      data && data.results && data.results.length > 0
        ? data.results[getRandomInt(0, data.results.length - 1)][
            activeResource.uriParam
          ]
        : undefined;
    const resourceFromDataSecond =
      data && data.results && data.results.length > 0
        ? data.results[getRandomInt(0, data.results.length - 1)][
            activeResource.uriParam
          ]
        : undefined;
    setResourcesFromData({
      firstResource: resourceFromDataFirst,
      secondResource: resourceFromDataSecond,
    });
    const dataResult = data
      ? getResult({
          firstValue: resourceFromDataFirst,
          secondValue: resourceFromDataSecond,
          resource: activeResource.uriParam,
          selectedCard: selectedCard,
        })
      : 'unknown';

    if (dataResult === 'Winner') {
      setWinCounter(prev => {
        if (!prev) {
          return {you: 1, opponent: 0};
        } else {
          return {...prev, you: prev.you + 1};
        }
      });
    } else if (dataResult === 'Loser') {
      setWinCounter(prev => {
        if (!prev) {
          return {you: 0, opponent: 1};
        } else {
          return {...prev, opponent: prev.opponent + 1};
        }
      });
    }
    setResult(dataResult);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const firstValueDisplayed = Array.isArray(resourcesFromData?.firstResource)
    ? resourcesFromData?.firstResource.length.toString()
    : resourcesFromData?.firstResource;

  const secondValueDisplayed = Array.isArray(resourcesFromData?.secondResource)
    ? resourcesFromData?.secondResource.length.toString()
    : resourcesFromData?.secondResource;

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
    setSelectedCard,
    resourcesFromData,
  };
};
