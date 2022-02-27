import {Response} from './../api/types';
import {swapiUrls} from '@/api/consts';
import {SwapiUrlType} from '@/api/types';
import {useState, useEffect} from 'react';

interface useFetchProps {
  url: SwapiUrlType;
  waitForFetching?: boolean;
}

export const useFetch = <T extends string>({
  url,
  waitForFetching,
}: useFetchProps) => {
  const [status, setStatus] = useState<
    'idle' | 'fetching' | 'fetched' | 'error'
  >('idle');
  const [waitForFetch, setWaitForFetch] = useState(waitForFetching);
  const [refetchData, setRefetchData] = useState(false);
  const [data, setData] = useState<Response<T>>();
  const [nextPage, setNextPage] = useState<string | undefined>();

  const refreshData = () => {
    if (waitForFetch) {
      setWaitForFetch(false);
    } else {
      setRefetchData(prev => !prev);
    }
  };

  const getNextPage = async () => {
    if (nextPage) {
      setStatus('fetching');
      try {
        const response = await fetch(nextPage);
        const responseJson: Response<T> = await response.json();
        setData(responseJson);
        setNextPage(responseJson.next);
        setStatus('fetched');
      } catch (error) {
        setStatus('error');
      }
    }
  };

  const resetData = () => {
    if (data) {
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
        const responseJson: Response<T> = await response.json();
        setData(responseJson);
        setNextPage(responseJson.next);
        setStatus('fetched');
      } catch (error) {
        setStatus('error');
      }
    };

    fetchData();
  }, [url, waitForFetch, refetchData]);

  return {status, data, refreshData, resetData, getNextPage, nextPage};
};
