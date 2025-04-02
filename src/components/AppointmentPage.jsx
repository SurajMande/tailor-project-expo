import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const appointments = [
  { id: "1", customer: "John Doe", date: "2025-04-05", time: "10:30 AM", status: "Confirmed" },
  { id: "2", customer: "Emma Smith", date: "2025-04-07", time: "02:00 PM", status: "Pending" },
  { id: "3", customer: "Liam Johnson", date: "2025-04-09", time: "04:15 PM", status: "Completed" },
];

const AppointmentsPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Appointments</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.customer}>{item.customer}</Text>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="calendar" size={16} color="#666" />
              <Text style={styles.details}>{item.date}</Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="clock-time-four-outline" size={16} color="#666" />
              <Text style={styles.details}>{item.time}</Text>
            </View>

            <Text style={[styles.status, styles[item.status.toLowerCase()]]}>
              {item.status}
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.rescheduleButton}>
                <MaterialCommunityIcons name="calendar-refresh" size={16} color="#FFF" />
                <Text style={styles.buttonText}>Reschedule</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelButton}>
                <MaterialCommunityIcons name="close-circle" size={16} color="#FFF" />
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
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
    backgroundColor: "#F5F5F5",
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  customer: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 6,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: "#666",
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 6,
  },
  confirmed: {
    backgroundColor: "#D4EDDA",
    color: "#155724",
  },
  pending: {
    backgroundColor: "#FFF3CD",
    color: "#856404",
  },
  completed: {
    backgroundColor: "#D1ECF1",
    color: "#0C5460",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  rescheduleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 6,
  },
  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DC3545",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 6,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default AppointmentsPage;
