import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ListaRegistros({ registros, onEdit, onDelete }) {
  // A lógica principal do componente permanece a mesma.
  return (
    <View>
      {registros.length > 0 ? (
        registros.map(reg => (
          <View key={reg.id} style={styles.itemContainer}>
            <View style={styles.itemInfo}>
              <Text style={styles.dataTexto}>{reg.data}</Text>
              <Text style={styles.statsTexto}>
                💧 {reg.agua} copos | 🏃‍♂️ {reg.exercicio} min | 🔥 {reg.calorias} kcal
              </Text>
            </View>

            <View style={styles.botoesContainer}>
              <TouchableOpacity style={[styles.botaoAcao, styles.botaoEditar]} onPress={() => onEdit(reg)}>
                <Text style={[styles.iconeTexto, styles.iconeEditar]}>✎</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.botaoAcao, styles.botaoDelete]} onPress={() => onDelete(reg.id)}>
                <Text style={[styles.iconeTexto, styles.iconeDelete]}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.semRegistrosTexto}>Ainda não há registros por aqui.</Text>
      )}
    </View>
  );
}

// Estilos completamente redesenhados para a nova identidade visual.
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eef0f6', // Cor de borda suave da nova paleta
  },
  itemInfo: {
    flex: 1,
  },
  dataTexto: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1c2a4d', // Azul escuro do tema
    marginBottom: 5,
  },
  statsTexto: {
    fontSize: 15,
    color: '#555',
  },
  botoesContainer: {
    flexDirection: 'row',
  },
  botaoAcao: {
    width: 36,
    height: 36,
    borderRadius: 18, // Botões perfeitamente circulares
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  botaoEditar: {
    backgroundColor: '#eef0f6', // Fundo cinza-azulado claro
  },
  botaoDelete: {
    backgroundColor: '#fdebeb', // Fundo rosado claro
  },
  iconeTexto: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconeEditar: {
    color: '#5c6ac4', // Ícone roxo do tema
  },
  iconeDelete: {
    color: '#e53935', // Ícone vermelho para deletar
  },
  semRegistrosTexto: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    paddingVertical: 20,
    fontStyle: 'italic',
  },
});