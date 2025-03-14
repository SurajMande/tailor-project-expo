import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const menuSections = [
  {
    title: 'Manage',
    data: [
      { id: '1', title: 'Profile Data', icon: 'account-outline', color: '#6C63FF' },
      { id: '2', title: 'Appointments', icon: 'calendar-outline', color: '#FF6B6B' },
      { id: '3', title: 'Customer Orders', icon: 'clipboard-text-outline', color: '#40C4FF' },
      { id: '4', title: 'Offline Orders', icon: 'shopping-outline', color: '#4CAF50' },
      { id: '5', title: 'Business Card', icon: 'card-account-details-outline', color: '#FF9800' },
    ],
  },
  {
    title: 'More',
    data: [
      { id: '6', title: 'Settings', icon: 'cog-outline', color: '#8E44AD' },
      { id: '7', title: 'Help & Support', icon: 'help-circle-outline', color: '#3498DB' },
      { id: '8', title: 'Log Out', icon: 'logout', color: '#E74C3C', isLogout: true }, // Red logout button
    ],
  },
];

const TailorManagement = () => {
  const renderMenuItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.menuItem, { borderLeftColor: item.color }]}
    >
      <Icon name={item.icon} size={24} color={item.color} />
      <Text style={[styles.menuText, item.isLogout && styles.logoutText]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* User Profile Section */}
      <View style={styles.userSection}>
        <View style={styles.avatar}>
          <Icon name="account-circle" size={80} color="#fff" />
        </View>
        <Text style={styles.userName}>Tailor Manager</Text>
        <Text style={styles.userEmail}>manager@email.com</Text>
      </View>

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
              scrollEnabled={false} // Prevents inner scrolling
            />
          </View>
        )}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false} // Hides scrollbar
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  userSection: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#6C63FF',
    paddingVertical: 20,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#5244C9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  userEmail: {
    fontSize: 14,
    color: '#EAEAEA',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    marginVertical: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginBottom: 6,
    borderLeftWidth: 4, // Adds a color strip on the left
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 15,
    color: '#222',
  },
  logoutText: {
    color: '#E74C3C',
    fontWeight: 'bold',
  },
  flatListContent: {
    paddingBottom: 20, // Ensures spacing at the bottom
  },
});

export default TailorManagement;
