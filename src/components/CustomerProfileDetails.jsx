import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProfileDetails from "./ProfileDetails";
import Toast from "react-native-toast-message";
import ToastMessage from "./ToastMessage";
import { fetchProtectedData } from "../services/authService";
import { getUserData } from "../services/storageService";
import { API_BASE_URL } from "@env"; // Import API base URL from config

// Use environment variables for API base URL
const API_BASE_URL = process.env.API_BASE_URL || "http://192.168.168.176:3000";

const CustomerProfileDetails = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null); // Store user ID in state

  const fields = [
    { icon: "person", field: "fullName", label: "Full Name" },
    { icon: "email", field: "email", label: "Email" },
    { icon: "phone", field: "phoneNumber", label: "Phone Number" },
  ];

  const getDetails = async () => {
    try {
      const data = await fetchProtectedData();
      setUserData(data);
      const user = await getUserData();
      setUserId(user.id); // Store ID for use in handleSave
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to load profile data. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  const handleSave = async (updatedData) => {
    if (!userId) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "User ID not found. Please try again.",
      });
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/customer-management/update-profile/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const result = await response.json();
      setUserData(result); // Update local state with new data
      Toast.show({
        type: "success",
        text1: "Profile Updated",
        text2: "Your changes have been saved.",
      });
    } catch (error) {
      console.error("Error saving profile:", error);
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: error.message || "Something went wrong while saving.",
      });
    }
  };

  const handleRetry = () => {
    setLoading(true);
    getDetails();
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Loading profile...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Failed to load profile data.</Text>
        <Text onPress={handleRetry} style={{ color: "#007bff", marginTop: 10 }}>
          Retry
        </Text>
      </View>
    );
  }

  return (
    <>
      <ProfileDetails
        navigation={navigation}
        userData={userData}
        setUserData={setUserData}
        profileType="Customer"
        fields={fields}
        handleSave={handleSave}
      />
      <Toast
        position="top"
        visibilityTime={2000}
        autoHide
        topOffset={50}
        config={{
          success: (props) => (
            <ToastMessage {...props} backgroundColor="#4CAF50" />
          ),
          error: (props) => (
            <ToastMessage {...props} backgroundColor="#D32F2F" />
          ),
        }}
      />
    </>
  );
};

export default CustomerProfileDetails;