import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const RecommendationComponent = () => {
  // Static JSON data
  const recommendations = [
    {
      title: 'Roof Flashing Repair',
      price: 500,
      description: 'Chimneys, and skylights',
      duration: '2 - 4 hours',
      image: 'https://images.pexels.com/photos/4452379/pexels-photo-4452379.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      title: 'Leak Repair',
      price: 350,
      description: 'Fixing minor leaks',
      duration: '1 - 3 hours',
      image: 'https://images.pexels.com/photos/4452388/pexels-photo-4452388.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      title: 'Waterproofing',
      price: 700,
      description: 'Full home waterproofing',
      duration: '4 - 6 hours',
      image: 'https://images.pexels.com/photos/26150470/pexels-photo-26150470/free-photo-of-brunette-man-posing-wearing-black-suit-jacket-and-white-shirt-with-arms-crossed.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Most Popular Services</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Categories */}
      <FlatList
        data={['Full Roof Inspection', 'Leak Repairs', 'Waterproofing']}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.category}>
            <Text style={styles.categoryText}>{item}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 5 }} // Added spacing
      />

      {/* Services List */}
      <FlatList
        data={recommendations}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.serviceTitle}>{item.title}</Text>
              <Text style={styles.price}>${item.price}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.time}>{item.duration}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 10 }} // Added spacing
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  seeAll: {
    fontSize: 14,
    color: '#007AFF',
  },
  category: {
    backgroundColor: '#F2F2F2',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  categoryText: {
    fontSize: 14,
    color: '#555',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 12,
    width: 280,
    overflow: 'hidden',
    elevation: 4,
    paddingBottom: 10,
  },
  image: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardContent: {
    padding: 12,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
    marginVertical: 6,
  },
  description: {
    fontSize: 13,
    color: '#555',
  },
  time: {
    fontSize: 12,
    color: '#777',
    marginTop: 6,
  },
});

export default RecommendationComponent;
