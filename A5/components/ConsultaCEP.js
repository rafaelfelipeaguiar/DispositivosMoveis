import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { aplicarMascaraCEP, removerMascaraCEP } from './mascaras';
import { validarCEPSimples } from './validacoes';
import { consultarCEPComCache, verificarConectividade } from './CEPService';
import styles from './styles';

const ConsultaCEP = () => {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [fonte, setFonte] = useState('');

  const consultarCEP = async () => {
    // Limpar estados anteriores
    setErro('');
    setEndereco(null);
    setFonte('');

    // Remover máscara e validar CEP
    const cepLimpo = removerMascaraCEP(cep);
    
    if (!validarCEPSimples(cepLimpo)) {
      setErro('CEP inválido. Digite um CEP no formato 12345-678');
      return;
    }

    setLoading(true);

    try {
      // Primeiro verificar conectividade
      const temInternet = await verificarConectividade();
      
      if (!temInternet) {
        // Tentar buscar no cache local mesmo sem internet
        console.log('Sem internet, tentando cache local...');
      }

      // Usar o novo serviço com múltiplas APIs e cache
      const resultado = await consultarCEPComCache(cepLimpo);

      if (resultado.sucesso) {
        setEndereco(resultado.endereco);
        setFonte(resultado.fonte);
      } else {
        let mensagemErro = 'CEP não encontrado.';
        
        if (resultado.erro.includes('Timeout')) {
          mensagemErro = 'A consulta está demorando muito. Verifique sua conexão.';
        } else if (resultado.erro.includes('indisponíveis')) {
          mensagemErro = 'Serviços de CEP temporariamente indisponíveis. Tente novamente em alguns minutos.';
        } else if (!temInternet) {
          mensagemErro = 'Sem conexão com a internet e CEP não encontrado no cache local.';
        }
        
        setErro(mensagemErro);
        
        if (resultado.detalhes) {
          console.log('Detalhes do erro:', resultado.detalhes);
        }
      }
      
    } catch (error) {
      console.error('Erro inesperado ao consultar CEP:', error);
      setErro('Erro inesperado. Tente novamente ou verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };

  const limparConsulta = () => {
    setCep('');
    setEndereco(null);
    setErro('');
    setFonte('');
  };

  const handleCepChange = (text) => {
    const cepComMascara = aplicarMascaraCEP(text);
    setCep(cepComMascara);
    
    // Limpar erro quando o usuário começar a digitar
    if (erro) {
      setErro('');
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar style="dark" backgroundColor="#f5f5f5" />
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.cepContainer}>
          <Text style={styles.title}>Consulta de CEP</Text>
          <Text style={styles.subtitle}>Digite o CEP para consultar o endereço</Text>

          {/* Formulário de entrada */}
          <View style={styles.formContainer}>
            <Text style={styles.label}>CEP</Text>
            <TextInput
              style={[styles.input, erro ? styles.inputError : null]}
              placeholder="12345-678"
              value={cep}
              onChangeText={handleCepChange}
              maxLength={9}
              keyboardType="numeric"
              editable={!loading}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.primaryButton, loading ? styles.buttonDisabled : null]}
                onPress={consultarCEP}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Consultar CEP</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={limparConsulta}
                disabled={loading}
              >
                <Text style={styles.secondaryButtonText}>Limpar</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Exibição de erro */}
          {erro ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>❌ {erro}</Text>
            </View>
          ) : null}

          {/* Exibição dos resultados */}
          {endereco ? (
            <View style={styles.resultContainer}>
              <Text style={styles.resultTitle}>📍 Endereço Encontrado</Text>
              {fonte && (
                <Text style={styles.sourceText}>Fonte: {fonte}</Text>
              )}
              
              <View style={styles.addressCard}>
                <View style={styles.addressRow}>
                  <Text style={styles.addressLabel}>CEP:</Text>
                  <Text style={styles.addressValue}>{endereco.cep}</Text>
                </View>

                <View style={styles.addressRow}>
                  <Text style={styles.addressLabel}>Logradouro:</Text>
                  <Text style={styles.addressValue}>{endereco.logradouro}</Text>
                </View>

                <View style={styles.addressRow}>
                  <Text style={styles.addressLabel}>Bairro:</Text>
                  <Text style={styles.addressValue}>{endereco.bairro}</Text>
                </View>

                <View style={styles.addressRow}>
                  <Text style={styles.addressLabel}>Cidade:</Text>
                  <Text style={styles.addressValue}>{endereco.cidade}</Text>
                </View>

                <View style={styles.addressRow}>
                  <Text style={styles.addressLabel}>Estado:</Text>
                  <Text style={styles.addressValue}>{endereco.estado}</Text>
                </View>

                {endereco.complemento ? (
                  <View style={styles.addressRow}>
                    <Text style={styles.addressLabel}>Complemento:</Text>
                    <Text style={styles.addressValue}>{endereco.complemento}</Text>
                  </View>
                ) : null}

                {endereco.ddd ? (
                  <View style={styles.addressRow}>
                    <Text style={styles.addressLabel}>DDD:</Text>
                    <Text style={styles.addressValue}>{endereco.ddd}</Text>
                  </View>
                ) : null}
              </View>
            </View>
          ) : null}

          {/* Indicador de carregamento */}
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007bff" />
              <Text style={styles.loadingText}>
                Consultando CEP...
              </Text>
              <Text style={styles.loadingSubtext}>
                Tentando múltiplas fontes
              </Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConsultaCEP;