# Aplicativo de Consulta de CEP - React Native

Este é um aplicativo React Native desenvolvido com Expo que permite ao usuário consultar informações de endereço utilizando a API ViaCEP (alternativamente à API CEP Aberto).

## Funcionalidades

✅ **Formulário de Entrada**
- Campo de texto com máscara automática para CEP (XXXXX-XXX)
- Validação em tempo real do formato do CEP
- Botão para submeter a consulta
- Botão para limpar o formulário

✅ **Requisição à API**
- Utiliza a API ViaCEP (https://viacep.com.br) via método HTTP GET
- Tratamento completo de respostas da API
- Formatação automática dos dados retornados

✅ **Tratamento de Erros**
- Validação de formato de CEP antes da requisição
- Mensagens de erro específicas para CEP inválido ou não encontrado
- Tratamento de erros de conexão de rede

✅ **Feedback Visual**
- Indicador de carregamento (ActivityIndicator) durante a requisição
- Interface responsiva que se atualiza conforme o estado da aplicação
- Mensagens de sucesso e erro claramente diferenciadas

✅ **Boas Práticas**
- Código organizado em componentes funcionais
- Uso adequado de hooks (useState)
- Código limpo e modularizado
- Separação de responsabilidades (máscaras, validações, estilos)

## Estrutura do Projeto

```
components/
├── ConsultaCEP.js      # Componente principal de consulta de CEP
├── mascaras.js         # Funções de máscara para formatação
├── validacoes.js       # Funções de validação
└── styles.js           # Estilos do componente
App.js                  # Componente raiz da aplicação
```

## Como Usar

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar o aplicativo:**
   ```bash
   npm start
   ```

3. **Acessar o aplicativo:**
   - Escaneie o QR code com o Expo Go (Android/iOS)
   - Ou abra no navegador: http://localhost:8081
   - Ou pressione 'a' para Android ou 'i' para iOS (se tiver emulador)

## Como Funciona

1. **Digite o CEP:** Insira um CEP válido no campo de texto (a máscara será aplicada automaticamente)
2. **Consultar:** Clique no botão "Consultar CEP"
3. **Aguarde:** Um indicador de carregamento será exibido durante a requisição
4. **Veja o resultado:** As informações do endereço serão exibidas em um cartão formatado

## Exemplo de Uso

- **CEP válido:** 01310-100 (Av. Paulista, São Paulo - SP)
- **CEP inválido:** 00000-000 (retornará mensagem de erro)

## API Utilizada

O aplicativo utiliza a **API ViaCEP** que é gratuita e não requer autenticação:
- **URL:** https://viacep.com.br/ws/{cep}/json/
- **Método:** GET
- **Formato de resposta:** JSON

### Exemplo de resposta da API:
```json
{
  "cep": "01310-100",
  "logradouro": "Avenida Paulista",
  "complemento": "",
  "bairro": "Bela Vista",
  "localidade": "São Paulo",
  "uf": "SP",
  "ddd": "11"
}
```

## Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma para desenvolvimento React Native
- **JavaScript (ES6+)** - Linguagem de programação
- **API ViaCEP** - Serviço de consulta de CEP

## Componentes e Funções

### ConsultaCEP.js
- Componente principal com toda a lógica de consulta
- Estados para CEP, endereço, loading e erro
- Função `consultarCEP()` para fazer a requisição
- Interface completa com formulário e exibição de resultados

### mascaras.js
- `aplicarMascaraCEP()` - Aplica máscara XXXXX-XXX
- `removerMascaraCEP()` - Remove a máscara para envio à API

### validacoes.js  
- `validarCEPSimples()` - Valida se o CEP tem 8 dígitos

### styles.js
- Estilos completos para todos os elementos da interface
- Design responsivo e acessível
- Cores e espaçamentos consistentes

## Melhorias Futuras

- Adicionar histórico de consultas
- Implementar busca por endereço
- Adicionar geolocalização
- Melhorar acessibilidade
- Adicionar testes automatizados