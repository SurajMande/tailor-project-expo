import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, LayoutAnimation, UIManager, Platform } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Header from "./Header";
import { useNavigation } from "@react-navigation/native";

// Enable smooth animations on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const guideData = [
  {
    id: "1",
    title: "Getting Started",
    icon: "account-circle-outline",
    content: [
      { icon: "check-circle-outline", text: "Sign up and set up your profile." },
      { icon: "view-dashboard-outline", text: "Explore the dashboard for key features." },
      { icon: "clipboard-text-outline", text: "Manage your orders and appointments easily." },
    ],
  },
  {
    id: "2",
    title: "Managing Appointments",
    icon: "calendar-check-outline",
    content: [
      { icon: "calendar-clock-outline", text: "View upcoming and past appointments." },
      { icon: "autorenew", text: "Reschedule or cancel as needed." },
      { icon: "bell-ring-outline", text: "Get notified of new bookings instantly." },
    ],
  },
  {
    id: "3",
    title: "Handling Orders",
    icon: "package-variant-closed",
    content: [
      { icon: "format-list-bulleted", text: "Track all customer orders in one place." },
      { icon: "progress-check", text: "Update order status (Pending, In Progress, Completed)." },
      { icon: "ruler-square", text: "Manage measurements and delivery dates." },
    ],
  },
  {
    id: "4",
    title: "Profile & Settings",
    icon: "cog-outline",
    content: [
      { icon: "account-edit-outline", text: "Update tailor details like shop name & contact info." },
      { icon: "clock-outline", text: "Set availability for appointments." },
      { icon: "image-outline", text: "Upload a profile picture and branding logo." },
    ],
  },
  {
    id: "5",
    title: "Need More Help?",
    icon: "help-circle-outline",
    content: [
      { icon: "phone", text: "Phone: +1 234 567 890" },
      { icon: "email-outline", text: "Email: support@tailormanagement.com" },
      { icon: "chat-processing-outline", text: "Live Chat: Available 24/7 in the app" },
    ],
  },
];

const HelpNSupport = () => {
  const [expandedId, setExpandedId] = useState(null);
  const navigation = useNavigation();

  const toggleExpand = (id) => {
    LayoutAnimation.easeInEaseOut();
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header
      navigation={navigation}
      name= "Help and Support"
      />

      {guideData.map((item) => {
        const isExpanded = expandedId === item.id;
        return (
          <View key={item.id} style={styles.card}>
            <TouchableOpacity style={styles.cardHeader} onPress={() => toggleExpand(item.id)}>
              <MaterialCommunityIcons name={item.icon} size={22} color="#007AFF" />
              <Text style={styles.cardTitle}>{item.title}</Text>
              <MaterialCommunityIcons name={isExpanded ? "chevron-up" : "chevron-down"} size={24} color="#777" />
            </TouchableOpacity>

            {isExpanded && (
              <View style={styles.cardContent}>
                {item.content.map((detail, index) => (
                  <View key={index} style={styles.contentRow}>
                    <MaterialCommunityIcons name={detail.icon} size={18} color="#007AFF" />
                    <Text style={styles.contentText}>{detail.text}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FC",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 12,
    paddingHorizontal: 18,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    flex: 1,
    fontSize: 14.5,
    fontWeight: "500",
    color: "#333",
    marginLeft: 8,
  },
  cardContent: {
    marginTop: 10,
    padding: 12,
    backgroundColor: "#F0F4FF",
    borderRadius: 8,
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  contentText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 8,
  },
});

export default HelpNSupport;
