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
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";
import Header from "./Header";

const ProfileDetails = ({ navigation, userData, setUserData, profileType, fields }) => {
  const [editMode, setEditMode] = useState(false);

  return (

    
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <Header navigation={navigation} name="Profile Data" />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Image & Name */}
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/3738101/pexels-photo-3738101.jpeg?auto=compress&cs=tinysrgb&w=600",
            }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{userData.fullName}</Text>
          <Text style={styles.role}>{userData.businessName || profileType}</Text>
        </View>

        {/* Profile Details */}
        <View style={styles.detailsContainer}>
          {fields.map(({ icon, field, label }) => (
            <View key={field} style={styles.inputContainer}>
              <MaterialIcons name={icon} size={22} color="#555" />
              {editMode ? (
                <TextInput
                  style={styles.input}
                  value={userData[field]}
                  onChangeText={(text) => setUserData({ ...userData, [field]: text })}
                  placeholder={label}
                  placeholderTextColor="#aaa"
                  multiline={field === "description"}
                />
              ) : (
                <Text style={styles.detailText}>{userData[field]}</Text>
              )}
            </View>
          ))}

          {/* Tailor-Specific Fields */}
          {profileType === "Tailor" && (
            <>
              <View style={styles.inputContainer}>
                <FontAwesome name="tags" size={18} color="#6c757d" />
                {editMode ? (
                  <Picker
                    selectedValue={userData.specialization}
                    style={styles.picker}
                    onValueChange={(value) =>
                      setUserData({ ...userData, specialization: value })
                    }
                  >
                    {["Men's Wear", "Women's Wear", "Both"].map((item) => (
                      <Picker.Item key={item} label={item} value={item} />
                    ))}
                  </Picker>
                ) : (
                  <Text style={styles.detailText}>{userData.specialization}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <FontAwesome name="clock-o" size={18} color="#6c757d" />
                {editMode ? (
                  <Picker
                    selectedValue={userData.experience}
                    style={styles.picker}
                    onValueChange={(value) =>
                      setUserData({ ...userData, experience: value })
                    }
                  >
                    {["1 Year", "2 Years", "3 Years", "4 Years", "5 Years", "5+ Years"].map(
                      (item) => (
                        <Picker.Item key={item} label={item} value={item} />
                      )
                    )}
                  </Picker>
                ) : (
                  <Text style={styles.detailText}>{userData.experience}</Text>
                )}
              </View>
            </>
          )}

          {/* Buttons */}
          <TouchableOpacity style={styles.editButton} onPress={() => setEditMode(!editMode)}>
            <Text style={styles.buttonText}>{editMode ? "Save Changes" : "Edit Profile"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F7FC",
  },
  container: {
    paddingBottom: 20,
  },
  profileContainer: {
    alignItems: "center",
    paddingVertical: 25,
    backgroundColor: "#FFF",
    borderRadius: 15,
    marginHorizontal: 15,
    marginVertical: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 10,
  },
  role: {
    fontSize: 15,
    color: "#666",
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    shadowOpacity: 0.1,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: "#333",
  },
  detailText: {
    fontSize: 15,
    marginLeft: 12,
    color: "#333",
  },
  picker: {
    flex: 1,
    marginLeft: 10,
    color: "#333",
  },
  editButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "500",
  },
});

export default ProfileDetails;
