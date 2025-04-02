import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Header from "./Header";
import { useNavigation } from "@react-navigation/native";

const Management = ({ user, menuSections }) => {

  const navigation = useNavigation();

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity 
    style={styles.menuItem} activeOpacity={0.7}
    onPress={() => navigation.navigate(item.path)} // Navigate to specified path
    >
      <View style={styles.iconContainer}>
        <Icon name={item.icon} size={22} color="#6C63FF" />
      </View>
      <Text style={[styles.menuText, item.isLogout && styles.logoutText]}>
        {item.title}
      </Text>
      <Icon name="chevron-right" size={22} color="#999" style={styles.chevronIcon} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header 
      navigation={navigation} 
      name={`${user.name} Management`} 
      />

      {/* User Profile Section */}
      <View style={styles.userSection}>
        <View style={styles.avatar}>
          <Icon name="account-circle" size={60} color="#fff" />
        </View>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>

        {/* Location & Language */}
        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
            <Icon name="map-marker" size={18} color="#6C63FF" />
            <Text style={styles.infoText}>Damascus</Text>
          </View>
          <View style={styles.infoBox}>
            <Icon name="web" size={18} color="#6C63FF" />
            <Text style={styles.infoText}>English</Text>
          </View>
        </View>
      </View>

      {/* Share App Section */}
      <TouchableOpacity style={styles.shareApp} activeOpacity={0.8}>
        <Text style={styles.shareText}>😊 Share Our App</Text>
        <Icon name="share-variant" size={20} color="#fff" />
      </TouchableOpacity>

      {/* Menu Sections */}
      <FlatList
        data={menuSections}
        keyExtractor={(section) => section.title}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.sectionTitle}>{item.title}</Text>
            <FlatList
              data={item.data}
              keyExtractor={(subItem) => subItem.id}
              renderItem={renderMenuItem}
              scrollEnabled={false}
            />
          </View>
        )}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FC",
  },
  userSection: {
    alignItems: "center",
    padding: 25,
    backgroundColor: "#fff",
    borderRadius: 15,
    margin: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "#6C63FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    elevation: 5,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  userEmail: {
    fontSize: 12,
    color: "#777",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    marginTop: 10,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF1FF",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  infoText: {
    fontSize: 12,
    color: "#6C63FF",
    marginLeft: 5,
    fontWeight: "500",
  },
  shareApp: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#6C63FF",
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderRadius: 12,
    elevation: 4,
    marginHorizontal: 15,
    marginTop: 5,
  },
  shareText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#6C63FF",
    marginVertical: 10,
    marginLeft: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    marginBottom: 8,
  },
  iconContainer: {
    width: 30,
    alignItems: "center",
  },
  menuText: {
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
    color: "#222",
    marginLeft: 12,
  },
  chevronIcon: {
    opacity: 0.5,
  },
  logoutText: {
    color: "#E74C3C",
    fontWeight: "bold",
  },
  flatListContent: {
    paddingBottom: 20,
  },
});

export default Management;
