import {BigText} from '../../styles';
import React from 'react';
import {useTheme} from 'react-native-paper';
import {GameResult} from '@/utils/types';

interface ResultLabelProps {
  result: GameResult;
}

export const ResultLabel: React.FC<ResultLabelProps> = ({result}) => {
  const {colors} = useTheme();

  return result === 'Winner' ? (
    <BigText textColor={colors.primary}>Congratualtions, you won!!!</BigText>
  ) : result === 'Loser' ? (
    <BigText textColor={colors.primary}>You lose, loser :D</BigText>
  ) : result === 'Tie' ? (
    <BigText textColor={colors.primary}>Tie, try again</BigText>
  ) : !result ? (
    <BigText textColor={colors.primary}>
      Couldn't resolve winner please go to start
    </BigText>
  ) : null;
};
