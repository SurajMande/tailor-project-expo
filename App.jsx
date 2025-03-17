import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

// Import screens
import HomeScreen from "./src/screens/HomeScreen";
import TailorManagement from "./src/screens/TailorManagement";
import TailorProfile from "./src/screens/TailorProfile";
import Login from "./src/components/Login";
import BusinessCard from "./src/components/BusinessCard";
import SignUp from "./src/components/SignUp";

// Create Stack Navigator
const Stack = createStackNavigator();

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// Bottom Tab Navigation
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Home: "home",
            TailorManagement: "scissors",
            Account: "user",
          };
          return <Icon name={icons[route.name]} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#000", // Active tab color
        tabBarInactiveTintColor: "#B0B0B0", // Inactive tab color
        tabBarStyle: { backgroundColor: "#fff", paddingBottom: 10 },
        headerShown: false, // Hides top header title
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="TailorManagement" component={TailorManagement} />
      <Tab.Screen name="Account" component={Login} />
    </Tab.Navigator>
  );
}

// Main App with Stack Navigation (for Login & Other Screens)
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Hide headers for a cleaner look
        }}
      >
        <Stack.Screen name="MainTabs" component={BottomTabs} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="BusinessCard" component={BusinessCard} />
        <Stack.Screen name="TailorProfile" component={TailorProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
