import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const RecommendationComponent = () => {
  const [tailors, setTailors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Both");

  const navigation = useNavigation();
  const categories = ["Both", "Men's Wear", "Women's Wear"];

  useEffect(() => {
    const fetchTailors = async () => {
      try {
        const response = await fetch(`http://146.235.231.5:3000/tailor-management/search?service=${selectedCategory}`);
        const data = await response.json();
        setTailors(data);
      } catch (error) {
        console.error('Error fetching tailors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTailors();
  }, [selectedCategory]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Tailors Near You</Text>
        <View style={styles.underline} />
      </View>

      {/* Scrollable Categories */}
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.category, selectedCategory === item && styles.selectedCategory]}
            onPress={() => {
              setSelectedCategory(item);
              setLoading(true);
            }}
          >
            <Text style={[styles.categoryText, selectedCategory === item && styles.selectedCategoryText]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 5 }}
      />

      {/* No Tailors Found Message */}
      {!loading && tailors.length === 0 && (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No tailors found. Try Search bar.</Text>
        </View>
      )}

      {/* Tailors List */}
      <FlatList
        data={tailors}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* <Image source={{ uri: item.image }} style={styles.image} /> */}
            <View style={styles.cardContent}>
              <Text style={styles.serviceTitle}>{item.fullName}</Text>
              <Text style={styles.specialization}>{item.specialization}</Text>
              <View style={styles.locationRow}>
                <Text style={styles.location}>{item.location}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('TailorProfile', { tailor: item })}
                >
                  <Text style={styles.buttonText}>View Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 15 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  header: { paddingHorizontal: 10, marginBottom: 15 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#222' },
  underline: {
    width: 50,
    height: 3,
    backgroundColor: '#007AFF',
    marginTop: 5,
    borderRadius: 2,
  },

  category: {
    backgroundColor: '#F2F2F2',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  selectedCategory: { backgroundColor: '#6C63FF' },
  categoryText: { fontSize: 14, color: '#555' },
  selectedCategoryText: { color: '#fff', fontWeight: 'bold' },

  noDataContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 8,
    width: 280,
    overflow: 'hidden',
    elevation: 4,
    paddingBottom: 15,
  },
  image: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardContent: {
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },
  specialization: {
    fontSize: 14,
    color: '#4C6EF5',
    marginBottom: 10,
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  location: {
    fontSize: 13,
    color: '#777',
    flex: 1,
  },
  button: {
    backgroundColor: '#337AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default RecommendationComponent;
