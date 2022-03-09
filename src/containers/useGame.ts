import {
  GameCategory,
  GameResource,
  GameValues,
  GameResult,
  ResourcesFromData,
} from '@/utils/types';
import {useState, useCallback} from 'react';
import {createContainer} from 'unstated-next';

const useGameBase = () => {
  const [selectedGameValues, setSelectedGameValues] = useState<GameValues>();

  const updateGameCategory = useCallback((category?: GameCategory) => {
    setSelectedGameValues(prev => ({...prev, category}));
  }, []);

  const updateGameResource = useCallback((resource?: GameResource) => {
    setSelectedGameValues(prev => ({...prev, resource}));
  }, []);

  const updateGameSelectedCard = useCallback((selectedCard?: number) => {
    setSelectedGameValues(prev => ({...prev, selectedCard}));
  }, []);

  const updateGameWinCounter = useCallback((winner: 'You' | 'Opponent') => {
    setSelectedGameValues(prev => ({
      ...prev,
      winCounter:
        winner === 'You'
          ? {
              opponent: prev?.winCounter?.opponent || 0,
              you: (prev?.winCounter?.you || 0) + 1,
            }
          : {
              opponent: (prev?.winCounter?.opponent || 0) + 1,
              you: prev?.winCounter?.you || 0,
            },
    }));
  }, []);

  const updateGameResult = useCallback((result?: GameResult) => {
    setSelectedGameValues(prev => ({...prev, result}));
  }, []);

  const updateGameResourcesFromData = useCallback(
    (resourcesFromData?: ResourcesFromData) => {
      setSelectedGameValues(prev => ({...prev, resourcesFromData}));
    },
    [],
  );

  const resetGameValues = useCallback(() => {
    setSelectedGameValues(undefined);
  }, []);

  return {
    selectedGameValues,
    updateGameCategory,
    updateGameResource,
    resetGameValues,
    updateGameSelectedCard,
    updateGameWinCounter,
    updateGameResult,
    updateGameResourcesFromData,
  };
};

const useGameContainer = createContainer(useGameBase);
export const useGame = useGameContainer.useContainer;
export const GameProvider = useGameContainer.Provider;
