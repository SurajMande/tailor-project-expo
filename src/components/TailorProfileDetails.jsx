import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProfileDetails from "./ProfileDetails";
import Toast from "react-native-toast-message";
import ToastMessage from "./ToastMessage";
import { fetchProtectedData } from "../services/authService";
import { getUserData } from "../services/storageService";

const TailorProfileDetails = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fields = [
    { icon: "person", field: "fullName", label: "Full Name" },
    { icon: "email", field: "email", label: "Email" },
    { icon: "phone", field: "phoneNumber", label: "Phone Number" },
    { icon: "location-on", field: "location", label: "Location" },
    { icon: "description", field: "description", label: "Description" },
  ];
  const getDetails = async ()=>{
    try{
    const data = await fetchProtectedData();
    setUserData(data);
    const user = await getUserData();
    const id = user.id;
    } catch (error) {
          console.error("Failed to fetch profile data:", error);
        } finally {
          setLoading(false);
        }
  }
  useEffect(() => {
    // const fetchProfile = async () => {
    //   try {
    //     // Replace this with your actual API endpoint
    //     const response = await fetch(`http://192.168.152.176:3000/tailor-management/profile/${id}`);
    //     const data = await response.json();
    //     setUserData(data);
    //   } catch (error) {
    //     console.error("Failed to fetch profile data:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchProfile();
    getDetails();
  }, []);

  
  const handleSave = async (updatedData) => {
    try {
      const response = await fetch(`http://146.235.231.5:3000/tailor-management/update-profile/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
  
      const result = await response.json();
      console.log("Save success:", result);
  
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
        text2: "Something went wrong while saving.",
      });
    }
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
      </View>
    );
  }

  return (
    <>
    <ProfileDetails
      navigation={navigation}
      userData={userData}
      setUserData={setUserData}
      profileType="Tailor"
      fields={fields}
      handleSave={handleSave}
    />
    <Toast
            position="top"
            visibilityTime={2000}
            autoHide
            topOffset={200} // Adjust to move toast lower (200px from top)
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

export default TailorProfileDetails;
