import {PeopleResurcesUri, StarshipsResourcesUri} from './../api/types';
import {swapiUrls} from '@/api/consts';
import {SwapiUrlType} from '@/api/types';
import {useState, useEffect} from 'react';

interface useFetchProps {
  url: SwapiUrlType;
  resource: StarshipsResourcesUri | PeopleResurcesUri;
  waitForFetching?: boolean;
}

export const useFetch = ({url, waitForFetching, resource}: useFetchProps) => {
  const [status, setStatus] = useState<
    'idle' | 'fetching' | 'fetched' | 'error'
  >('idle');
  const [waitForFetch, setWaitForFetch] = useState(waitForFetching);
  const [refetchData, setRefetchData] = useState(false);
  const [data, setData] = useState();

  const getData = () => {
    if (waitForFetch) {
      setWaitForFetch(false);
    } else {
      setRefetchData(prev => !prev);
    }
  };

  const resetData = () => {
    if (!!data) {
      setData(undefined);
    }
  };

  useEffect(() => {
    if (!url || waitForFetch) {
      return;
    }
    const fetchData = async () => {
      setStatus('fetching');
      try {
        const response = await fetch(swapiUrls[url]);
        const responseJson = await response.json();
        setData(responseJson);
        setStatus('fetched');
      } catch (error) {
        setStatus('error');
      }
    };

    fetchData();
  }, [url, waitForFetch, refetchData]);

  return {status, data, getData, resetData};
};
