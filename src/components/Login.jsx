import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Toast from "react-native-toast-message";
import { login } from "../services/authService";

const Login = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      Toast.show({ type: "error", text1: "Error", text2: "All fields are required!" });
      return;
    }

    setLoading(true);
    const result = await login(formData);
    setLoading(false);

    if (result.success) {
      Toast.show({ type: "success", text1: "Success", text2: "Login Successful!" });
      // if (result.accountType === "Tailor") {
      //   navigation.navigate("TailorManagement", { userId: result.id });
      // } else {
      //   navigation.navigate("CustomerManagement", { userId: result.id });
      // }
      setTimeout(() => {
        navigation.navigate("MainTabs");
      },1500);
    } else {
      Toast.show({ type: "error", text1: "Login Failed", text2: result.message || "Invalid credentials" });
    }
  };

  return (
    <KeyboardAvoidingView 
    // behavior={Platform.OS === "ios" ? "padding" : "height"} 
    style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <MaterialIcon name="email" size={20} color="gray" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="gray"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={18} color="gray" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="gray"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.loginText}>Log In</Text>}
      </TouchableOpacity>

      {/* OR Separator */}
      {/* <Text style={styles.orText}>Or</Text>

      {/* Google Login Button */}
      {/* <TouchableOpacity style={styles.googleButton}>
        <Icon name="google" size={18} color="#DB4437" style={styles.googleIcon} />
        <Text style={styles.googleText}>Log In with Google</Text>
      </TouchableOpacity>  */}

      {/* Sign Up Link */}
      <Text style={styles.signupText}>
        Don't have an account? <Text style={styles.signupLink} onPress={() => navigation.navigate("SignUp")}>Sign up</Text>
      </Text>

      {/* Toast Messages */}
      <Toast />
    </KeyboardAvoidingView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    width: "100%",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
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
    fontSize: 16,
    color: "black",
    paddingVertical: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  loginButton: {
    width: "90%",
    borderRadius: 25,
    backgroundColor: "#7759F4",
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 10,
  },
  loginText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    marginVertical: 15,
    color: "gray",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    borderRadius: 25,
    backgroundColor: "#F5F5F5",
    paddingVertical: 12,
    justifyContent: "center",
  },
  googleIcon: {
    marginRight: 10,
  },
  googleText: {
    fontSize: 16,
    color: "black",
  },
  signupText: {
    color: "black",
    fontSize: 14,
    marginTop: 15,
  },
  signupLink: {
    fontWeight: "bold",
    color: "#007BFF",
    textDecorationLine: "underline",
  },
});

export default Login;
