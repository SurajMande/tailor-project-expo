import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

const ordersData = [
  { id: "1", name: "John Doe", item: "Shirt", status: "Pending" },
  { id: "2", name: "Emma Watson", item: "Pant", status: "Completed" },
  { id: "3", name: "Michael Smith", item: "Suit", status: "Pending" },
];

// Simple Header Component
const Header = ({ navigation, name }) => (
  <SafeAreaView style={styles.headerContainer}>
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation?.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{name}</Text>
      <View style={{ width: 24 }} />
    </View>
  </SafeAreaView>
);

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
    deliveryDate: new Date(),
  });
  const [otherItem, setOtherItem] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const fabScale = useRef(new Animated.Value(1)).current;

  // Pulse animation for FAB
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fabScale, {
          toValue: 1.05,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(fabScale, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

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
      setNewOrder({
        item: "",
        customer: "",
        height: "",
        length: "",
        shoulder: "",
        waist: "",
        deliveryDate: new Date(),
      });
      setOtherItem("");
    }
  };

  const renderOrderItem = ({ item }) => {
    const scaleAnim = new Animated.Value(1);

    const onPressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.98,
        useNativeDriver: true,
      }).start();
    };

    const onPressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Animated.View style={[styles.orderItem, { transform: [{ scale: scaleAnim }] }]}>
        <View>
          <Text style={styles.orderName}>{item.name}</Text>
          <Text style={styles.orderItemName}>{item.item}</Text>
        </View>
        <View style={styles.orderButtonContainer}>
          <TouchableOpacity
            style={[styles.orderButton, styles.completeButton]}
            activeOpacity={0.7}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
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
            activeOpacity={0.7}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
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
      </Animated.View>
    );
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header navigation={navigation} name="Order Management" />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#6B7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Orders..."
          placeholderTextColor="#9CA3AF"
          value={search}
          onChangeText={setSearch}
          onFocus={() => setFocusedInput("search")}
          onBlur={() => setFocusedInput(null)}
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {["Pending", "Completed", "Canceled"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.activeTab]}
            activeOpacity={0.7}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Order List */}
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.listContent}
      />

      {/* Floating Action Button */}
      <Animated.View style={[styles.fab, { transform: [{ scale: fabScale }] }]}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      {/* Modal for Adding Order */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>Add New Order</Text>

              {/* Item Name Dropdown */}
              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, newOrder.item && styles.inputLabelActive]}>
                  Item
                </Text>
                <View style={[styles.pickerContainer, focusedInput === "item" && styles.inputFocused]}>
                  <Picker
                    selectedValue={newOrder.item}
                    onValueChange={(value) => setNewOrder({ ...newOrder, item: value })}
                    style={styles.picker}
                    onFocus={() => setFocusedInput("item")}
                    onBlur={() => setFocusedInput(null)}
                  >
                    <Picker.Item label="Select Item" value="" />
                    <Picker.Item label="Shirt" value="Shirt" />
                    <Picker.Item label="Pant" value="Pant" />
                    <Picker.Item label="Suit" value="Suit" />
                    <Picker.Item label="Saree" value="Saree" />
                    <Picker.Item label="Other" value="Other" />
                  </Picker>
                </View>
              </View>
              {newOrder.item === "Other" && (
                <View style={styles.inputContainer}>
                  <Text style={[styles.inputLabel, otherItem && styles.inputLabelActive]}>
                    Custom Item Name
                  </Text>
                  <TextInput
                    style={[styles.input, focusedInput === "otherItem" && styles.inputFocused]}
                    placeholder="Enter item name"
                    placeholderTextColor="#9CA3AF"
                    value={otherItem}
                    onChangeText={setOtherItem}
                    onFocus={() => setFocusedInput("otherItem")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
              )}

              {/* Other Inputs */}
              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, newOrder.customer && styles.inputLabelActive]}>
                  Customer Name
                </Text>
                <TextInput
                  style={[styles.input, focusedInput === "customer" && styles.inputFocused]}
                  placeholder="Enter customer name"
                  placeholderTextColor="#9CA3AF"
                  value={newOrder.customer}
                  onChangeText={(text) => setNewOrder({ ...newOrder, customer: text })}
                  onFocus={() => setFocusedInput("customer")}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, newOrder.height && styles.inputLabelActive]}>
                  Height (cm)
                </Text>
                <TextInput
                  style={[styles.input, focusedInput === "height" && styles.inputFocused]}
                  placeholder="Enter height"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  value={newOrder.height}
                  onChangeText={(text) => setNewOrder({ ...newOrder, height: text })}
                  onFocus={() => setFocusedInput("height")}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, newOrder.length && styles.inputLabelActive]}>
                  Length (cm)
                </Text>
                <TextInput
                  style={[styles.input, focusedInput === "length" && styles.inputFocused]}
                  placeholder="Enter length"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  value={newOrder.length}
                  onChangeText={(text) => setNewOrder({ ...newOrder, length: text })}
                  onFocus={() => setFocusedInput("length")}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, newOrder.shoulder && styles.inputLabelActive]}>
                  Shoulder (cm)
                </Text>
                <TextInput
                  style={[styles.input, focusedInput === "shoulder" && styles.inputFocused]}
                  placeholder="Enter shoulder"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  value={newOrder.shoulder}
                  onChangeText={(text) => setNewOrder({ ...newOrder, shoulder: text })}
                  onFocus={() => setFocusedInput("shoulder")}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, newOrder.waist && styles.inputLabelActive]}>
                  Waist (cm)
                </Text>
                <TextInput
                  style={[styles.input, focusedInput === "waist" && styles.inputFocused]}
                  placeholder="Enter waist"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  value={newOrder.waist}
                  onChangeText={(text) => setNewOrder({ ...newOrder, waist: text })}
                  onFocus={() => setFocusedInput("waist")}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>

              {/* Date Picker */}
              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, newOrder.deliveryDate && styles.inputLabelActive]}>
                  Delivery Date
                </Text>
                <TouchableOpacity
                  style={[styles.datePickerButton, focusedInput === "date" && styles.inputFocused]}
                  activeOpacity={0.7}
                  onPress={() => setShowDatePicker(true)}
                  onFocus={() => setFocusedInput("date")}
                  onBlur={() => setFocusedInput(null)}
                >
                  <Text style={styles.datePickerText}>
                    {newOrder.deliveryDate
                      ? formatDate(newOrder.deliveryDate)
                      : "Select Delivery Date"}
                  </Text>
                  <Ionicons name="calendar-outline" size={20} color="#6B7280" />
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={newOrder.deliveryDate}
                    mode="date"
                    display="default"
                    minimumDate={new Date(2024, 0, 1)}
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      if (selectedDate) {
                        setNewOrder({ ...newOrder, deliveryDate: selectedDate });
                      }
                    }}
                  />
                )}
              </View>

              {/* Buttons */}
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.orderButton, styles.addButton]}
                  activeOpacity={0.7}
                  onPress={handleAddOrder}
                >
                  <Text style={styles.buttonText}>Add Order</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.orderButton, styles.cancelButton]}
                  activeOpacity={0.7}
                  onPress={() => setModalVisible(false)}
                >
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
    backgroundColor: "#F9FAFB",
    padding: 16,
  },
  headerContainer: {
    backgroundColor: "#4F46E5",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    paddingTop: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "500",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 4,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  activeTab: {
    backgroundColor: "#4F46E5",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  activeTabText: {
    color: "#fff",
  },
  listContent: {
    paddingBottom: 80,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  orderName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  orderItemName: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  orderButtonContainer: {
    flexDirection: "row",
  },
  orderButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 8,
  },
  completeButton: {
    backgroundColor: "#10B981",
  },
  cancelButton: {
    backgroundColor: "#EF4444",
  },
  addButton: {
    backgroundColor: "#4F46E5",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#4F46E5",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "transparent",
    paddingHorizontal: 4,
    zIndex: 1,
  },
  inputLabelActive: {
    top: -8,
    fontSize: 12,
    color: "#4F46E5",
    backgroundColor: "#fff",
  },
  input: {
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: "#1F2937",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  inputFocused: {
    borderColor: "#4F46E5",
    shadowColor: "#4F46E5",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pickerContainer: {
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  picker: {
    height: 44,
    width: "100%",
    color: "#1F2937",
  },
  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  datePickerText: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
});