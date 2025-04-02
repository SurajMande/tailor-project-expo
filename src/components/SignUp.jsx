import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import RNPickerSelect from "react-native-picker-select";
import { CheckBox } from "react-native-elements";
import RadioGroup from "react-native-radio-buttons-group";
import Toast from "react-native-toast-message";
import ToastMessage from "./ToastMessage";

const SignUp = ({ navigation }) => {
  const [formData, setFormData] = useState({
    accountType: "Tailor",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    businessName: "",
    location: "",
    specialization: "",
    experience: "",
    termsAccepted: false,
  });

  const specializationOptions = [
    { label: "Men's Wear", value: "Men's Wear" },
    { label: "Women's Wear", value: "Women's Wear" },
    { label: "Both", value: "Both" },
  ];

  const experienceOptions = [
    { label: "1 Year", value: "1 Year" },
    { label: "2 Years", value: "2 Years" },
    { label: "3 Years", value: "3 Years" },
    { label: "4 Years", value: "4 Years" },
    { label: "5 Years", value: "5 Years" },
    { label: "5+ Years", value: "5+ Years" },
  ];

  const accountOptions = [
    { id: "Tailor", label: "Tailor", value: "Tailor" },
    { id: "Customer", label: "Customer", value: "Customer" },
  ];

  const handleSignUp = async () => {
    // Check if any field is empty
    

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Password Mismatch",
        text2: "Passwords do not match.",
      });
      return;
    }

    const filteredFormData = {
      accountType: formData.accountType,
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      phoneNumber: formData.phoneNumber,
      termsAccepted: formData.termsAccepted,
      // Include tailor-specific fields only if the account type is 'Tailor'
      ...(formData.accountType === "Tailor" && {
        businessName: formData.businessName,
        location: formData.location,
        specialization: formData.specialization,
        experience: formData.experience,
      }),
    };

    for (let key in filteredFormData) {
      if (!filteredFormData[key]) {
        Toast.show({
          type: "error",
          text1: "Missing Fields",
          text2: "All fields are required.",
        });
        return;
      }
    }

    try {
      const url = filteredFormData.accountType === "Tailor"
        ? 'http://146.235.231.5:3000/auth/signup/tailor'
        : 'http://146.235.231.5:3000/auth/signup/customer';
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(filteredFormData)
      });


      const data = await response.json();

      if (response.ok) {
        Toast.show({
          type: "success",
          text1: "Sign Up Successful",
          text2: "Welcome to the platform!",
        });

        // Navigate to login screen after success
        setTimeout(() => {
          navigation.navigate("Login");
        }, 1500);
      } else {
        Toast.show({
          type: "error",
          text1: "Sign Up Failed",
          text2: data.message || "Please try again later.",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Network Error",
        text2: "Check your internet connection.",
      });
    }
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoiding}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Skip Button */}
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => navigation.navigate("MainTabs")}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          <View style={styles.card}>
            <Text style={styles.title}>Create an Account</Text>
            <View style={styles.underline} />


            {/* Account Type Selection */}
            <View style={styles.radioContainer}>
              <Text style={styles.radioTitle}>Account Type</Text>
              <RadioGroup
                radioButtons={accountOptions}
                onPress={(value) => setFormData({ ...formData, accountType: value })}
                selectedId={formData.accountType}
                layout="row"
                containerStyle={styles.radioGroup}
              />
            </View>

            {/* Input Fields */}
            {[
              { placeholder: "Full Name", icon: "user", key: "fullName" },
              { placeholder: "Email", icon: "envelope", key: "email" },
              { placeholder: "Phone Number", icon: "phone", key: "phoneNumber", keyboardType: "phone-pad" },
            ].map(({ placeholder, icon, key, keyboardType }) => (
              <View style={styles.inputContainer} key={key}>
                <Icon name={icon} size={18} color="#888" style={styles.icon} />
                <TextInput
                  placeholder={placeholder}
                  placeholderTextColor="gray"
                  style={styles.input}
                  value={formData[key]}
                  onChangeText={(text) => setFormData({ ...formData, [key]: text })}
                  keyboardType={keyboardType || "default"}
                />
              </View>
            ))}

            {/* Tailor-Specific Fields */}
            {formData.accountType === "Tailor" && (
              <>
                {[
                  { placeholder: "Business Name", icon: "briefcase", key: "businessName" },
                  { placeholder: "Location", icon: "map-marker", key: "location" },
                ].map(({ placeholder, icon, key }) => (
                  <View style={styles.inputContainer} key={key}>
                    <Icon name={icon} size={18} color="#888" style={styles.icon} />
                    <TextInput
                      placeholder={placeholder}
                      placeholderTextColor="gray"
                      style={styles.input}
                      value={formData[key]}
                      onChangeText={(text) => setFormData({ ...formData, [key]: text })}
                    />
                  </View>
                ))}

                {/* Specialization & Experience Dropdowns */}
                <RNPickerSelect
                  onValueChange={(value) => setFormData({ ...formData, specialization: value })}
                  items={specializationOptions}
                  placeholder={{ label: "Select Specialization", value: null }}
                  style={pickerStyles}
                />
                <RNPickerSelect
                  onValueChange={(value) => setFormData({ ...formData, experience: value })}
                  items={experienceOptions}
                  placeholder={{ label: "Select Experience", value: null }}
                  style={pickerStyles}
                />
              </>
            )}

            {/* Password Fields */}
            {["password", "confirmPassword"].map((key) => (
              <View style={styles.inputContainer} key={key}>
                <Icon name="lock" size={18} color="#888" style={styles.icon} />
                <TextInput
                  placeholder={key === "password" ? "Password" : "Confirm Password"}
                  placeholderTextColor="gray"
                  secureTextEntry
                  style={styles.input}
                  value={formData[key]}
                  onChangeText={(text) => setFormData({ ...formData, [key]: text })}
                />
              </View>
            ))}

            {/* Terms & Conditions */}
            <CheckBox
              title="I accept the Terms & Conditions"
              checked={formData.termsAccepted}
              onPress={() => setFormData({ ...formData, termsAccepted: !formData.termsAccepted })}
              checkedColor="#7759F4"
              uncheckedColor="#bbb"
              textStyle={styles.checkboxText}
              containerStyle={styles.checkboxContainer}
            />


            {/* Sign Up Button */}
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>


            {/* Navigate to Login */}
            <Text style={styles.signInText}>
              Already have an account?{" "}
              <Text style={styles.signInLink} onPress={() => navigation.navigate("Login")}>
                Log In
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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

    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  underline: {
    width: 100,
    height: 3,
    backgroundColor: '#007AFF',
    borderRadius: 2,
    alignSelf: 'center',
    transform: [{ translateY: -10 }],
  },
  keyboardAvoiding: {
    flex: 1,
    width: "100%",
  },
  container: {
    paddingHorizontal: 15,
    paddingBottom: 40,
    paddingTop: 20,
  },
  skipButton: {
    alignSelf: "flex-end",
    backgroundColor: "#7759F4",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginVertical: 10,
  },
  skipText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  card: {
    padding: 15,
    borderRadius: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
    paddingHorizontal: 20,
    width: "90%",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 50,
    color: "#333",
  },
  icon: {
    marginRight: 10,
  },
  radioContainer: {
    width: "100%",
    marginVertical: 15,
    alignItems: "center",
  },
  radioTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 10,
    fontWeight: "bold",
    paddingHorizontal: 15,
  },
  button: {
    width: "95%",
    backgroundColor: "#7759F4",
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  signInText: {
    marginTop: 15,
    fontSize: 15,
    alignSelf: 'center',
    fontWeight: 'semibold'
  },

  signInLink: {
    color: "#7759F4",
    fontWeight: "bold",
    textDecorationLine: 'underline'
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderColor: 'white',
  },
  checkboxText: {
    fontSize: 14,
    color: "#555",
    marginLeft: 8,
  },
});

const pickerStyles = {
  inputIOS: {
    color: "#333",
    backgroundColor: "black",

  },
  inputAndroid: {
    color: "#333",
    backgroundColor: "#F5F5F5",
    borderRadius: 14,
    marginBottom: 15,
    width: "90%",

  },
};