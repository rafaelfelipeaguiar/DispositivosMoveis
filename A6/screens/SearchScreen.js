// Tela de busca de filmes
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { searchMovies, getPopularMovies } from "../services/tmdbService";
import MovieCard from "../components/MovieCard";

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Carrega filmes populares ao iniciar
  useEffect(() => {
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPopularMovies(1);
      setMovies(data.results);
      setHasMore(data.page < data.total_pages);
    } catch (err) {
      setError("Erro ao carregar filmes populares. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query = searchQuery) => {
    if (!query.trim()) {
      loadPopularMovies();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setPage(1);
      const data = await searchMovies(query, 1);

      if (data.results.length === 0) {
        setError("Nenhum filme encontrado. Tente outra busca.");
        setMovies([]);
      } else {
        setMovies(data.results);
        setHasMore(data.page < data.total_pages);
      }
    } catch (err) {
      setError(
        "Erro ao buscar filmes. Verifique sua conexão e tente novamente."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreMovies = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const nextPage = page + 1;
      const data = searchQuery.trim()
        ? await searchMovies(searchQuery, nextPage)
        : await getPopularMovies(nextPage);

      setMovies([...movies, ...data.results]);
      setPage(nextPage);
      setHasMore(data.page < data.total_pages);
    } catch (err) {
      console.error("Erro ao carregar mais filmes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMoviePress = (movie) => {
    navigation.navigate("MovieDetails", { movieId: movie.id });
  };

  const renderMovieItem = ({ item }) => (
    <MovieCard movie={item} onPress={handleMoviePress} />
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#e50914" />
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) return null;

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {error || "Busque por filmes ou veja os populares!"}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🎬 Busca de Filmes</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Digite o nome do filme..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => handleSearch()}
            returnKeyType="search"
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => handleSearch()}
          >
            <Text style={styles.searchButtonText}>Buscar</Text>
          </TouchableOpacity>
        </View>

        {searchQuery.trim() && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              setSearchQuery("");
              loadPopularMovies();
            }}
          >
            <Text style={styles.clearButtonText}>Limpar e ver populares</Text>
          </TouchableOpacity>
        )}
      </View>

      {loading && movies.length === 0 ? (
        <View style={styles.centerLoader}>
          <ActivityIndicator size="large" color="#e50914" />
          <Text style={styles.loadingText}>Carregando filmes...</Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
          onEndReached={loadMoreMovies}
          onEndReachedThreshold={0.5}
        />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    height: 45,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: "#e50914",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  clearButton: {
    marginTop: 12,
    alignSelf: "center",
  },
  clearButtonText: {
    color: "#e50914",
    fontSize: 14,
  },
  listContent: {
    paddingVertical: 8,
    flexGrow: 1,
  },
  centerLoader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

export default SearchScreen;
