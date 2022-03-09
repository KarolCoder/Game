import {GameProvider} from '@/containers/useGame';
import {GameScreen} from '@/screens';
import React from 'react';

import renderer, {act} from 'react-test-renderer';

it('game screen renders correctly', async () => {
  const result = renderer
    .create(
      <GameProvider>
        <GameScreen />
      </GameProvider>,
    )
    .toJSON();
  await act(async () => {
    expect(result).toMatchSnapshot();
    return;
  });
});
