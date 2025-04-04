import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Header from "./Header";

const appointments = [
  { id: "1", customer: "John Doe", date: "2025-04-05", time: "10:30 AM", status: "Confirmed" },
  { id: "2", customer: "Emma Smith", date: "2025-04-07", time: "02:00 PM", status: "Pending" },
  { id: "3", customer: "Liam Johnson", date: "2025-04-09", time: "04:15 PM", status: "Completed" },
];

const AppointmentsPage = () => {

  const navigation = useNavigation()
  return (
    <View style={styles.container}>

      <Header
      navigation={navigation}
      name= "Your Appointments"
      />

      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.customer}>{item.customer}</Text>
              <Text style={[styles.status, styles[item.status.toLowerCase()]]}>{item.status}</Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="calendar" size={14} color="#888" />
              <Text style={styles.details}>{item.date}</Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="clock-outline" size={14} color="#888" />
              <Text style={styles.details}>{item.time}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  
  listContainer: {
    paddingBottom: 20,
    marginTop: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  customer: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  status: {
    fontSize: 12,
    fontWeight: "600",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 6,
    textTransform: "capitalize",
  },
  confirmed: {
    backgroundColor: "#E3FCEC",
    color: "#146C43",
  },
  pending: {
    backgroundColor: "#FFF4D4",
    color: "#8D6A00",
  },
  completed: {
    backgroundColor: "#D9F2FB",
    color: "#0D5D7C",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  details: {
    fontSize: 13,
    color: "#555",
  },
});

export default AppointmentsPage;
