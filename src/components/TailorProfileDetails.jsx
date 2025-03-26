import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const TailorProfileDetails = () => {
  const navigation = useNavigation();
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({
    name: "James Martin",
    role: "Senior Tailor & Designer",
    email: "james012@gmail.com",
    phone: "1234567891",
    twitter: "@james012",
    behance: "www.behance.net/james012",
    facebook: "www.facebook.com/james012",
  });

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <SafeAreaView style={styles.container}>
        {/* Header with Back Button & Title */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <FontAwesome name="arrow-left" size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile Data</Text>
        </View>

        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/3738101/pexels-photo-3738101.jpeg?auto=compress&cs=tinysrgb&w=600",
            }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.role}>{user.role}</Text>
        </View>

        {/* Profile Details Section */}
        <ScrollView style={styles.detailsContainer}>
          {[
            { icon: "envelope", field: "email", value: user.email },
            { icon: "phone", field: "phone", value: user.phone },
            { icon: "twitter", field: "twitter", value: user.twitter },
            { icon: "behance", field: "behance", value: user.behance },
            { icon: "facebook", field: "facebook", value: user.facebook },
          ].map(({ icon, field, value }) => (
            <View key={field} style={styles.card}>
              <FontAwesome name={icon} size={18} color="#6c757d" />
              {editMode ? (
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={(text) => setUser({ ...user, [field]: text })}
                />
              ) : (
                <Text style={styles.detailText}>{value}</Text>
              )}
            </View>
          ))}

          {/* Edit & Change Password Buttons */}
          <TouchableOpacity style={styles.editButton} onPress={handleEditToggle}>
            <Text style={styles.buttonText}>{editMode ? "Save Changes" : "Edit Profile"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.passwordButton}>
            <FontAwesome name="lock" size={16} color="black" />
            <Text style={[styles.buttonText, styles.blackText]}>Change Password</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  profileContainer: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#DDDDDD",
  },
  name: {
    fontSize: 22,
    fontWeight: "600",
    color: "#222",
    marginTop: 10,
  },
  role: {
    fontSize: 14,
    color: "#666",
  },
  detailsContainer: {
    padding: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderColor: "#BDBDBD",
    fontSize: 16,
    paddingVertical: 5,
    color: "#333",
  },
  detailText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
  editButton: {
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  passwordButton: {
    flexDirection: "row",
    backgroundColor: "#EAEAEA",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "500",
  },
  blackText: {
    color: "black",
    marginLeft: 8,
  },
});

export default TailorProfileDetails;
