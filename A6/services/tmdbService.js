// Serviço para comunicação com a API do TMDB
import { TMDB_CONFIG } from "../config/tmdb";

/**
 * Busca filmes por nome
 * @param {string} query - Termo de busca
 * @param {number} page - Número da página (para paginação)
 * @returns {Promise} - Promessa com os resultados da busca
 */
export const searchMovies = async (query, page = 1) => {
  try {
    const url = `${TMDB_CONFIG.BASE_URL}/search/movie?api_key=${
      TMDB_CONFIG.API_KEY
    }&language=${TMDB_CONFIG.LANGUAGE}&query=${encodeURIComponent(
      query
    )}&page=${page}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    throw error;
  }
};

/**
 * Busca detalhes de um filme específico
 * @param {number} movieId - ID do filme
 * @returns {Promise} - Promessa com os detalhes do filme
 */
export const getMovieDetails = async (movieId) => {
  try {
    const url = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}&language=${TMDB_CONFIG.LANGUAGE}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do filme:", error);
    throw error;
  }
};

/**
 * Busca créditos (elenco e equipe) de um filme
 * @param {number} movieId - ID do filme
 * @returns {Promise} - Promessa com os créditos do filme
 */
export const getMovieCredits = async (movieId) => {
  try {
    const url = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}/credits?api_key=${TMDB_CONFIG.API_KEY}&language=${TMDB_CONFIG.LANGUAGE}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar créditos do filme:", error);
    throw error;
  }
};

/**
 * Constrói URL completa para imagem
 * @param {string} path - Caminho da imagem retornado pela API
 * @param {string} size - Tamanho desejado da imagem
 * @returns {string} - URL completa da imagem
 */
export const getImageUrl = (path, size = TMDB_CONFIG.POSTER_SIZE) => {
  if (!path) return null;
  return `${TMDB_CONFIG.IMAGE_BASE_URL}/${size}${path}`;
};

/**
 * Busca filmes populares
 * @param {number} page - Número da página
 * @returns {Promise} - Promessa com os filmes populares
 */
export const getPopularMovies = async (page = 1) => {
  try {
    const url = `${TMDB_CONFIG.BASE_URL}/movie/popular?api_key=${TMDB_CONFIG.API_KEY}&language=${TMDB_CONFIG.LANGUAGE}&page=${page}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar filmes populares:", error);
    throw error;
  }
};
