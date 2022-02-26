import {MainNavigator} from '@/navigation/MainNavigator';
import React from 'react';
import styled from 'styled-components/native';

const App = () => {
  return (
    <SafeArea>
      <MainNavigator />
    </SafeArea>
  );
};

const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

export default App;
