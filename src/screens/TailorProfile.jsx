import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const tailorData = {
  name: "John Doe",
  location: "New York, USA",
  about:
    "I'm a passionate tailor with over 10 years of experience in crafting elegant and bespoke garments. From wedding suits to everyday wear, I ensure every piece is tailored to perfection.",
  rating: 4.5,
  profileImage:
    "https://images.pexels.com/photos/26150470/pexels-photo-26150470/free-photo-of-brunette-man-posing-wearing-black-suit-jacket-and-white-shirt-with-arms-crossed.jpeg?auto=compress&cs=tinysrgb&w=600",
  services: ["Wedding Suits", "Custom Tailoring", "Alterations"],
  works: [
    {
      img: "https://images.pexels.com/photos/6764932/pexels-photo-6764932.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Wedding Suit",
    },
    {
      img: "https://images.pexels.com/photos/2814864/pexels-photo-2814864.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Custom Gown",
    },
    {
      img: "https://images.pexels.com/photos/3419673/pexels-photo-3419673.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Party Wear",
    },
    {
      img: "https://images.pexels.com/photos/2064505/pexels-photo-2064505.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Wedding Dress",
    },
  ],
  contact: [
    { type: "Phone", icon: "phone", value: "123-456-7890" },
    { type: "Email", icon: "envelope", value: "johndoe@example.com" },
    { type: "Website", icon: "globe", value: "www.tailorwebsite.com" },
    { type: "Address", icon: "map-marker", value: "New York, USA" },
  ],
};

const TailorProfile = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Fixed Profile Image */}
      <View style={styles.fixedHeader}>
        <Image source={{ uri: tailorData.profileImage }} style={styles.profileImage} />
        <View style={styles.overlay}>
          <Text style={styles.name}>{tailorData.name}</Text>
          <Text style={styles.location}>
            <Icon name="map-marker" size={14} color="#fff" /> {tailorData.location}
          </Text>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContainer}>
        {/* Rating & About Section */}
        <View style={styles.section}>
          <Text style={styles.rating}>
            <Icon name="star" size={16} color="gold" /> {tailorData.rating} / 5.0
          </Text>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>{tailorData.about}</Text>
        </View>

        {/* Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services</Text>
          <View style={styles.servicesContainer}>
            {tailorData.services.map((service, index) => (
              <Text key={index} style={styles.serviceTag}>
                {service}
              </Text>
            ))}
          </View>
        </View>

        {/* Portfolio Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Works</Text>
          <FlatList
            data={tailorData.works}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.workItem}>
                <Image source={{ uri: item.img }} style={styles.workImage} />
                <Text style={styles.workTitle}>{item.title}</Text>
              </View>
            )}
          />
        </View>

        {/* Contact Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact</Text>
          {tailorData.contact.map((item, index) => (
            <View key={index} style={styles.contactRow}>
              <Icon name={item.icon} size={18} color="#6A5ACD" />
              <Text style={styles.contactText}>{item.value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Fixed "Book Now" Button */}
      <TouchableOpacity style={styles.bookNowButton}>
        <Text style={styles.bookNowText}>Book Now</Text>
        <Icon name="chevron-right" size={18} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  fixedHeader: {
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 10,
  },
  profileImage: {
    width: "100%",
    height: 250,
    objectFit: 'cover'
  },
  overlay: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  location: {
    fontSize: 16,
    color: "#ddd",
  },
  scrollContainer: {
    marginTop: 250,
    flex: 1,
    paddingBottom: 60, // Space for fixed button
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6A5ACD",
  },
  aboutText: {
    fontSize: 14,
    color: "#666",
  },
  servicesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  serviceTag: {
    backgroundColor: "#E6E6FA",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 15,
    fontSize: 14,
    color: "#6A5ACD",
    fontWeight: "bold",
  },
  workItem: {
    marginRight: 15,
  },
  workImage: {
    width: 120,
    height: 120,
    borderRadius: 15,
  },
  workTitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  contactText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 10,
  },
  bookNowButton: {
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
    backgroundColor: "#000",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 30,
    elevation: 5,
  },
  bookNowText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginRight: 10,
  },
});

export default TailorProfile;
