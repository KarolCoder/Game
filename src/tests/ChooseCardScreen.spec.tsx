import {GameProvider} from '@/containers/useGame';
import {ChooseCardScreen} from '@/screens';
import React from 'react';

import renderer, {act} from 'react-test-renderer';

it('choose card screen renders correctly', async () => {
  const result = renderer
    .create(
      <GameProvider>
        <ChooseCardScreen />
      </GameProvider>,
    )
    .toJSON();
  await act(async () => {
    expect(result).toMatchSnapshot();
    return;
  });
});
