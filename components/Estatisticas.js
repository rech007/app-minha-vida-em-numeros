import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Estatisticas({ registros }) {
  if (registros.length === 0) {
    return null; // Oculta o componente se não houver dados
  }

  const totalAgua = registros.reduce((acc, reg) => acc + (reg.agua || 0), 0);
  const totalExercicio = registros.reduce((acc, reg) => acc + (reg.exercicio || 0), 0);
  const totalCalorias = registros.reduce((acc, reg) => acc + (reg.calorias || 0), 0);

  const mediaAgua = (totalAgua / registros.length).toFixed(1);
  const mediaExercicio = (totalExercicio / registros.length).toFixed(1);
  const mediaCalorias = (totalCalorias / registros.length).toFixed(0);

  return (
    <View style={styles.card}>
      <Text style={styles.subtitulo}>Resumo das Médias</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValor}>{mediaAgua}</Text>
          <Text style={styles.statLabel}>💧 Copos/dia</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValor}>{mediaExercicio}</Text>
          <Text style={styles.statLabel}>🏃‍♂️ Min/dia</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValor}>{mediaCalorias}</Text>
          <Text style={styles.statLabel}>🔥 Kcal/dia</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },
  subtitulo: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1c2a4d',
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  statValor: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5c6ac4', // Roxo do tema
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});