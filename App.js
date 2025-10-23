import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as Database from './services/Database';
import Formulario from './components/Formulario';
import ListaRegistros from './components/ListaRegistros';
import Estatisticas from './components/Estatisticas';
import Grafico from './components/Grafico'; 
import * as Sharing from 'expo-sharing';

export default function App() {
  const [registros, setRegistros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [ordenacao, setOrdenacao] = useState('recentes'); 

  useEffect(() => {
    const init = async () => {
      const dados = await Database.carregarDados();
      setRegistros(dados);
      setCarregando(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (!carregando) {
      Database.salvarDados(registros);
    }
  }, [registros, carregando]);

  const handleSave = (coposAgua, minutosExercicio, calorias) => {
    const aguaNum = parseFloat(String(coposAgua).replace(',', '.'));
    const exercicioNum = parseFloat(String(minutosExercicio).replace(',', '.'));
    const caloriasNum = parseFloat(String(calorias).replace(',', '.'));

    if (isNaN(aguaNum) || isNaN(exercicioNum) || isNaN(caloriasNum)) {
      return Alert.alert("Erro", "Todos os campos devem ser preenchidos com números.");
    }
    if (aguaNum < 0 || exercicioNum < 0 || caloriasNum < 0) {
      return Alert.alert("Erro de Validação", "Nenhum valor pode ser negativo. Por favor, corrija.");
    }

    if (editingId) {
      const registrosAtualizados = registros.map(reg =>
        reg.id === editingId 
        ? { ...reg, agua: aguaNum, exercicio: exercicioNum, calorias: caloriasNum } 
        : reg
      );
      setRegistros(registrosAtualizados);
    } else {
      const novoRegistro = { 
        id: new Date().getTime(), 
        data: new Date().toLocaleDateString('pt-BR'),
        agua: aguaNum, 
        exercicio: exercicioNum, 
        calorias: caloriasNum 
      };
      setRegistros([...registros, novoRegistro]);
    }
    setEditingId(null);
    Alert.alert('Feito!', 'Seu registro foi salvo com sucesso!');
  };

  const handleDelete = (id) => {
    setRegistros(registros.filter(reg => reg.id !== id));
    Alert.alert('Sucesso!', 'O registro foi removido.');
  };

  const handleEdit = (registro) => {
    setEditingId(registro.id);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const exportarDados = async () => { /* ...código de exportar... */ };

  let registrosExibidos = [...registros];
  if (ordenacao === 'maior_agua') {
    registrosExibidos.sort((a, b) => b.agua - a.agua);
  } else {
    registrosExibidos.sort((a, b) => b.id - a.id);
  }

  if (carregando) {
    return <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#6a5acd" /></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.titulo}>Registro de Hábitos 🎯</Text>
        <Text style={styles.subtituloApp}>Acompanhe suas metas diárias</Text>

        <Grafico registros={registros} />

        <Formulario
          onSave={handleSave}
          onCancel={handleCancel}
          registroEmEdicao={registros.find(r => r.id === editingId) || null}
        />

        <Estatisticas registros={registros} />

        <View style={styles.card}>
          <Text style={styles.subtitulo}>Seus Registros</Text>
          <View style={styles.ordenacaoContainer}>
            <TouchableOpacity 
              style={[styles.botaoOrdenacao, ordenacao === 'recentes' ? styles.botaoOrdenacaoAtivo : {}]} 
              onPress={() => setOrdenacao('recentes')}
            >
              <Text style={[styles.botaoOrdenacaoTexto, ordenacao === 'recentes' ? styles.botaoOrdenacaoTextoAtivo : {}]}>Recentes</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.botaoOrdenacao, ordenacao === 'maior_agua' ? styles.botaoOrdenacaoAtivo : {}]} 
              onPress={() => setOrdenacao('maior_agua')}
            >
              <Text style={[styles.botaoOrdenacaoTexto, ordenacao === 'maior_agua' ? styles.botaoOrdenacaoTextoAtivo : {}]}>Mais Água</Text>
            </TouchableOpacity>
          </View>
          
          <ListaRegistros
            registros={registrosExibidos}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </View>

        <View style={styles.card}>
            <Text style={styles.subtitulo}>Backup dos Dados</Text>
            <TouchableOpacity style={styles.botaoExportar} onPress={exportarDados}>
                <Text style={styles.botaoTexto}>Gerar Relatório JSON</Text>
            </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Platform.OS === 'android' ? 25 : 0, backgroundColor: '#f4f4f8' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f4f8' },
  titulo: { fontSize: 30, fontWeight: '700', textAlign: 'center', marginVertical: 20, color: '#1c2a4d' },
  subtituloApp: { textAlign: 'center', fontSize: 16, color: '#5c6ac4', marginTop: -20, marginBottom: 20 },
  card: { backgroundColor: 'white', borderRadius: 8, padding: 16, marginHorizontal: 15, marginBottom: 20, elevation: 2, shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.08, shadowRadius: 5 },
  subtitulo: { fontSize: 22, fontWeight: '600', marginBottom: 15, color: '#1c2a4d' },
  ordenacaoContainer: { flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 15, gap: 10 },
  botaoOrdenacao: { paddingVertical: 8, paddingHorizontal: 16, backgroundColor: '#eef0f6', borderRadius: 20 },
  botaoOrdenacaoAtivo: { backgroundColor: '#5c6ac4' },
  botaoOrdenacaoTexto: { color: '#333', fontWeight: '500' },
  botaoOrdenacaoTextoAtivo: { color: 'white' },
  botaoExportar: { backgroundColor: '#2dce89', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  botaoTexto: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});