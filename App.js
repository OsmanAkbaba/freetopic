import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

export default function App() {
  const [playerName, setPlayerName] = useState('');
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPlayerData = async () => {
    if (!playerName.trim()) {
      Alert.alert('Virhe', 'Anna pelaajan nimi.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`http://rest.nbaapi.com/api/PlayerDataAdvanced/name/${playerName}`);
      setPlayerData(response.data);
    } catch (error) {
      Alert.alert('Virhe', 'Pelaajaa ei löytynyt tai API ei ole käytettävissä.');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NBA Pelaajatiedot</Text>
      <TextInput
        style={styles.input}
        placeholder="Syötä pelaajan nimi"
        value={playerName}
        onChangeText={setPlayerName}
      />
      <Button title="Hae tiedot" onPress={fetchPlayerData} />
      
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      
      {playerData && (
  <ScrollView style={styles.resultContainer}>
    {playerData.map((season, index) => (
      <View key={index} style={styles.card}>
        <Text style={styles.resultTitle}>{season.playerName} ({season.season})</Text>
        <Text>Joukkue: {season.team}</Text>
        <Text>Pelit: {season.games}</Text>
        <Text>Pisteet per peli: {season.per}</Text>
      </View>
    ))}
  </ScrollView>
)}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
