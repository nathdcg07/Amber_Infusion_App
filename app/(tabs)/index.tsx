import React, { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Café Cebada con notas de naranja',
    descripcion:'Infusión tostada de cebada con notas cítricas de naranja deshidratada. Natural, cálida y sin cafeína. Peso 50gr.',
    image:
      require('../img/productoA.jpg'),
    price: '10 BOB',
  },
  {
    id: 2,
    name: 'Pack 1',
    descripcion:'Dos bolsas de 50gr de cebada bien tostada con nostas cítricas de naranja deshidratada.',
    image:
      require('../img/pack1.jpg'),
    price: '15 BOB',
  },
  {
    id: 3,
    name: 'Pack 2',
    descripcion:'Tres bolsas de 50gr de cebada bien tostada con nostas cítricas de naranja deshidratada.',
    image:
      require('../img/pack2.jpg'),
    price: '25 BOB',
  },
];

export default function App() {
  const [view, setView] = useState<'register' | 'catalog' | 'profile'>('register');
  const [user, setUser] = useState<{ email: string; nombre: string } | null>(null);

  // Registro
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingRegister, setLoadingRegister] = useState(false);

  const handleRegister = () => {
    setLoadingRegister(true);
    setTimeout(() => {
      setUser({ email, nombre });
      setEmail('');
      setPassword('');
      setLoadingRegister(false);
      setView('catalog');
    }, 1500);
        if (!nombre || !email || !password) {
      alert('Por favor, llena todos los campos.');
      return;
    }
  };

  return (
    <View style={styles.container}>
      {view === 'register' && (
        <>
          <Text style={styles.title}>Registro</Text>
          <TextInput
            placeholder="Nombre Completo"
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {loadingRegister ? (
            <ActivityIndicator size="large" />
          ) : (
            <Button title="Registrarse" onPress={handleRegister} />
          )}
        </>
      )}

      {view === 'catalog' && (
        <>
          <Text style={styles.title}>Catálogo</Text>
          <FlatList
            data={MOCK_PRODUCTS}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.productCard}>
                <Image source={item.image} style={styles.productImage} />
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={{ marginBottom: 10 }}>{item.descripcion}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 50 }}
          />
          <Button title="Ver Perfil" onPress={() => setView('profile')} />
        </>
      )}

      {view === 'profile' && user && (
        <>
          <Text style={styles.title}>Perfil</Text>
          <Text style={{ fontSize: 18, marginVertical: 10 }}>
            Nombre: {user.nombre}
          </Text>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            Email: {user.email}
          </Text>
          <Button
            title="Cerrar sesión"
            onPress={() => {
              setUser(null);
              setView('register');
            }}
          />
          <Button title="Volver al Catálogo" onPress={() => setView('catalog')} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#6B4226' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  productCard: {
    backgroundColor: '#F5F0E6',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: { fontSize: 20, fontWeight: '600', color: '#6B4226' },
  productPrice: { fontSize: 16, fontWeight: '500', color: '#A67B5B' },
});
