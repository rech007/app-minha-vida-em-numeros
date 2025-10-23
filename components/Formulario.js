import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Formulario({ onSave, onCancel, registroEmEdicao }) {
  const [coposAgua, setCoposAgua] = useState('');
  const [minutosExercicio, setMinutosExercicio] = useState('');
  const [calorias, setCalorias] = useState('');

  useEffect(() => {
    if (registroEmEdicao) {
      setCoposAgua(String(registroEmEdicao.agua || ''));
      setMinutosExercicio(String(registroEmEdicao.exercicio || ''));
      setCalorias(String(registroEmEdicao.calorias || ''));
    } else {
      setCoposAgua('');
      setMinutosExercicio('');
      setCalorias('');
    }
  }, [registroEmEdicao]);

  const handleSaveClick = () => {
    onSave(coposAgua, minutosExercicio, calorias);
    if (!registroEmEdicao) {
        setCoposAgua('');
        setMinutosExercicio('');
        setCalorias('');
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.subtitulo}>
        {registroEmEdicao ? 'Atualizar Dados' : 'Adicionar Novo Registro'}
      </Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Copos de água" 
        keyboardType="numeric" 
        value={coposAgua} 
        onChangeText={setCoposAgua} 
        placeholderTextColor="#9a9a9a"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Minutos de atividade física" 
        keyboardType="numeric" 
        value={minutosExercicio} 
        onChangeText={setMinutosExercicio} 
        placeholderTextColor="#9a9a9a"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Total de calorias" 
        keyboardType="numeric" 
        value={calorias} 
        onChangeText={setCalorias} 
        placeholderTextColor="#9a9a9a"
      />

      <TouchableOpacity style={styles.botaoSalvar} onPress={handleSaveClick}>
        <Text style={styles.botaoSalvarTexto}>
          {registroEmEdicao ? 'Confirmar Alterações' : 'Registrar Atividade'}
        </Text>
      </TouchableOpacity>

      {registroEmEdicao && (
        <TouchableOpacity style={styles.botaoCancelar} onPress={onCancel}>
          <Text style={styles.botaoCancelarTexto}>Cancelar</Text>
        </TouchableOpacity>
      )}
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
    shadowRadius: 5 
  },
  subtitulo: { 
    fontSize: 22, 
    fontWeight: '600', 
    marginBottom: 20, 
    color: '#1c2a4d' 
  },
  input: { 
    backgroundColor: '#f4f4f8',
    borderWidth: 1, 
    borderColor: '#e1e1e1', 
    borderRadius: 8, 
    paddingVertical: 14,
    paddingHorizontal: 16, 
    fontSize: 16, 
    marginBottom: 12,
    color: '#333',
  },
  botaoSalvar: { 
    backgroundColor: '#5c6ac4', 
    padding: 16, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginTop: 10 
  },
  botaoSalvarTexto: { 
    color: 'white', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  botaoCancelar: { 
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#d1d1d1',
    padding: 12, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginTop: 10 
  },
  botaoCancelarTexto: {
    color: '#555',
    fontSize: 16,
    fontWeight: '500'
  }
});