import React, { useEffect, useState } from "react";
import {
  View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet, Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import RNPickerSelect from "react-native-picker-select";
import Header from "./Header";
import {API_BASE_URL} from "@env";

const SearchResults = ({ route }) => {
  const navigation = useNavigation();
  const [tailors, setTailors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedService, setSelectedService] = useState("");

  const { name = "", location = "", service = "" } = route.params || {};

  const locationOptions = [
    { label: "Delhi", value: "delhi" },
    { label: "Mumbai", value: "mumbai" },
    { label: "Indore", value: "indore" },
    { label: "Nashik", value: "nashik" },
  ];

  const serviceOptions = [
    { label: "Men's Wear", value: "mens" },
    { label: "Women's Wear", value: "womens" },
    { label: "Both", value: "both" },
  ];

  useEffect(() => {
    const fetchTailors = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/tailor-management/search?name=${name}&location=${selectedLocation || location}&service=${selectedService || service}`
        );
        const data = await response.json();
        setTailors(data);
      } catch (error) {
        console.error("Error fetching tailors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTailors();
  }, [selectedLocation, selectedService]);

  return (
    <View style={styles.container}>
      <Header
      navigation={navigation}
      name= "Search Results"
      />

      {/* Filters */}
      <View style={styles.filters}>
        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Location</Text>
          <RNPickerSelect
            placeholder={{ label: "Select Location", value: null }}
            items={locationOptions}
            onValueChange={(value) => {
              setSelectedLocation(value)
              setLoading(true)
            }}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            Icon={() => <Icon name="chevron-down" size={18} color="#555" />}
          />
        </View>

        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Service</Text>
          <RNPickerSelect
            placeholder={{ label: "Select Service", value: null }}
            items={serviceOptions}
            onValueChange={(value) => {
              setSelectedService(value)
              setLoading(true)
            }}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            Icon={() => <Icon name="chevron-down" size={18} color="#555" />}
          />
        </View>
      </View>

      {/* Results */}
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      ) : tailors.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No tailors found.</Text>
        </View>
      ) : (
        <FlatList
          data={tailors}
          keyExtractor={(item) => item.tailorId.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {/* <Image source={{ uri: item.image }} style={styles.image} /> */}
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.fullName}</Text>
                <Text style={styles.location}>{item.location}</Text>
              </View>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => navigation.navigate("TailorProfile", { id: item.tailorId })}
              >
                <Text style={styles.viewButtonText}>View Profile</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FE",
  },
  filters: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
    paddingHorizontal: 15,
  },
  dropdownContainer: {
    width: "48%",
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
    color: "#555",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 16,
    color: "#888",
    fontWeight: "500",
  },
  list: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 3,
    MarginHorizontal: 15,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 14,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 3,
  },
  location: {
    fontSize: 13,
    color: "#777",
  },
  viewButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 12,
    shadowColor: "#007AFF",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 2,
  },
  viewButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
});

const pickerSelectStyles = {
  inputIOS: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    fontSize: 13,
    paddingRight: 30,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#ccc",
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  inputAndroid: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    fontSize: 13,
    paddingRight: 30,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  iconContainer: {
    top: 18,
    right: 10,
  },
};

export default SearchResults;
