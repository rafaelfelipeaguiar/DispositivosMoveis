import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet
} from 'react-native';
import { aplicarMascara } from './mascaras';
import {
  validarCPF,
  validarNomeCompleto,
  validarDataNascimento,
  validarTelefoneFixo,
  validarCelular,
  validarCEP,
  validarEmail,
  validarSenha,
  validarConfirmarSenha,
  validarCampoObrigatorio,
  validarFormulario
} from './validacoes';
import TabNavigator from './TabNavigator';

const FormularioCompleto = () => {
  // Estados para os campos do formulário
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    dataNascimento: '',
    cpf: '',
    telefoneFixo: '',
    celular: '',
    nomePai: '',
    nomeMae: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    cidade: '',
    estado: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });

  // Estados para controle de erros
  const [errors, setErrors] = useState({});
  
  // Estado para controlar se é menor de idade
  const [isMenorIdade, setIsMenorIdade] = useState(false);

  // Estado para controlar a tab ativa
  const [activeTab, setActiveTab] = useState(0);

  // Estado para controlar tabs com erro e completas
  const [tabErrors, setTabErrors] = useState({});
  const [completedTabs, setCompletedTabs] = useState([]);

  // Configuração das tabs
  const allTabs = [
    { title: 'Informações\nPessoais', key: 'pessoais' },
    { title: 'Informações\nComplementares', key: 'complementares' },
    { title: 'Endereço', key: 'endereco' },
    { title: 'Conta', key: 'conta' }
  ];

  // Filtrar tabs baseado na idade
  const tabs = isMenorIdade ? allTabs : allTabs.filter((_, index) => index !== 1);

  // Função para calcular idade
  const calcularIdade = (dataNascimento) => {
    if (!dataNascimento || dataNascimento.length !== 10) return null;
    
    const [dia, mes, ano] = dataNascimento.split('/').map(Number);
    const hoje = new Date();
    const nascimento = new Date(ano, mes - 1, dia);
    
    if (nascimento > hoje) return null;
    
    let idade = hoje.getFullYear() - ano;
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();
    
    if (mesAtual < mes - 1 || (mesAtual === mes - 1 && diaAtual < dia)) {
      idade--;
    }
    
    return idade;
  };

  // Atualizar campo do formulário com máscara e validação
  const updateField = (field, value, mascara = null) => {
    // Aplicar máscara se especificada
    let valorFormatado = value;
    if (mascara) {
      valorFormatado = aplicarMascara(value, mascara);
    }
    
    setFormData(prev => ({ ...prev, [field]: valorFormatado }));
    
    // Validar em tempo real
    validarCampoTempoReal(field, valorFormatado);
    
    // Verificar se é menor de idade quando data de nascimento mudar
    if (field === 'dataNascimento') {
      const idade = calcularIdade(valorFormatado);
      if (idade !== null) {
        setIsMenorIdade(idade < 18);
        
        // Limpar erros dos campos de pai/mãe se não for mais menor
        if (idade >= 18) {
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.nomePai;
            delete newErrors.nomeMae;
            return newErrors;
          });
        }
      }
    }
    
    // Validar confirmação de senha quando senha principal mudar
    if (field === 'senha' && formData.confirmarSenha) {
      const validacaoConfirmar = validarConfirmarSenha(valorFormatado, formData.confirmarSenha);
      if (!validacaoConfirmar.valido) {
        setErrors(prev => ({ ...prev, confirmarSenha: validacaoConfirmar.erro }));
      } else {
        setErrors(prev => ({ ...prev, confirmarSenha: '' }));
      }
    }
    
    // Validar confirmação de senha quando confirmação mudar
    if (field === 'confirmarSenha') {
      const validacaoConfirmar = validarConfirmarSenha(formData.senha, valorFormatado);
      if (!validacaoConfirmar.valido) {
        setErrors(prev => ({ ...prev, confirmarSenha: validacaoConfirmar.erro }));
      } else {
        setErrors(prev => ({ ...prev, confirmarSenha: '' }));
      }
    }
  };

  // Validação em tempo real para cada campo
  const validarCampoTempoReal = (field, value) => {
    let validacao = { valido: true, erro: null };
    
    switch (field) {
      case 'nomeCompleto':
        validacao = validarNomeCompleto(value);
        break;
      case 'dataNascimento':
        validacao = validarDataNascimento(value);
        break;
      case 'cpf':
        validacao = validarCPF(value);
        break;
      case 'telefoneFixo':
        validacao = validarTelefoneFixo(value);
        break;
      case 'celular':
        validacao = validarCelular(value);
        break;
      case 'nomePai':
        if (isMenorIdade) {
          validacao = validarCampoObrigatorio(value, 'Nome do Pai');
        }
        break;
      case 'nomeMae':
        if (isMenorIdade) {
          validacao = validarCampoObrigatorio(value, 'Nome da Mãe');
        }
        break;
      case 'cep':
        validacao = validarCEP(value);
        break;
      case 'endereco':
        validacao = validarCampoObrigatorio(value, 'Endereço');
        break;
      case 'numero':
        validacao = validarCampoObrigatorio(value, 'Número');
        break;
      case 'cidade':
        validacao = validarCampoObrigatorio(value, 'Cidade');
        break;
      case 'estado':
        validacao = validarCampoObrigatorio(value, 'Estado');
        break;
      case 'email':
        validacao = validarEmail(value);
        break;
      case 'senha':
        validacao = validarSenha(value);
        break;
    }
    
    if (!validacao.valido) {
      setErrors(prev => ({ ...prev, [field]: validacao.erro }));
    } else {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Função para submeter o formulário
  const handleSubmit = () => {
    const validacao = validarFormulario(formData, isMenorIdade);
    
    if (!validacao.valido) {
      setErrors(validacao.erros);
      Alert.alert('Erro', 'Por favor, corrija os erros no formulário antes de continuar.');
      return;
    }
    
    Alert.alert(
      'Sucesso!', 
      'Formulário enviado com sucesso!',
      [{ text: 'OK', onPress: () => console.log('Dados:', formData) }]
    );
  };

  // Função para validar uma tab específica
  const validarTab = (tabIndex) => {
    const camposTab = getCamposTab(tabIndex);
    const errosTab = {};
    
    camposTab.forEach(campo => {
      validarCampoTempoReal(campo, formData[campo]);
      if (errors[campo]) {
        errosTab[campo] = errors[campo];
      }
    });

    return Object.keys(errosTab).length === 0;
  };

  // Função para obter campos de uma tab
  const getCamposTab = (tabIndex) => {
    const currentTab = tabs[tabIndex];
    if (!currentTab) return [];

    switch (currentTab.key) {
      case 'pessoais': // Informações Pessoais
        return ['nomeCompleto', 'dataNascimento', 'cpf', 'telefoneFixo', 'celular'];
      case 'complementares': // Informações Complementares
        return isMenorIdade ? ['nomePai', 'nomeMae'] : [];
      case 'endereco': // Endereço
        return ['cep', 'endereco', 'numero', 'cidade', 'estado'];
      case 'conta': // Conta
        return ['email', 'senha', 'confirmarSenha'];
      default:
        return [];
    }
  };

  // Função para navegar entre tabs
  const handleTabPress = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  // Função para ir para próxima tab
  const nextTab = () => {
    const isTabValid = validarTab(activeTab);
    
    if (!isTabValid) {
      Alert.alert('Atenção', 'Por favor, corrija os erros nesta seção antes de continuar.');
      return;
    }

    // Marcar tab atual como completa
    if (!completedTabs.includes(activeTab)) {
      setCompletedTabs(prev => [...prev, activeTab]);
    }

    const nextIndex = activeTab + 1;
    if (nextIndex < tabs.length) {
      setActiveTab(nextIndex);
    }
  };

  // Função para voltar tab anterior
  const prevTab = () => {
    const prevIndex = activeTab - 1;
    if (prevIndex >= 0) {
      setActiveTab(prevIndex);
    }
  };

  // Atualizar erros das tabs quando errors mudar
  useEffect(() => {
    const newTabErrors = {};
    
    tabs.forEach((tab, index) => {
      const camposTab = getCamposTab(index);
      const hasErrors = camposTab.some(campo => errors[campo]);
      
      if (hasErrors) {
        newTabErrors[index] = true;
      }
    });
    
    setTabErrors(newTabErrors);
  }, [errors, isMenorIdade]);

  // Resetar tab ativa quando a idade mudar e estiver numa tab que não existe mais
  useEffect(() => {
    if (activeTab >= tabs.length) {
      setActiveTab(0);
    }
  }, [tabs.length, activeTab]);

  // Função para renderizar campo de entrada com máscara e validação
  const renderInput = (placeholder, field, keyboardType = 'default', secureTextEntry = false, mascara = null) => (
    <View style={styles.inputContainer}>
      <TextInput
        style={[
          styles.input,
          errors[field] ? styles.inputError : styles.inputSuccess
        ]}
        placeholder={placeholder}
        value={formData[field]}
        onChangeText={(value) => updateField(field, value, mascara)}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#999"
        maxLength={getMaxLength(field)}
      />
      {errors[field] ? (
        <Text style={styles.errorText}>{errors[field]}</Text>
      ) : null}
    </View>
  );

  // Função para definir o comprimento máximo baseado no tipo de campo
  const getMaxLength = (field) => {
    switch (field) {
      case 'cpf': return 14; // XXX.XXX.XXX-XX
      case 'telefoneFixo': return 14; // (XX) XXXX-XXXX
      case 'celular': return 15; // (XX) 9XXXX-XXXX
      case 'cep': return 9; // XXXXX-XXX
      case 'dataNascimento': return 10; // DD/MM/AAAA
      default: return undefined;
    }
  };

  // Função para renderizar conteúdo da tab ativa
  const renderTabContent = () => {
    const currentTab = tabs[activeTab];
    if (!currentTab) return null;

    switch (currentTab.key) {
      case 'pessoais': // Informações Pessoais
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Informações Pessoais</Text>
            {renderInput('Nome Completo *', 'nomeCompleto', 'default', false, 'nome')}
            {renderInput('Data de Nascimento (DD/MM/AAAA) *', 'dataNascimento', 'numeric', false, 'data')}
            {renderInput('CPF *', 'cpf', 'numeric', false, 'cpf')}
            {renderInput('Telefone Fixo (com DDD) *', 'telefoneFixo', 'phone-pad', false, 'telefoneFixo')}
            {renderInput('Celular (com DDD) *', 'celular', 'phone-pad', false, 'celular')}
          </View>
        );

      case 'complementares': // Informações Complementares
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Informações Complementares</Text>
            <Text style={styles.warningText}>
              ⚠️ Como você é menor de 18 anos, os campos abaixo são obrigatórios:
            </Text>
            {renderInput('Nome do Pai *', 'nomePai', 'default', false, 'nome')}
            {renderInput('Nome da Mãe *', 'nomeMae', 'default', false, 'nome')}
          </View>
        );

      case 'endereco': // Endereço
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Endereço</Text>
            {renderInput('CEP *', 'cep', 'numeric', false, 'cep')}
            {renderInput('Endereço *', 'endereco', 'default', false, 'texto')}
            {renderInput('Número *', 'numero', 'numeric', false, 'numeros')}
            {renderInput('Complemento', 'complemento', 'default', false, 'texto')}
            {renderInput('Cidade *', 'cidade', 'default', false, 'texto')}
            {renderInput('Estado *', 'estado', 'default', false, 'texto')}
          </View>
        );

      case 'conta': // Conta
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Informações da Conta</Text>
            {renderInput('Email *', 'email', 'email-address')}
            {renderInput('Senha *', 'senha', 'default', true)}
            {renderInput('Confirmar Senha *', 'confirmarSenha', 'default', true)}
          </View>
        );

      default:
        return null;
    }
  };

  // Renderizar botões de navegação
  const renderNavigationButtons = () => {
    const isLastTab = activeTab === tabs.length - 1;
    const isFirstTab = activeTab === 0;
    
    return (
      <View style={styles.navigationContainer}>
        {!isFirstTab && (
          <TouchableOpacity style={styles.prevButton} onPress={prevTab}>
            <Text style={styles.prevButtonText}>← Anterior</Text>
          </TouchableOpacity>
        )}
        
        <View style={styles.buttonSpacer} />
        
        {!isLastTab ? (
          <TouchableOpacity style={styles.nextButton} onPress={nextTab}>
            <Text style={styles.nextButtonText}>Próximo →</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Finalizar Cadastro</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulário de Cadastro</Text>
      
      <TabNavigator
        tabs={tabs}
        activeTab={activeTab}
        onTabPress={handleTabPress}
        tabErrors={tabErrors}
        completedTabs={completedTabs}
      />

      <ScrollView 
        style={styles.contentContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderTabContent()}
      </ScrollView>

      {renderNavigationButtons()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
    paddingHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  tabContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
    paddingBottom: 8,
  },
  skipMessage: {
    fontSize: 16,
    color: '#22c55e',
    textAlign: 'center',
    padding: 40,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#22c55e',
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#ff4444',
    backgroundColor: '#fff5f5',
  },
  inputSuccess: {
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  warningText: {
    color: '#ff8800',
    fontSize: 14,
    marginBottom: 15,
    backgroundColor: '#fff8e1',
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ff8800',
  },
  navigationContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  prevButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  prevButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonSpacer: {
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default FormularioCompleto;