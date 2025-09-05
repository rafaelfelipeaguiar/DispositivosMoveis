import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  SafeAreaView 
} from 'react-native';

export default function App() {
  const [numero1, setNumero1] = useState('');
  const [numero2, setNumero2] = useState('');
  const [resultado, setResultado] = useState('');

  const calcularSoma = () => {
    // Validação dos números
    const num1 = parseFloat(numero1);
    const num2 = parseFloat(numero2);

    if (isNaN(num1) || isNaN(num2)) {
      Alert.alert('Erro', 'Por favor, insira números válidos');
      return;
    }

    if (numero1.trim() === '' || numero2.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha ambos os campos');
      return;
    }

    const soma = num1 + num2;
    setResultado(soma.toString());
  };

  const limparCampos = () => {
    setNumero1('');
    setNumero2('');
    setResultado('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titulo}>Calculadora de Soma</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Primeiro número:</Text>
          <TextInput
            style={styles.input}
            value={numero1}
            onChangeText={setNumero1}
            placeholder="Digite o primeiro número"
            keyboardType="numeric"
            returnKeyType="next"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Segundo número:</Text>
          <TextInput
            style={styles.input}
            value={numero2}
            onChangeText={setNumero2}
            placeholder="Digite o segundo número"
            keyboardType="numeric"
            returnKeyType="done"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonSomar} onPress={calcularSoma}>
            <Text style={styles.buttonText}>Somar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonLimpar} onPress={limparCampos}>
            <Text style={styles.buttonText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.resultadoContainer}>
          <Text style={styles.labelResultado}>Resultado:</Text>
          <Text style={styles.resultado}>
            {resultado === '' ? '---' : resultado}
          </Text>
        </View>
      </View>
      
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#555',
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30,
  },
  buttonSomar: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    flex: 0.45,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonLimpar: {
    backgroundColor: '#FF9800',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    flex: 0.45,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultadoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  labelResultado: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#555',
  },
  resultado: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
  },
});
