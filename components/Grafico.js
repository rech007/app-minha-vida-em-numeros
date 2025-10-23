import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function Grafico({ registros }) {
  if (!registros || registros.length < 2) {
    return (
      <View style={styles.card}>
        <Text style={styles.titulo}>Progresso Semanal: Hidratação</Text>
        <Text style={styles.avisoTexto}>
          São necessários pelo menos 2 registros para exibir seu progresso.
        </Text>
      </View>
    );
  }

  // Pega os 7 registros mais recentes para exibir no gráfico
  const registrosParaGrafico = [...registros]
    .sort((a, b) => a.id - b.id) // Ordena do mais antigo para o mais novo
    .slice(-7); // Pega os últimos 7

  const data = {
    labels: registrosParaGrafico.map(reg => reg.data.substring(0, 5)),
    datasets: [
      {
        data: registrosParaGrafico.map(reg => reg.agua),
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Cor da linha
        strokeWidth: 2,
      },
    ],
    legend: ['Copos de Água'], // Adiciona uma legenda
  };

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>Progresso Semanal: Hidratação</Text>
      <LineChart
        data={data}
        width={Dimensions.get('window').width - 62} // Ajuste de largura para o padding
        height={220}
        yAxisSuffix=" copos"
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: '#5c6ac4',
          backgroundGradientFrom: '#5c6ac4', // Cor roxa do tema
          backgroundGradientTo: '#4855a8', // Tom mais escuro de roxo
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 8,
          },
          propsForDots: {
            r: '5', // Tamanho do ponto
            strokeWidth: '2',
            stroke: '#1c2a4d', // Cor azul escura do tema
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 8,
        }}
      />
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
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1c2a4d', // Cor azul escura do tema
    marginBottom: 10,
    alignSelf: 'flex-start', // Alinha o título à esquerda
  },
  avisoTexto: {
    textAlign: 'center',
    padding: 20,
    color: '#666',
    fontSize: 15,
    lineHeight: 22,
  },
});