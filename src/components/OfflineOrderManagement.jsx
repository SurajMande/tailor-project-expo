import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { StyleSheet } from "react-native";

const OfflineOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [newOrder, setNewOrder] = useState({
    customerName: "",
    phoneNumber: "",
    itemName: "",
    deliveryDate: "",
  });

  // Handle input changes
  const handleChange = (key, value) => {
    setNewOrder({ ...newOrder, [key]: value });
  };

  // Add new order
  const handleAddOrder = () => {
    if (!newOrder.customerName || !newOrder.phoneNumber || !newOrder.itemName || !newOrder.deliveryDate) {
      Alert.alert("Missing Fields", "All fields are required.", [{ text: "OK" }]);
      return;
    }
    setOrders([...orders, newOrder]);
    setNewOrder({ customerName: "", phoneNumber: "", itemName: "", deliveryDate: "" });
    setModalVisible(false);
  };

  // Show and hide date picker
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  // Handle date selection
  const handleConfirm = (date) => {
    handleChange("deliveryDate", moment(date).format("DD/MM/YYYY"));
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add New Order</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Pending Orders</Text>
      {orders.length === 0 ? (
        <Text style={styles.noOrdersText}>No orders available</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.orderCard}>
              <Text style={styles.orderText}>Customer: {item.customerName}</Text>
              <Text style={styles.orderText}>Phone: {item.phoneNumber}</Text>
              <Text style={styles.orderText}>Item: {item.itemName}</Text>
              <Text style={styles.orderText}>Delivery: {item.deliveryDate}</Text>
            </View>
          )}
        />
      )}

      {/* Modal for adding a new order */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
              <ScrollView>
                <Text style={styles.modalTitle}>Add New Order</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Customer Name"
                  value={newOrder.customerName}
                  onChangeText={(text) => handleChange("customerName", text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  keyboardType="phone-pad"
                  value={newOrder.phoneNumber}
                  onChangeText={(text) => handleChange("phoneNumber", text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Item Name"
                  value={newOrder.itemName}
                  onChangeText={(text) => handleChange("itemName", text)}
                />

                <TouchableOpacity style={styles.dateButton} onPress={showDatePicker}>
                  <Text style={styles.dateButtonText}>
                    {newOrder.deliveryDate || "Select Delivery Date"}
                  </Text>
                </TouchableOpacity>

                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />

                <View style={styles.modalButtons}>
                  <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.confirmButton} onPress={handleAddOrder}>
                    <Text style={styles.buttonText}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  noOrdersText: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    marginBottom: 10,
  },
  orderCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  orderText: {
    fontSize: 14,
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  dateButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  dateButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  confirmButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default OfflineOrderManagement;
