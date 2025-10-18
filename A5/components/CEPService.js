// Serviço para consulta de CEP com múltiplos provedores e fallbacks

const TIMEOUT_MS = 10000; // 10 segundos de timeout
const MAX_RETRIES = 2; // Máximo de tentativas

// Lista de APIs de CEP disponíveis (em ordem de prioridade)
const CEP_APIS = [
  {
    name: 'ViaCEP',
    url: (cep) => `https://viacep.com.br/ws/${cep}/json/`,
    parseResponse: (data) => ({
      cep: data.cep,
      logradouro: data.logradouro || 'Não informado',
      bairro: data.bairro || 'Não informado',
      cidade: data.localidade || 'Não informado',
      estado: data.uf || 'Não informado',
      complemento: data.complemento || '',
      ddd: data.ddd || ''
    }),
    isError: (data) => data.erro === true
  },
  {
    name: 'BrasilAPI',
    url: (cep) => `https://brasilapi.com.br/api/cep/v1/${cep}`,
    parseResponse: (data) => ({
      cep: data.cep,
      logradouro: data.street || 'Não informado',
      bairro: data.neighborhood || 'Não informado',
      cidade: data.city || 'Não informado',
      estado: data.state || 'Não informado',
      complemento: '',
      ddd: ''
    }),
    isError: (data) => data.errors && data.errors.length > 0
  },
  {
    name: 'APICEP',
    url: (cep) => `https://cdn.apicep.com/file/apicep/${cep}.json`,
    parseResponse: (data) => ({
      cep: data.code,
      logradouro: data.address || 'Não informado',
      bairro: data.district || 'Não informado',
      cidade: data.city || 'Não informado',
      estado: data.state || 'Não informado',
      complemento: '',
      ddd: data.ddd || ''
    }),
    isError: (data) => data.status === 400 || !data.code
  }
];

// Função para fazer requisição com timeout
const fetchWithTimeout = async (url, timeoutMs = TIMEOUT_MS) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error('Timeout: A requisição demorou mais que o esperado');
    }
    
    throw error;
  }
};

// Função para tentar uma API específica com retry
const tryAPI = async (api, cep, retryCount = 0) => {
  try {
    console.log(`Tentando API ${api.name}${retryCount > 0 ? ` (tentativa ${retryCount + 1})` : ''}`);
    
    const url = api.url(cep);
    const data = await fetchWithTimeout(url);
    
    // Verificar se a resposta indica erro
    if (api.isError(data)) {
      throw new Error('CEP não encontrado nesta API');
    }
    
    // Processar e retornar dados
    const endereco = api.parseResponse(data);
    console.log(`Sucesso com API ${api.name}:`, endereco);
    
    return {
      sucesso: true,
      endereco,
      fonte: api.name
    };
    
  } catch (error) {
    console.log(`Erro na API ${api.name}:`, error.message);
    
    // Tentar novamente se não excedeu o limite
    if (retryCount < MAX_RETRIES) {
      await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1))); // Delay progressivo
      return await tryAPI(api, cep, retryCount + 1);
    }
    
    return {
      sucesso: false,
      erro: error.message,
      fonte: api.name
    };
  }
};

// Função principal para consultar CEP
export const consultarCEP = async (cep) => {
  const cepLimpo = cep.replace(/\D/g, '');
  
  console.log(`Iniciando consulta para CEP: ${cepLimpo}`);
  
  // Tentar cada API em sequência
  for (const api of CEP_APIS) {
    const resultado = await tryAPI(api, cepLimpo);
    
    if (resultado.sucesso) {
      return {
        sucesso: true,
        endereco: resultado.endereco,
        fonte: resultado.fonte
      };
    }
  }
  
  // Se chegou aqui, todas as APIs falharam
  console.log('Todas as APIs falharam');
  
  return {
    sucesso: false,
    erro: 'Não foi possível consultar o CEP. Todas as fontes estão indisponíveis.',
    detalhes: 'Tentativas realizadas em: ViaCEP, BrasilAPI e APICEP'
  };
};

// Função para verificar conectividade
export const verificarConectividade = async () => {
  try {
    // Tenta fazer uma requisição simples para verificar conectividade
    const response = await fetchWithTimeout('https://httpbin.org/get', 5000);
    return true;
  } catch (error) {
    console.log('Sem conectividade:', error.message);
    return false;
  }
};

// Cache simples para CEPs consultados
const cacheLocal = new Map();
const CACHE_EXPIRE_MS = 24 * 60 * 60 * 1000; // 24 horas

export const consultarCEPComCache = async (cep) => {
  const cepLimpo = cep.replace(/\D/g, '');
  const chaveCache = cepLimpo;
  
  // Verificar cache
  const itemCache = cacheLocal.get(chaveCache);
  if (itemCache && Date.now() - itemCache.timestamp < CACHE_EXPIRE_MS) {
    console.log('Retornando do cache:', itemCache.endereco);
    return {
      sucesso: true,
      endereco: itemCache.endereco,
      fonte: 'Cache Local'
    };
  }
  
  // Consultar API
  const resultado = await consultarCEP(cepLimpo);
  
  // Salvar no cache se bem-sucedido
  if (resultado.sucesso) {
    cacheLocal.set(chaveCache, {
      endereco: resultado.endereco,
      timestamp: Date.now()
    });
  }
  
  return resultado;
};

// Exportar APIs disponíveis para debugging
export const getAPIsDisponiveis = () => CEP_APIS.map(api => api.name);

export default {
  consultarCEP,
  consultarCEPComCache,
  verificarConectividade,
  getAPIsDisponiveis
};