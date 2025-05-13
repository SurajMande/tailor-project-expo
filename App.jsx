import React from "react";
import { View, SafeAreaView} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons"; // Using Ionicons for better icons
import { StyleSheet } from "react-native";

// Import screens
import HomeScreen from "./src/screens/HomeScreen";
import TailorManagement from "./src/screens/TailorManagement";
import CustomerManagement from "./src/screens/CustomerManagement";
import TailorProfile from "./src/screens/TailorProfile";
import Settings from "./src/screens/Settings";

import Login from "./src/components/Login";
import SignUp from "./src/components/SignUp";
import BusinessCard from "./src/components/BusinessCard";
import TailorProfileDetails from "./src/components/TailorProfileDetails";
import OfflineOrderManagement from "./src/components/OfflineOrderManagement";
import SearchResults from "./src/components/SearchResults";
import AppointmentsPage from "./src/components/AppointmentPage";
import HelpNSupport from "./src/components/HelpNSupport";
import IsLoggedIn from "./src/components/IsLoggedIn";

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
} from "@env";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Create Stack Navigator
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Custom TabBar Style
function CustomTabBar({ state, descriptors, navigation }) {
  return (
      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const iconNames = {
            Home: "home-outline",
            TailorManagement: "cut-outline",
            Account: "person-outline",
          };
          const isFocused = state.index === index;

          return (
            <View key={route.name} style={styles.tabButtonWrapper}>
              <Icon
                name={iconNames[route.name]}
                size={isFocused ? 26 : 22}
                color={isFocused ? "blue" : "#B0B0B0"}
                onPress={() => navigation.navigate(route.name)}
              />
              {isFocused && <View style={styles.activeDot} />}
            </View>
          );
        })}
      </View>
  );
}

// Bottom Tabs Navigation
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* <Tab.Screen name="TailorManagement" component={TailorManagement} /> */}
      <Tab.Screen name="Account" component={IsLoggedIn} />
      {/* <Tab.Screen name="Account" component={OfflineOrderManagement} /> */}
    </Tab.Navigator>
  );
}

// Main App with Stack Navigation
export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={BottomTabs} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="TailorProfile" component={TailorProfile} />
          <Stack.Screen name="BusinessCard" component={BusinessCard} />
          <Stack.Screen name="SearchResults" component={SearchResults} />
          <Stack.Screen name="TailorProfileDetails" component={TailorProfileDetails} />
          <Stack.Screen name="TailorManagement" component={TailorManagement} />
          <Stack.Screen name="CustomerManagement" component={CustomerManagement} />
          <Stack.Screen name="AppointmentsPage" component={AppointmentsPage} />
          <Stack.Screen name="HelpNSupport" component={HelpNSupport} />
          <Stack.Screen name="OfflineOrderManagement" component={OfflineOrderManagement} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="IsLoggedIn" component={IsLoggedIn} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

// Styles for Floating TabBar
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5, // For Android shadow
  },
  tabButtonWrapper: {
    alignItems: "center",
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#000",
    marginTop: 4,
  },
});
