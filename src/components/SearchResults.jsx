import React, { useEffect, useState } from "react";
import { 
  View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import RNPickerSelect from "react-native-picker-select";

const SearchResults = ({ route }) => {
  const navigation = useNavigation();
  const [tailors, setTailors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedService, setSelectedService] = useState("");

  // Extract parameters from route
  const { name = "", location = "", service = "" } = route.params || {};

  // Location and Service Options
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
          `http://146.235.231.5:3000/tailor-management/search?name=${name}&location=${selectedLocation || location}&service=${selectedService || service}`
        );
        const data = await response.json();
        setTailors(data)
        // setTailors([
        //   {
        //     tailorId: 1,
        //     fullName: "James Tailor",
        //     location: "New York, USA",
        //     image: "https://images.pexels.com/photos/3738088/pexels-photo-3738088.jpeg?auto=compress&cs=tinysrgb&w=600",
        //   },
        //   {
        //     tailorId: 2,
        //     fullName: "Sophie Johnson",
        //     location: "London, UK",
        //     image: "https://images.pexels.com/photos/4621904/pexels-photo-4621904.jpeg?auto=compress&cs=tinysrgb&w=600",
        //   },
        //   {
        //     tailorId: 3,
        //     fullName: "Rahul Singh",
        //     location: "Mumbai, India",
        //     image: "https://images.pexels.com/photos/4621904/pexels-photo-4621904.jpeg?auto=compress&cs=tinysrgb&w=600",
        //   },
        //   {
        //     tailorId: 4,
        //     fullName: "Emily Brown",
        //     location: "Sydney, Australia",
        //     image: "https://images.pexels.com/photos/4621904/pexels-photo-4621904.jpeg?auto=compress&cs=tinysrgb&w=600",
        //   },
        // ]);
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
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={26} color="black" />
      </TouchableOpacity>

      {/* Filters */}
      <View style={styles.filterContainer}>
        <View style={styles.dropdownWrapper}>
          <Text style={styles.label}>Location</Text>
          <RNPickerSelect
            placeholder={{ label: "Select Location", value: null }}
            items={locationOptions}
            onValueChange={(value) => setSelectedLocation(value)}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            Icon={() => <Icon name="chevron-down" size={20} color="gray" style={styles.icon} />}
          />
        </View>

        <View style={styles.dropdownWrapper}>
          <Text style={styles.label}>Service</Text>
          <RNPickerSelect
            placeholder={{ label: "Select Service", value: null }}
            items={serviceOptions}
            onValueChange={(value) => setSelectedService(value)}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            Icon={() => <Icon name="chevron-down" size={20} color="gray" style={styles.icon} />}
          />
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#6200ee" style={styles.loader} />
      ) : tailors.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No tailors found</Text>
        </View>
      ) : (
        <FlatList
          data={tailors}
          keyExtractor={(item) => item.tailorId.toString()}
          contentContainerStyle={styles.flatListContainer}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />

              <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.fullName}</Text>
                <Text style={styles.location}>{item.location}</Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("TailorProfile", { id: item.tailorId })}
              >
                <Text style={styles.buttonText}>View Profile</Text>
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
      paddingHorizontal: 16,
      backgroundColor: "#F9FAFC",
    },
    backButton: {
      position: "absolute",
      top: 20,
      left: 16,
      padding: 8,
      zIndex: 10,
    },
    filterContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 70,
      marginBottom: 16, // ⬅ Increased spacing for separation
      paddingVertical: 12, // ⬅ Added padding to filters section
      backgroundColor: "#fff",
      borderRadius: 10,
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 3,
      paddingHorizontal: 14,
    },
    dropdownWrapper: {
      width: "48%",
    },
    label: {
      fontSize: 15,
      fontWeight: "600",
      marginBottom: 6,
      color: "#333",
    },
    icon: {
      position: "absolute",
      right: 10,
      top: "50%",
      transform: [{ translateY: 12 }],
    },
    pickerContainer: {
      backgroundColor: "#F0F0F0", // ⬅ Better background color
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 10,
      justifyContent: "center",
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
      fontSize: 18,
      fontWeight: "600",
      color: "#777",
    },
    flatListContainer: {
      paddingBottom: 20,
    },
    card: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "white",
      padding: 14,
      borderRadius: 16,
      marginBottom: 12,
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 10,
      elevation: 4,
      width: "100%",
      gap: 14,
    },
    image: {
      width: 55,
      height: 55,
      borderRadius: 50,
      borderWidth: 1.5,
      borderColor: "#ddd",
    },
    infoContainer: {
      flex: 1,
      gap: 2,
    },
    name: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#222",
    },
    location: {
      color: "#666",
      fontSize: 13,
    },
    button: {
      backgroundColor: "#007AFF",
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 10,
      shadowColor: "#007AFF",
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 2,
    },
    buttonText: {
      color: "white",
      fontSize: 13,
      fontWeight: "600",
    },
  });
  
  const pickerSelectStyles = {
    inputIOS: { 
      backgroundColor: "#F0F0F0", // ⬅ Softer background
      padding: 12, 
      borderRadius: 10,
      fontSize: 15,
    },
    inputAndroid: { 
      backgroundColor: "#F0F0F0", // ⬅ Matches iOS styling
      padding: 12, 
      borderRadius: 10,
      fontSize: 15,
    },
  };
  

export default SearchResults;
