import React from 'react';
import { Button, View, Text } from 'react-native';

export default function AuthScreen({ onSignIn }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bienvenido. Por favor, inicia sesión</Text>
      <Button title="Iniciar sesión con Google" onPress={onSignIn} />
    </View>
  );
}