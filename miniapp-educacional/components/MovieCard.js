// Componente para exibir um card de filme na lista
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { getImageUrl } from "../services/tmdbService";

const MovieCard = ({ movie, onPress }) => {
  const posterUrl = getImageUrl(movie.poster_path);
  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "N/A";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(movie)}
      activeOpacity={0.7}
    >
      <View style={styles.posterContainer}>
        {posterUrl ? (
          <Image
            source={{ uri: posterUrl }}
            style={styles.poster}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.noPoster}>
            <Text style={styles.noPosterText}>Sem Imagem</Text>
          </View>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>

        <View style={styles.metaContainer}>
          <Text style={styles.year}>{releaseYear}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.star}>⭐</Text>
            <Text style={styles.rating}>{rating}</Text>
          </View>
        </View>

        <Text style={styles.overview} numberOfLines={3}>
          {movie.overview || "Sem sinopse disponível."}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  posterContainer: {
    width: 100,
    height: 150,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#e0e0e0",
  },
  poster: {
    width: "100%",
    height: "100%",
  },
  noPoster: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  noPosterText: {
    color: "#999",
    fontSize: 12,
    textAlign: "center",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  year: {
    fontSize: 14,
    color: "#666",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    fontSize: 14,
    marginRight: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  overview: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
});

export default MovieCard;
