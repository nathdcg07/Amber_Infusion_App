import React from 'react';
import { Button, HStack,Heading,Spinner, View } from 'native-base';
import { Text } from 'react-native';
import { useRouter } from 'expo-router';

export const LoadScreen = () => {
  


  return (
    <View flex={1}>
    <HStack space={2} justifyContent="center">
      <Spinner accessibilityLabel="Loading posts" />
      <Heading color="primary.500" fontSize="md">
        Loading
      </Heading>
    </HStack>
    </View>
  )
}
