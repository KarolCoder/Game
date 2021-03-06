import {Spacer} from '@/components';
import React from 'react';
import {Row} from '../../styles';
import {BottomButton} from './styles';

interface BottomButtonsProps {
  isDisabled?: boolean;
  onLeftPress: () => void;
  onRightPress: () => void;
}

export const BottomButtons: React.FC<BottomButtonsProps> = ({
  isDisabled,
  onLeftPress,
  onRightPress,
}) => {
  return (
    <Row>
      <BottomButton
        testID="bottom first button"
        mode="contained"
        disabled={isDisabled}
        onPress={onLeftPress}>
        Reset cards
      </BottomButton>
      <Spacer width={24} />
      <BottomButton
        testID="bottom second button"
        mode="contained"
        disabled={isDisabled}
        onPress={onRightPress}>
        Go to start
      </BottomButton>
    </Row>
  );
};
