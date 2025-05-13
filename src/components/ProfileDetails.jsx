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
  ActivityIndicator,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";
import { launchImageLibrary } from "react-native-image-picker";
import axios from "axios";  // Import axios for API calls
import Header from "./Header";

const ProfileDetails = ({ navigation, userData, setUserData, profileType, fields, handleSave }) => {
  const [editMode, setEditMode] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Function to pick image
  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,  // Set to true for base64 image data
    });

    if (result.didCancel) {
      console.log('User canceled image picker');
      return;
    }

    if (result.assets && result.assets[0].uri) {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("image", {
          uri: result.assets[0].uri,
          name: `profile_${userData.id}.jpg`,
          type: 'image/jpeg',
        });

        // Make API call to Imgur
        const response = await axios.post(
          "https://api.imgur.com/3/image",
          formData,
          {
            headers: {
              Authorization: `2d777b13fcad397`, // Replace with your Imgur Client ID
            },
          }
        );

        // Get the image URL from the response
        const imageUrl = response.data.data.link;

        setUserData({ ...userData, profileImage: imageUrl });
      } catch (error) {
        console.error("Image upload error:", error);
        alert("Failed to upload image");
      } finally {
        setUploading(false);
      }
    }
  };

  const toggleEditMode = () => {
    if (editMode && handleSave) {
      handleSave(userData); // Call the save API with updated data including image URL
    }
    setEditMode(!editMode);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header navigation={navigation} name="Profile Data" />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileContainer}>
          {userData.profileImage ? (
            <Image
              source={{ uri: userData.profileImage }}
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.noImageContainer}>
              <Text style={styles.noImageText}>No Image Added</Text>
            </View>
          )}

          {editMode && (
            <TouchableOpacity 
              style={styles.uploadButton} 
              onPress={pickImage}
              disabled={uploading}
            >
              {uploading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.uploadButtonText}>Upload Image</Text>
              )}
            </TouchableOpacity>
          )}

          <Text style={styles.name}>{userData.fullName}</Text>
          <Text style={styles.role}>{userData.businessName || profileType}</Text>
        </View>

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

          <TouchableOpacity style={styles.editButton} onPress={toggleEditMode}>
            <Text style={styles.buttonText}>{editMode ? "Save Changes" : "Edit Profile"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
  noImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    color: "#666",
    fontSize: 14,
  },
  uploadButton: {
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 8,
    marginTop: 10,
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 14,
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
