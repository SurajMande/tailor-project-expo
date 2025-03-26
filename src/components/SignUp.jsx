import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={{ uri: "https://images.pexels.com/photos/3738101/pexels-photo-3738101.jpeg?auto=compress&cs=tinysrgb&w=600" }}
        style={styles.background}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoiding}
        >
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
              <Text style={styles.title}>Sign Up</Text>

              {/* Account Type Selection */}
              <View style={styles.radioContainer}>
                <Text style={styles.radioTitle}>Select Account Type</Text>
                <RadioGroup
                  radioButtons={accountOptions}
                  onPress={(value) => setFormData({ ...formData, accountType: value })}
                  selectedId={formData.accountType}
                  layout="row"
                />
              </View>

              {/* Input Fields */}
              {[
                { placeholder: "Full Name", icon: "user", key: "fullName" },
                { placeholder: "Email", icon: "envelope", key: "email" },
                { placeholder: "Phone Number", icon: "phone", key: "phoneNumber", keyboardType: "phone-pad" },
              ].map(({ placeholder, icon, key, keyboardType }) => (
                <View style={styles.inputContainer} key={key}>
                  <Icon name={icon} size={18} color="#666" style={styles.icon} />
                  <TextInput
                    placeholder={placeholder}
                    placeholderTextColor="#999"
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
                      <Icon name={icon} size={18} color="#666" style={styles.icon} />
                      <TextInput
                        placeholder={placeholder}
                        placeholderTextColor="#999"
                        style={styles.input}
                        value={formData[key]}
                        onChangeText={(text) => setFormData({ ...formData, [key]: text })}
                      />
                    </View>
                  ))}

                  {/* Specialization Dropdown */}
                  <RNPickerSelect
                    onValueChange={(value) => setFormData({ ...formData, specialization: value })}
                    items={specializationOptions}
                    placeholder={{ label: "Select Specialization", value: null }}
                    style={pickerStyles}
                  />

                  {/* Experience Dropdown */}
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
                  <Icon name="lock" size={18} color="#666" style={styles.icon} />
                  <TextInput
                    placeholder={key === "password" ? "Password" : "Confirm Password"}
                    placeholderTextColor="#999"
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
                textStyle={{ color: "#444" }}
                containerStyle={styles.checkbox}
              />

              {/* Sign Up Button */}
              <TouchableOpacity style={styles.button}>
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
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  keyboardAvoiding: {
    flex: 1,
    width: "100%",
  },
  container: {
    justifyContent: "center",
    width: "90%",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 20,
    borderRadius: 15,
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 10,
    paddingHorizontal: 15,
    width: "100%",
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
  checkbox: {
    backgroundColor: "transparent",
    borderWidth: 0,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#7759F4",
    borderRadius: 10,
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  signInText: {
    marginTop: 15,
    color: "#666",
  },
  signInLink: {
    color: "#7759F4",
    fontWeight: "bold",
  },
});

const pickerStyles = {
  inputIOS: { color: "#333" },
  inputAndroid: { color: "#333" },
};
