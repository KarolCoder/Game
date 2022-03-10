import {Spacer} from '@/components';
import {GameCategory} from '@/utils/types';
import React from 'react';
import {useTheme} from 'react-native-paper';
import {Row, SelectTitle} from '../../styles';
import {OptionButton} from './styles';

interface CategorySectionProps {
  activeCategory?: GameCategory;
  setActiveCategory: (category?: GameCategory | undefined) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  setActiveCategory,
  activeCategory,
}) => {
  const {colors} = useTheme();
  return (
    <>
      <SelectTitle textColor={colors.primary}>Choose category</SelectTitle>
      <Row>
        <OptionButton
          testID="option button 1"
          isActive={activeCategory === 'People'}
          mode="contained"
          onPress={() => setActiveCategory('People')}>
          People
        </OptionButton>
        <Spacer width={24} />
        <OptionButton
          testID="option button 2"
          isActive={activeCategory === 'Starships'}
          mode="contained"
          onPress={() => setActiveCategory('Starships')}>
          Starships
        </OptionButton>
      </Row>
    </>
  );
};
