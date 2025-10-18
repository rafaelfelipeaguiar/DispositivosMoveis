// Funções de validação para formulário

// Validação de CPF
export const validarCPF = (cpf) => {
  // Remove caracteres não numéricos
  const cpfLimpo = cpf.replace(/\D/g, '');
  
  // Verifica se tem 11 dígitos
  if (cpfLimpo.length !== 11) {
    return { valido: false, erro: 'CPF deve ter 11 dígitos' };
  }
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cpfLimpo)) {
    return { valido: false, erro: 'CPF inválido' };
  }
  
  // Validação dos dígitos verificadores
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
  }
  
  let resto = 11 - (soma % 11);
  let dv1 = resto > 9 ? 0 : resto;
  
  if (dv1 !== parseInt(cpfLimpo.charAt(9))) {
    return { valido: false, erro: 'CPF inválido' };
  }
  
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
  }
  
  resto = 11 - (soma % 11);
  let dv2 = resto > 9 ? 0 : resto;
  
  if (dv2 !== parseInt(cpfLimpo.charAt(10))) {
    return { valido: false, erro: 'CPF inválido' };
  }
  
  return { valido: true, erro: null };
};

// Validação de nome completo
export const validarNomeCompleto = (nome) => {
  const nomeFormatado = nome.trim();
  
  if (!nomeFormatado) {
    return { valido: false, erro: 'Nome é obrigatório' };
  }
  
  const partesNome = nomeFormatado.split(' ').filter(parte => parte.length > 0);
  
  if (partesNome.length < 2) {
    return { valido: false, erro: 'Informe nome e sobrenome' };
  }
  
  return { valido: true, erro: null };
};

// Validação de data de nascimento
export const validarDataNascimento = (data) => {
  if (!data) {
    return { valido: false, erro: 'Data de nascimento é obrigatória' };
  }
  
  // Verifica formato DD/MM/AAAA
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = data.match(regex);
  
  if (!match) {
    return { valido: false, erro: 'Use o formato DD/MM/AAAA' };
  }
  
  const [, dia, mes, ano] = match;
  const dataObj = new Date(ano, mes - 1, dia);
  
  // Verifica se a data é válida
  if (dataObj.getDate() != dia || dataObj.getMonth() + 1 != mes || dataObj.getFullYear() != ano) {
    return { valido: false, erro: 'Data inválida' };
  }
  
  // Verifica se não é futura
  if (dataObj > new Date()) {
    return { valido: false, erro: 'Data não pode ser futura' };
  }
  
  // Verifica idade mínima (ex: não pode ter mais de 120 anos)
  const idadeMaxima = new Date();
  idadeMaxima.setFullYear(idadeMaxima.getFullYear() - 120);
  
  if (dataObj < idadeMaxima) {
    return { valido: false, erro: 'Data muito antiga' };
  }
  
  return { valido: true, erro: null };
};

// Validação de telefone fixo
export const validarTelefoneFixo = (telefone) => {
  const telefoneNumeros = telefone.replace(/\D/g, '');
  
  if (!telefoneNumeros) {
    return { valido: false, erro: 'Telefone é obrigatório' };
  }
  
  if (telefoneNumeros.length !== 10) {
    return { valido: false, erro: 'Telefone deve ter 10 dígitos (DDD + número)' };
  }
  
  // Verifica se o DDD é válido (11 a 99)
  const ddd = parseInt(telefoneNumeros.substring(0, 2));
  if (ddd < 11 || ddd > 99) {
    return { valido: false, erro: 'DDD inválido' };
  }
  
  return { valido: true, erro: null };
};

// Validação de celular
export const validarCelular = (celular) => {
  const celularNumeros = celular.replace(/\D/g, '');
  
  if (!celularNumeros) {
    return { valido: false, erro: 'Celular é obrigatório' };
  }
  
  if (celularNumeros.length !== 11) {
    return { valido: false, erro: 'Celular deve ter 11 dígitos (DDD + número)' };
  }
  
  // Verifica se o DDD é válido
  const ddd = parseInt(celularNumeros.substring(0, 2));
  if (ddd < 11 || ddd > 99) {
    return { valido: false, erro: 'DDD inválido' };
  }
  
  // Verifica se o terceiro dígito é 9 (obrigatório para celular)
  if (celularNumeros.charAt(2) !== '9') {
    return { valido: false, erro: 'Celular deve ter o 9º dígito' };
  }
  
  return { valido: true, erro: null };
};

// Validação de CEP
export const validarCEP = (cep) => {
  const cepNumeros = cep.replace(/\D/g, '');
  
  if (!cepNumeros) {
    return { valido: false, erro: 'CEP é obrigatório' };
  }
  
  if (cepNumeros.length !== 8) {
    return { valido: false, erro: 'CEP deve ter 8 dígitos' };
  }
  
  return { valido: true, erro: null };
};

