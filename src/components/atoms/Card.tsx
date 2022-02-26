import React from 'react';
import {SafeAreaView} from 'react-native';
import {Button, Title} from 'react-native-paper';

export const Card: React.FC = () => {
  return (
    <SafeAreaView>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => console.log('Pressed')}>
        <Title>Title</Title>
      </Button>
    </SafeAreaView>
  );
};
