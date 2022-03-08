import {Spacer} from '@/components';
import React from 'react';
import {useTheme} from 'react-native-paper';
import {Row, SelectTitle} from '../../styles';
import {OptionButton} from './styles';

interface CategorySectionProps {
  activeCategory?: 'Starships' | 'People';
  setActiveCategory: React.Dispatch<
    React.SetStateAction<'Starships' | 'People' | undefined>
  >;
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
          isActive={activeCategory === 'People'}
          mode="contained"
          onPress={() => setActiveCategory('People')}>
          People
        </OptionButton>
        <Spacer width={24} />
        <OptionButton
          isActive={activeCategory === 'Starships'}
          mode="contained"
          onPress={() => setActiveCategory('Starships')}>
          Starships
        </OptionButton>
      </Row>
    </>
  );
};
