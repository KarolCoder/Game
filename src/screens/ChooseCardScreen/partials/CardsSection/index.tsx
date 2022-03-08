import {Spacer} from '@/components';
import React from 'react';
import {Title, useTheme} from 'react-native-paper';
import {Row} from '../../styles';
import {Card, SelectTitle} from './styles';

interface CardsSectionProps {
  setSelectedCard: React.Dispatch<React.SetStateAction<number | undefined>>;
  refreshData: () => void;
  getNextPage: () => Promise<void>;
  firstValueDisplayed?: string;
  secondValueDisplayed?: string;
  resourcesFromData?: {
    firstResource: string | string[] | undefined;
    secondResource: string | string[] | undefined;
  };
  nextPage?: string;
  status?: string;
}

export const CardsSection: React.FC<CardsSectionProps> = ({
  resourcesFromData,
  setSelectedCard,
  refreshData,
  getNextPage,
  firstValueDisplayed,
  secondValueDisplayed,
  nextPage,
  status,
}) => {
  const {colors} = useTheme();
  return (
    <>
      <SelectTitle textColor={colors.primary}>Choose card</SelectTitle>
      <Row>
        <Card
          disabled={
            (!!resourcesFromData?.firstResource &&
              !!resourcesFromData?.secondResource) ||
            status === 'fetching'
          }
          onPress={() => {
            setSelectedCard(0);
            if (!nextPage) {
              refreshData();
            } else {
              getNextPage();
            }
          }}>
          <Title>{firstValueDisplayed ? firstValueDisplayed : '?'}</Title>
        </Card>
        <Spacer width={24} />
        <Card
          disabled={
            (!!resourcesFromData?.firstResource &&
              !!resourcesFromData?.secondResource) ||
            status === 'fetching'
          }
          onPress={() => {
            setSelectedCard(1);
            if (!nextPage) {
              refreshData();
            } else {
              getNextPage();
            }
          }}>
          <Title>{secondValueDisplayed ? secondValueDisplayed : '?'}</Title>
        </Card>
      </Row>
    </>
  );
};
