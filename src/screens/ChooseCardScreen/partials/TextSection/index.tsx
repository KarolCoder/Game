import React from 'react';
import {useTheme} from 'react-native-paper';
import {BigText, Row, SmallText} from '../../styles';
import {CategoryBox} from './styles';

interface TextSectionProps {
  leftTopText?: string;
  rightTopText?: string;
  bottomLeftText?: string | number;
  bottomRightText?: string | number;
}

export const TextSection: React.FC<TextSectionProps> = ({
  leftTopText = '',
  rightTopText = '',
  bottomLeftText = '',
  bottomRightText = '',
}) => {
  const {colors} = useTheme();
  return (
    <Row>
      <CategoryBox>
        <SmallText textColor={colors.primary}>{leftTopText}</SmallText>
        <BigText textColor={colors.primary}>{bottomLeftText}</BigText>
      </CategoryBox>
      <CategoryBox>
        <SmallText textColor={colors.primary}>{rightTopText}</SmallText>
        <BigText textColor={colors.primary}>{bottomRightText}</BigText>
      </CategoryBox>
    </Row>
  );
};
