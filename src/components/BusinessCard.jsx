import React from "react";
import { 
  View, Text, FlatList, StyleSheet, TouchableOpacity, Linking, SafeAreaView 
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import Header from "./Header";

const BusinessCard = () => {
  const navigation = useNavigation(); // Get navigation instance

  // JSON Data for the card
  const businessData = {
    name: "Arya Designs",
    specialty: "Tailor Specialist",
    services: [
      { id: "1", name: "Custom Tailoring" },
      { id: "2", name: "Alterations" },
      { id: "3", name: "Bespoke Suits" },
    ],
    contact: [
      { id: "1", icon: "phone-alt", text: "+1 555 789 1234", link: "tel:+15557891234" },
      { id: "2", icon: "envelope", text: "arya.designs@example.com", link: "mailto:arya.designs@example.com" },
      { id: "3", icon: "globe", text: "https://aryadesigns.com", link: "https://aryadesigns.com" },
      { id: "4", icon: "map-marker-alt", text: "45 Fashion Street, Tailor City", link: "https://www.google.com/maps/search/45+Fashion+Street,+Tailor+City" },
    ],
    socialMedia: [
      { id: "1", icon: "facebook", color: "#3b5998", link: "https://facebook.com" },
      { id: "2", icon: "instagram", color: "#C13584", link: "https://instagram.com" },
      { id: "3", icon: "twitter", color: "#1DA1F2", link: "https://twitter.com" },
      { id: "4", icon: "link", color: "#888", link: "https://aryadesigns.com" },
    ],
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header with Back Button */}
      <Header 
      navigation={navigation} 
      name="Business Card"
      />

      <View style={styles.card}>
        {/* Profile Section */}
        <View style={styles.cardHeader}>
          <View style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{businessData.name}</Text>
            <Text style={styles.specialty}>{businessData.specialty}</Text>
          </View>
        </View>

        {/* Services */}
        <View style={styles.servicesContainer}>
          <Text style={styles.sectionTitle}>Services</Text>
          <FlatList
            data={businessData.services}
            keyExtractor={(item) => item.id}
            horizontal
            renderItem={({ item }) => (
              <View style={styles.serviceBox}>
                <Text style={styles.serviceText}>{item.name}</Text>
              </View>
            )}
            showsHorizontalScrollIndicator={false} // Hides scrollbar
          />
        </View>

        {/* Contact Details */}
        <View style={styles.contactContainer}>
          {businessData.contact.map((item) => (
            <TouchableOpacity key={item.id} style={styles.contactItem} onPress={() => Linking.openURL(item.link)}>
              <Icon name={item.icon} size={18} color="#555" style={styles.icon} />
              <Text style={styles.contactText}>{item.text}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Social Media Icons */}
        <View style={styles.socialContainer}>
          {businessData.socialMedia.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => Linking.openURL(item.link)} style={styles.socialIcon}>
              <Icon name={item.icon} size={25} color={item.color} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 20,
    marginTop:30,
    overflow: "hidden",
    elevation: 5,
  },
  cardHeader: {
    backgroundColor: "#673AB7",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileInfo: {
    marginLeft: 15,
  },
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  specialty: {
    color: "#ddd",
    fontSize: 14,
  },
  servicesContainer: {
    backgroundColor: "#EDE7F6",
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  serviceBox: {
    backgroundColor: "#BDBDBD",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginRight: 10,
  },
  serviceText: {
    color: "#000",
    fontSize: 14,
  },
  contactContainer: {
    padding: 15,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8, // Improved spacing
  },
  icon: {
    width: 25,
    marginRight: 10,
  },
  contactText: {
    fontSize: 14,
    color: "#555",
    fontWeight: 'bold'
  },
  socialContainer: {
    backgroundColor: "#212121",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
  },
  socialIcon: {
    marginHorizontal: 15,
  },
});

export default BusinessCard;