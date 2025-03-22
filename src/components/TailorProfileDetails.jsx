import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FaEnvelope, FaPhone, FaTwitter, FaBehance, FaFacebook, FaLock } from "react-native-vector-icons/FontAwesome";

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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }} style={styles.profileImage} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.role}>{user.role}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <FaEnvelope name="envelope" size={20} color="black" />
          {editMode ? (
            <TextInput
              style={styles.input}
              value={user.email}
              onChangeText={(text) => setUser({ ...user, email: text })}
            />
          ) : (
            <Text style={styles.detailText}>{user.email}</Text>
          )}
        </View>

        <View style={styles.detailRow}>
          <FaPhone name="phone" size={20} color="black" />
          {editMode ? (
            <TextInput
              style={styles.input}
              value={user.phone}
              onChangeText={(text) => setUser({ ...user, phone: text })}
            />
          ) : (
            <Text style={styles.detailText}>{user.phone}</Text>
          )}
        </View>

        <View style={styles.detailRow}>
          <FaTwitter name="twitter" size={20} color="black" />
          <Text style={styles.detailText}>{user.twitter}</Text>
        </View>

        <View style={styles.detailRow}>
          <FaBehance name="behance" size={20} color="black" />
          <Text style={styles.detailText}>{user.behance}</Text>
        </View>

        <View style={styles.detailRow}>
          <FaFacebook name="facebook" size={20} color="black" />
          <Text style={styles.detailText}>{user.facebook}</Text>
        </View>

        <TouchableOpacity style={styles.editButton} onPress={handleEditToggle}>
          <Text style={styles.buttonText}>{editMode ? "Save" : "Edit Profile"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.passwordButton}
          onPress={() => navigation.navigate("ChangePasswordScreen")}
        >
          <FaLock name="lock" size={18} color="white" />
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default TailorProfileDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    backgroundColor: "#1E90FF",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
  role: {
    fontSize: 16,
    color: "white",
  },
  detailsContainer: {
    padding: 20,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderColor: "gray",
    fontSize: 16,
  },
  detailText: {
    fontSize: 16,
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: "#1E90FF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  passwordButton: {
    flexDirection: "row",
    backgroundColor: "#FF5733",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    marginLeft: 5,
  },
});
