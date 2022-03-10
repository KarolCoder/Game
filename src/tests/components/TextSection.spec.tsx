import {TextSection} from '@/screens/ChooseCardScreen/partials/TextSection';
import {render} from '@testing-library/react-native';
import React from 'react';

import renderer from 'react-test-renderer';

it('text sections renders correctly', async () => {
  const component = (
    <TextSection
      bottomLeftText={'bottomLeft'}
      bottomRightText={'bottomRight'}
      leftTopText="leftTop"
      rightTopText="rightTop"
    />
  );
  const result = renderer.create(component).toJSON();
  const {getByText} = render(component);
  expect(result).toMatchSnapshot();
  getByText('leftTop');
  getByText('bottomRight');
  getByText('rightTop');
  getByText('bottomLeft');
});
