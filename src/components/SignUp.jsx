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
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={{
          uri: encodeURI(
            "https://images.pexels.com/photos/3738101/pexels-photo-3738101.jpeg?auto=compress&cs=tinysrgb&w=600"
          ),
        }}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Create Account</Text>

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
              <TextInput
                placeholder={placeholder}
                placeholderTextColor="#ccc"
                style={styles.input}
                value={formData[key]}
                onChangeText={(text) => setFormData({ ...formData, [key]: text })}
                keyboardType={keyboardType || "default"}
              />
              <Icon name={icon} size={20} color="white" style={styles.icon} />
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
                  <TextInput
                    placeholder={placeholder}
                    placeholderTextColor="#ccc"
                    style={styles.input}
                    value={formData[key]}
                    onChangeText={(text) => setFormData({ ...formData, [key]: text })}
                  />
                  <Icon name={icon} size={20} color="white" style={styles.icon} />
                </View>
              ))}

              {/* Specialization Dropdown */}
              <View style={styles.dropdownContainer}>
                <RNPickerSelect
                  onValueChange={(value) => setFormData({ ...formData, specialization: value })}
                  items={specializationOptions}
                  placeholder={{ label: "Select Specialization", value: null, color: "#ccc" }}
                  style={pickerStyles}
                  textInputProps={{ style: { color: "white" } }}
                />
              </View>

              {/* Experience Dropdown */}
              <View style={styles.dropdownContainer}>
                <RNPickerSelect
                  onValueChange={(value) => setFormData({ ...formData, experience: value })}
                  items={experienceOptions}
                  placeholder={{ label: "Select Experience", value: null, color: "#ccc" }}
                  style={pickerStyles}
                  textInputProps={{ style: { color: "white" } }}
                />
              </View>
            </>
          )}

          {/* Password Fields */}
          {["password", "confirmPassword"].map((key) => (
            <View style={styles.inputContainer} key={key}>
              <TextInput
                placeholder={key === "password" ? "Password" : "Confirm Password"}
                placeholderTextColor="#ccc"
                secureTextEntry
                style={styles.input}
                value={formData[key]}
                onChangeText={(text) => setFormData({ ...formData, [key]: text })}
              />
              <Icon name="lock" size={20} color="white" style={styles.icon} />
            </View>
          ))}

          {/* Terms & Conditions */}
          <CheckBox
            title="I accept the Terms & Conditions"
            checked={formData.termsAccepted}
            onPress={() => setFormData({ ...formData, termsAccepted: !formData.termsAccepted })}
            checkedColor="white"
            textStyle={{ color: "white" }}
            containerStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
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
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    width: "85%",
    alignItems: "center",
    paddingVertical: 30,
    paddingLeft: 20,
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  radioContainer: {
    marginBottom: 15,
    alignItems: "center",
  },
  radioTitle: {
    color: "white",
    fontSize: 16,
    marginBottom: 10,
  },
  dropdownContainer: {
    backgroundColor: "#444",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 30,
    paddingHorizontal: 15,
    width: "100%",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    color: "white",
    height: 50,
  },
  icon: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#7759F4",
    borderRadius: 30,
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
    shadowOpacity: 0.3,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

const pickerStyles = {
  inputIOS: { color: "white", padding: 10 },
  inputAndroid: { color: "white", padding: 10 },
};