// Validação de email
export const validarEmail = (email) => {
  if (!email) {
    return { valido: false, erro: 'Email é obrigatório' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return { valido: false, erro: 'Email inválido' };
  }
  
  return { valido: true, erro: null };
};

// Validação de senha
export const validarSenha = (senha) => {
  if (!senha) {
    return { valido: false, erro: 'Senha é obrigatória' };
  }
  
  if (senha.length < 8) {
    return { valido: false, erro: 'Senha deve ter no mínimo 8 caracteres' };
  }
  
  const temMaiuscula = /[A-Z]/.test(senha);
  const temMinuscula = /[a-z]/.test(senha);
  const temNumero = /\d/.test(senha);
  const temEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);
  
  const criterios = [temMaiuscula, temMinuscula, temNumero, temEspecial];
  const criteriosAtendidos = criterios.filter(Boolean).length;
  
  if (criteriosAtendidos < 3) {
    return { 
      valido: false, 
      erro: 'Senha deve ter pelo menos 3 dos seguintes: maiúscula, minúscula, número, caractere especial' 
    };
  }
  
  return { valido: true, erro: null };
};

// Validação de confirmação de senha
export const validarConfirmarSenha = (senha, confirmarSenha) => {
  if (!confirmarSenha) {
    return { valido: false, erro: 'Confirmação de senha é obrigatória' };
  }
  
  if (senha !== confirmarSenha) {
    return { valido: false, erro: 'Senhas não conferem' };
  }
  
  return { valido: true, erro: null };
};

// Validação de campo obrigatório genérico
export const validarCampoObrigatorio = (valor, nomeCampo) => {
  if (!valor || valor.trim() === '') {
    return { valido: false, erro: `${nomeCampo} é obrigatório` };
  }
  
  return { valido: true, erro: null };
};

// Função principal de validação do formulário
export const validarFormulario = (formData, isMenorIdade) => {
  const erros = {};
  
  // Validar nome completo
  const validacaoNome = validarNomeCompleto(formData.nomeCompleto);
  if (!validacaoNome.valido) erros.nomeCompleto = validacaoNome.erro;
  
  // Validar data de nascimento
  const validacaoData = validarDataNascimento(formData.dataNascimento);
  if (!validacaoData.valido) erros.dataNascimento = validacaoData.erro;
  
  // Validar CPF
  const validacaoCPF = validarCPF(formData.cpf);
  if (!validacaoCPF.valido) erros.cpf = validacaoCPF.erro;
  
  // Validar telefone fixo
  const validacaoTelefone = validarTelefoneFixo(formData.telefoneFixo);
  if (!validacaoTelefone.valido) erros.telefoneFixo = validacaoTelefone.erro;
  
  // Validar celular
  const validacaoCelular = validarCelular(formData.celular);
  if (!validacaoCelular.valido) erros.celular = validacaoCelular.erro;
  
  // Validar campos para menores de idade
  if (isMenorIdade) {
    const validacaoNomePai = validarCampoObrigatorio(formData.nomePai, 'Nome do Pai');
    if (!validacaoNomePai.valido) erros.nomePai = validacaoNomePai.erro;
    
    const validacaoNomeMae = validarCampoObrigatorio(formData.nomeMae, 'Nome da Mãe');
    if (!validacaoNomeMae.valido) erros.nomeMae = validacaoNomeMae.erro;
  }
  
  // Validar CEP
  const validacaoCEP = validarCEP(formData.cep);
  if (!validacaoCEP.valido) erros.cep = validacaoCEP.erro;
  
  // Validar campos de endereço obrigatórios
  const validacaoEndereco = validarCampoObrigatorio(formData.endereco, 'Endereço');
  if (!validacaoEndereco.valido) erros.endereco = validacaoEndereco.erro;
  
  const validacaoNumero = validarCampoObrigatorio(formData.numero, 'Número');
  if (!validacaoNumero.valido) erros.numero = validacaoNumero.erro;
  
  const validacaoCidade = validarCampoObrigatorio(formData.cidade, 'Cidade');
  if (!validacaoCidade.valido) erros.cidade = validacaoCidade.erro;
  
  const validacaoEstado = validarCampoObrigatorio(formData.estado, 'Estado');
  if (!validacaoEstado.valido) erros.estado = validacaoEstado.erro;
  
  // Validar email
  const validacaoEmail = validarEmail(formData.email);
  if (!validacaoEmail.valido) erros.email = validacaoEmail.erro;
  
  // Validar senha
  const validacaoSenha = validarSenha(formData.senha);
  if (!validacaoSenha.valido) erros.senha = validacaoSenha.erro;
  
  // Validar confirmação de senha
  const validacaoConfirmarSenha = validarConfirmarSenha(formData.senha, formData.confirmarSenha);
  if (!validacaoConfirmarSenha.valido) erros.confirmarSenha = validacaoConfirmarSenha.erro;
  
  return {
    valido: Object.keys(erros).length === 0,
    erros
  };
};