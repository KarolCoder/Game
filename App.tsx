import {MainNavigator} from '@/navigation/MainNavigator';
import React from 'react';
import {useTheme} from 'react-native-paper';
import styled from 'styled-components/native';

const App = () => {
  const {colors} = useTheme();
  return (
    <BlackView backgroundColor={colors.background}>
      <SafeArea>
        <MainNavigator />
      </SafeArea>
    </BlackView>
  );
};

const SafeArea = styled.SafeAreaView`
  flex: 1;
`;
const BlackView = styled.View<{backgroundColor: string}>`
  flex: 1;
  background-color: ${({backgroundColor}) => backgroundColor};
`;

export default App;
