import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import DatePicker from "react-native-datepicker";
import RNPickerSelect from "react-native-picker-select";
import Header from "./Header";

const ordersData = [
  { id: "1", name: "John Doe", item: "Shirt", status: "Pending" },
  { id: "2", name: "Emma Watson", item: "Pant", status: "Completed" },
  { id: "3", name: "Michael Smith", item: "Suit", status: "Pending" },
];

const OfflineOrderManagement = ({ navigation }) => {
  const [orders, setOrders] = useState(ordersData);
  const [search, setSearch] = useState("");
  const [selectedTab, setSelectedTab] = useState("Pending");
  const [modalVisible, setModalVisible] = useState(false);
  const [newOrder, setNewOrder] = useState({
    item: "",
    customer: "",
    height: "",
    length: "",
    shoulder: "",
    waist: "",
    deliveryDate: "",
  });
  const [otherItem, setOtherItem] = useState("");

  const filteredOrders = orders.filter(
    (order) =>
      order.name.toLowerCase().includes(search.toLowerCase()) &&
      order.status === selectedTab
  );

  const handleAddOrder = () => {
    const itemName = newOrder.item === "Other" ? otherItem : newOrder.item;
    if (itemName && newOrder.customer) {
      setOrders((prev) => [
        ...prev,
        {
          id: (prev.length + 1).toString(),
          name: newOrder.customer,
          item: itemName,
          status: "Pending",
        },
      ]);
      setModalVisible(false);
      setNewOrder({ item: "", customer: "", height: "", length: "", shoulder: "", waist: "", deliveryDate: "" });
      setOtherItem("");
    }
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <View>
        <Text style={styles.orderName}>{item.name}</Text>
        <Text style={styles.orderItemName}>{item.item}</Text>
      </View>
      <TouchableOpacity
        style={[styles.orderButton, styles.completeButton]}
        onPress={() =>
          setOrders((prev) =>
            prev.map((order) =>
              order.id === item.id ? { ...order, status: "Completed" } : order
            )
          )
        }
      >
        <Text style={styles.buttonText}>Complete</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.orderButton, styles.cancelButton]}
        onPress={() =>
          setOrders((prev) =>
            prev.map((order) =>
              order.id === item.id ? { ...order, status: "Canceled" } : order
            )
          )
        }
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header 
      navigation={navigation}
      name= "Order Management"
      />

      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search Orders..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Tabs */}
      <View style={styles.tabs}>
        {["Pending", "Completed", "Canceled"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.activeTab]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={styles.tabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Order List */}
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderItem}
      />

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

      {/* Modal for Adding Order */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>Add New Order</Text>

              {/* Item Name Dropdown */}
              <RNPickerSelect
                onValueChange={(value) => setNewOrder({ ...newOrder, item: value })}
                items={[
                  { label: "Shirt", value: "Shirt" },
                  { label: "Pant", value: "Pant" },
                  { label: "Suit", value: "Suit" },
                  { label: "Saree", value: "Saree" },
                  { label: "Other", value: "Other" },
                ]}
                placeholder={{ label: "Select Item", value: "" }}
                style={pickerStyles}
              />
              {newOrder.item === "Other" && (
                <TextInput
                  style={styles.input}
                  placeholder="Enter item name"
                  value={otherItem}
                  onChangeText={setOtherItem}
                />
              )}

              {/* Other Inputs */}
              <TextInput style={styles.input} placeholder="Customer Name" value={newOrder.customer} onChangeText={(text) => setNewOrder({ ...newOrder, customer: text })} />
              <TextInput style={styles.input} placeholder="Height" keyboardType="numeric" value={newOrder.height} onChangeText={(text) => setNewOrder({ ...newOrder, height: text })} />
              <TextInput style={styles.input} placeholder="Length" keyboardType="numeric" value={newOrder.length} onChangeText={(text) => setNewOrder({ ...newOrder, length: text })} />
              <TextInput style={styles.input} placeholder="Shoulder" keyboardType="numeric" value={newOrder.shoulder} onChangeText={(text) => setNewOrder({ ...newOrder, shoulder: text })} />
              <TextInput style={styles.input} placeholder="Waist" keyboardType="numeric" value={newOrder.waist} onChangeText={(text) => setNewOrder({ ...newOrder, waist: text })} />

              {/* Date Picker */}
              <DatePicker style={styles.datePicker} date={newOrder.deliveryDate} mode="date" placeholder="Select Delivery Date" format="YYYY-MM-DD" minDate="2024-01-01" confirmBtnText="Confirm" cancelBtnText="Cancel" onDateChange={(date) => setNewOrder({ ...newOrder, deliveryDate: date })} />

              {/* Buttons */}
              <View style={styles.modalButtons}>
                <TouchableOpacity style={[styles.orderButton, styles.addButton]} onPress={handleAddOrder}>
                  <Text style={styles.buttonText}>Add Order</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.orderButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OfflineOrderManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  searchInput: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 12,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
  },
  activeTab: {
    backgroundColor: "#007bff",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  orderItemName: {
    fontSize: 14,
    color: "#555",
  },
  orderButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginLeft: 6,
  },
  completeButton: {
    backgroundColor: "#28a745",
  },
  cancelButton: {
    backgroundColor: "#dc3545",
  },
  addButton: {
    backgroundColor: "#007bff",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007bff",
    padding: 16,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
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
    padding: 16,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f8f9fa",
    padding: 10,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
  },
  datePicker: {
    width: "100%",
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
});

const pickerStyles = {
  inputIOS: {
    backgroundColor: "#f8f9fa",
    padding: 10,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
  },
  inputAndroid: {
    backgroundColor: "#f8f9fa",
    padding: 10,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
  },
};
