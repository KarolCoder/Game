import {Spacer} from '@/components';
import {ResourcesFromData} from '@/utils/types';
import React from 'react';
import {Title, useTheme} from 'react-native-paper';
import {Row} from '../../styles';
import {Card, SelectTitle} from './styles';

interface CardsSectionProps {
  updateGameSelectedCard: (card?: number | undefined) => void;
  refreshData: () => void;
  getNextPage: () => Promise<void>;
  firstValueDisplayed?: string;
  secondValueDisplayed?: string;
  resourcesFromData?: ResourcesFromData;
  nextPage?: string;
  status?: string;
}

export const CardsSection: React.FC<CardsSectionProps> = ({
  resourcesFromData,
  updateGameSelectedCard,
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
            updateGameSelectedCard(0);
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
            updateGameSelectedCard(1);
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
