import {GameProvider} from '@/containers/useGame';
import {WelcomeScreen} from '@/screens';
import React from 'react';

import renderer, {act} from 'react-test-renderer';

it('welcome screen renders correctly', async () => {
  const result = renderer
    .create(
      <GameProvider>
        <WelcomeScreen />
      </GameProvider>,
    )
    .toJSON();
  await act(async () => {
    expect(result).toMatchSnapshot();
    return;
  });
});
