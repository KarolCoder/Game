import {Spacer} from '@/components';
import {render} from '@testing-library/react-native';
import React from 'react';

import renderer from 'react-test-renderer';

it('spacer renders correctly', async () => {
  const component = <Spacer width={12} height={12} />;
  const result = renderer.create(component).toJSON();
  const {UNSAFE_getByProps} = render(component);
  expect(result).toMatchSnapshot();
  UNSAFE_getByProps({width: 12});
  UNSAFE_getByProps({height: 12});
});
