// Tela de detalhes do filme
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  getMovieDetails,
  getMovieCredits,
  getImageUrl,
} from "../services/tmdbService";
import { TMDB_CONFIG } from "../config/tmdb";

const { width } = Dimensions.get("window");

const MovieDetailsScreen = ({ route, navigation }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMovieDetails();
  }, [movieId]);

  const loadMovieDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const [movieData, creditsData] = await Promise.all([
        getMovieDetails(movieId),
        getMovieCredits(movieId),
      ]);

      setMovie(movieData);
      setCredits(creditsData);
    } catch (err) {
      setError("Erro ao carregar detalhes do filme. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#e50914" />
        <Text style={styles.loadingText}>Carregando detalhes...</Text>
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error || "Filme não encontrado"}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadMovieDetails}>
          <Text style={styles.retryButtonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const backdropUrl = getImageUrl(
    movie.backdrop_path,
    TMDB_CONFIG.BACKDROP_SIZE
  );
  const posterUrl = getImageUrl(movie.poster_path);
  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "N/A";
  const runtime = movie.runtime ? `${movie.runtime} min` : "N/A";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
  const genres = movie.genres
    ? movie.genres.map((g) => g.name).join(", ")
    : "N/A";

  const director = credits?.crew?.find((person) => person.job === "Director");
  const mainCast = credits?.cast?.slice(0, 5) || [];

  return (
    <ScrollView style={styles.container}>
      {/* Backdrop */}
      {backdropUrl && (
        <Image
          source={{ uri: backdropUrl }}
          style={styles.backdrop}
          resizeMode="cover"
        />
      )}

      {/* Header com botão voltar */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        {/* Poster e informações principais */}
        <View style={styles.headerSection}>
          {posterUrl && (
            <Image
              source={{ uri: posterUrl }}
              style={styles.poster}
              resizeMode="cover"
            />
          )}

          <View style={styles.mainInfo}>
            <Text style={styles.title}>{movie.title}</Text>

            {movie.tagline && (
              <Text style={styles.tagline}>"{movie.tagline}"</Text>
            )}

            <View style={styles.metaRow}>
              <View style={styles.ratingBox}>
                <Text style={styles.ratingLabel}>⭐ Avaliação</Text>
                <Text style={styles.ratingValue}>{rating}/10</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Informações adicionais */}
        <View style={styles.infoGrid}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Ano</Text>
            <Text style={styles.infoValue}>{releaseYear}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Duração</Text>
            <Text style={styles.infoValue}>{runtime}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Votos</Text>
            <Text style={styles.infoValue}>{movie.vote_count}</Text>
          </View>
        </View>

        {/* Gêneros */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gêneros</Text>
          <Text style={styles.genresText}>{genres}</Text>
        </View>

        {/* Sinopse */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sinopse</Text>
          <Text style={styles.overview}>
            {movie.overview || "Sinopse não disponível."}
          </Text>
        </View>

        {/* Diretor */}
        {director && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Direção</Text>
            <Text style={styles.directorText}>{director.name}</Text>
          </View>
        )}

        {/* Elenco principal */}
        {mainCast.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Elenco Principal</Text>
            {mainCast.map((actor) => (
              <View key={actor.id} style={styles.castItem}>
                <Text style={styles.actorName}>{actor.name}</Text>
                <Text style={styles.characterName}>como {actor.character}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Informações extras */}
        {movie.budget > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Orçamento</Text>
            <Text style={styles.budgetText}>
              ${movie.budget.toLocaleString("pt-BR")}
            </Text>
          </View>
        )}

        {movie.revenue > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Receita</Text>
            <Text style={styles.revenueText}>
              ${movie.revenue.toLocaleString("pt-BR")}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    color: "#e50914",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#e50914",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  backdrop: {
    width: width,
    height: 220,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 16,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    zIndex: 10,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  contentContainer: {
    padding: 16,
  },
  headerSection: {
    flexDirection: "row",
    marginBottom: 20,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
  },
  mainInfo: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#666",
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: "row",
    marginTop: 8,
  },
  ratingBox: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
  },
  ratingLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  ratingValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  infoGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
  },
  infoBox: {
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  genresText: {
    fontSize: 15,
    color: "#666",
  },
  overview: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
  },
  directorText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  castItem: {
    marginBottom: 8,
  },
  actorName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  characterName: {
    fontSize: 14,
    color: "#666",
  },
  budgetText: {
    fontSize: 16,
    color: "#28a745",
    fontWeight: "600",
  },
  revenueText: {
    fontSize: 16,
    color: "#007bff",
    fontWeight: "600",
  },
});

export default MovieDetailsScreen;
