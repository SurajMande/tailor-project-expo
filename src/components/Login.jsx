import React from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

const Login = () => {
  return (
    <ImageBackground
      source={{
        uri: encodeURI("https://images.pexels.com/photos/3738101/pexels-photo-3738101.jpeg?auto=compress&cs=tinysrgb&w=600"),
      }}
      style={styles.background}
    >
      <View style={styles.overlay} />

      <Text style={styles.welcomeText}>Welcome Back !</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="gray" />
        <MaterialIcon name="email" size={20} color="gray" style={styles.inputIcon} />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="gray" secureTextEntry />
        <Icon name="key" size={18} color="gray" style={styles.inputIcon} />
      </View>

      {/* Remember Me & Forgot Password
      <View style={styles.optionsContainer}>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity style={styles.checkbox} />
          <Text style={styles.rememberText}>Remember for 30 days</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>
      </View> */}

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>

      {/* Signup Option */}
      <Text style={styles.signupText}>
        Don't have an account? <Text style={styles.signupLink}>Sign Up</Text>
      </Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay effect
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 25,
    paddingHorizontal: 20,
    width: "80%",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "white",
    paddingVertical: 15,
  },
  inputIcon: {
    position: "absolute",
    right: 15,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 3,
    marginRight: 5,
  },
  rememberText: {
    color: "white",
    fontSize: 14,
  },
  forgotText: {
    color: "white",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  loginButton: {
    width: "80%",
    borderRadius: 25,
    backgroundColor: "#6959CD", 
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 15,
  },
  loginText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupText: {
    color: "white",
    fontSize: 14,
  },
  signupLink: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default Login;
