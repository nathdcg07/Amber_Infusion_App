import React, { useEffect } from 'react';
import { Button, View, Text,  } from 'react-native';
import { useRouter } from 'expo-router';

export default function AuthScreen({ onSignIn }) {
  const router = useRouter();

  useEffect(() => {
    const params = router.params;
  }, [router.params]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bienvenido. Por favor, inicia sesión</Text>
      <Button title="Iniciar sesión con Google" onPress={onSignIn} />
    </View>
  );
}
