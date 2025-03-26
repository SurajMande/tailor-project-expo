import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

const Login = () => {
  return (
    <ImageBackground
      source={{
        uri: "https://images.pexels.com/photos/3738101/pexels-photo-3738101.jpeg?auto=compress&cs=tinysrgb&w=600",
      }}
      style={styles.background}
    >
      <View style={styles.overlay} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text style={styles.title}>Create Your Account</Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <MaterialIcon name="email" size={20} color="gray" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="gray"
            keyboardType="email-address"
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
          />
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>

        {/* OR Separator */}
        <Text style={styles.orText}>Or</Text>

        {/* Google Login Button */}
        <TouchableOpacity style={styles.googleButton}>
          <Icon name="google" size={18} color="#DB4437" style={styles.googleIcon} />
          <Text style={styles.googleText}>Log In with Google</Text>
        </TouchableOpacity>

        {/* Already have an account? */}
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginLink}>Log In</Text>
        </Text>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: "50%",
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
  signupButton: {
    width: "90%",
    borderRadius: 25,
    backgroundColor: "#007BFF",
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 10,
  },
  signupText: {
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
  loginText: {
    color: "black",
    fontSize: 14,
    marginTop: 15,
  },
  loginLink: {
    fontWeight: "bold",
    color: "#007BFF",
    textDecorationLine: "underline",
  },
});

export default Login;
