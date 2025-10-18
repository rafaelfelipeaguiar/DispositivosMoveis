// Funções de máscara para formatação de campos

// Máscara para CPF (XXX.XXX.XXX-XX)
export const mascaraCPF = (valor) => {
  // Remove tudo que não é dígito
  valor = valor.replace(/\D/g, '');
  
  // Limita a 11 dígitos
  valor = valor.substring(0, 11);
  
  // Aplica a máscara
  valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
  valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
  valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  
  return valor;
};

// Máscara para telefone fixo (XX) XXXX-XXXX
export const mascaraTelefoneFixo = (valor) => {
  // Remove tudo que não é dígito
  valor = valor.replace(/\D/g, '');
  
  // Limita a 10 dígitos
  valor = valor.substring(0, 10);
  
  // Aplica a máscara
  valor = valor.replace(/(\d{2})(\d)/, '($1) $2');
  valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
  
  return valor;
};

// Máscara para celular (XX) 9XXXX-XXXX
export const mascaraCelular = (valor) => {
  // Remove tudo que não é dígito
  valor = valor.replace(/\D/g, '');
  
  // Limita a 11 dígitos
  valor = valor.substring(0, 11);
  
  // Aplica a máscara
  valor = valor.replace(/(\d{2})(\d)/, '($1) $2');
  valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
  
  return valor;
};

// Máscara para CEP (XXXXX-XXX)
export const mascaraCEP = (valor) => {
  // Remove tudo que não é dígito
  valor = valor.replace(/\D/g, '');
  
  // Limita a 8 dígitos
  valor = valor.substring(0, 8);
  
  // Aplica a máscara
  valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
  
  return valor;
};

// Máscara para data (DD/MM/AAAA)
export const mascaraData = (valor) => {
  // Remove tudo que não é dígito
  valor = valor.replace(/\D/g, '');
  
  // Limita a 8 dígitos
  valor = valor.substring(0, 8);
  
  // Aplica a máscara
  valor = valor.replace(/(\d{2})(\d)/, '$1/$2');
  valor = valor.replace(/(\d{2})(\d)/, '$1/$2');
  
  return valor;
};

// Máscara para permitir apenas letras e espaços (nomes)
export const mascaraNome = (valor) => {
  // Remove números e caracteres especiais, mantém apenas letras, espaços e acentos
  return valor.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
};

// Máscara para números apenas
export const mascaraNumeros = (valor) => {
  return valor.replace(/\D/g, '');
};

// Máscara para remover espaços no início e múltiplos espaços
export const limparEspacos = (valor) => {
  return valor.replace(/^\s+/, '').replace(/\s+/g, ' ');
};

// Função específica para aplicar máscara de CEP (para o componente ConsultaCEP)
export const aplicarMascaraCEP = (valor) => {
  return mascaraCEP(valor);
};

// Função para remover máscara do CEP (para enviar à API)
export const removerMascaraCEP = (valor) => {
  return valor.replace(/\D/g, '');
};

// Função para aplicar máscara baseada no tipo de campo
export const aplicarMascara = (valor, tipo) => {
  switch (tipo) {
    case 'cpf':
      return mascaraCPF(valor);
    case 'telefoneFixo':
      return mascaraTelefoneFixo(valor);
    case 'celular':
      return mascaraCelular(valor);
    case 'cep':
      return mascaraCEP(valor);
    case 'data':
      return mascaraData(valor);
    case 'nome':
      return mascaraNome(valor);
    case 'numeros':
      return mascaraNumeros(valor);
    case 'texto':
      return limparEspacos(valor);
    default:
      return valor;
  }
};