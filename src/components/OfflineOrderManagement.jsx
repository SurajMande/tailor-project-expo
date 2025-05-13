import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import AddOrderModal from "./AddOrderModal";
import OrderDetailsModal from "./OrderDetailsModal";
import Header from "./Header";

const ordersData = [
  { id: "1", name: "Rajesh Mane", item: "Shirt", status: "Pending", height: "170", length: "70", shoulder: "45", waist: "80", deliveryDate: new Date() },
  { id: "2", name: "Kiran Kapse", item: "Pant", status: "Completed", height: "165", length: "90", shoulder: "42", waist: "75", deliveryDate: new Date() },
  { id: "3", name: "Roshan Godse", item: "Suit", status: "Pending", height: "180", length: "75", shoulder: "48", waist: "85", deliveryDate: new Date() },
];

const OfflineOrderManagement = ({ navigation }) => {
  const [orders, setOrders] = useState(ordersData);
  const [search, setSearch] = useState("");
  const [selectedTab, setSelectedTab] = useState("Pending");
  const [modalVisible, setModalVisible] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
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
          height: newOrder.height,
          length: newOrder.length,
          shoulder: newOrder.shoulder,
          waist: newOrder.waist,
          deliveryDate: newOrder.deliveryDate,
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
    return (
      <View style={styles.orderItem}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderName}>{item.name}</Text>
          <Text style={styles.orderItemName}>{item.item}</Text>
        </View>
        <View style={styles.orderButtonContainer}>
          <TouchableOpacity
            style={[styles.iconButton, styles.viewDetailsButton]}
            activeOpacity={0.7}
            onPress={() => {
              setSelectedOrder(item);
              setDetailsModalVisible(true);
            }}
          >
            <Ionicons name="eye-outline" size={28} color="#fff" />
          </TouchableOpacity>
          {selectedTab !== "Completed" && (
            <>
              <TouchableOpacity
                style={[styles.iconButton, styles.completeButton]}
                activeOpacity={0.7}
                onPress={() =>
                  setOrders((prev) =>
                    prev.map((order) =>
                      order.id === item.id ? { ...order, status: "Completed" } : order
                    )
                  )
                }
              >
                <Ionicons name="checkmark-circle-outline" size={28} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.iconButton, styles.cancelButton]}
                activeOpacity={0.7}
                onPress={() =>
                  setOrders((prev) =>
                    prev.map((order) =>
                      order.id === item.id ? { ...order, status: "Canceled" } : order
                    )
                  )
                }
              >
                <Ionicons name="close-circle-outline" size={28} color="#fff" />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header navigation={navigation} name="Order Management" />

      {/* Main Content */}
      <View style={styles.container1}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Orders..."
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
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
        <TouchableOpacity
          style={styles.fab}
          activeOpacity={0.7}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>

        {/* Add Order Modal */}
        <AddOrderModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          newOrder={newOrder}
          setNewOrder={setNewOrder}
          otherItem={otherItem}
          setOtherItem={setOtherItem}
          handleAddOrder={handleAddOrder}
        />

        {/* Order Details Modal */}
        <OrderDetailsModal
          modalVisible={detailsModalVisible}
          setModalVisible={setDetailsModalVisible}
          order={selectedOrder}
        />
      </View>
    </View>
  );
};

export default OfflineOrderManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  container1: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
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
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    height: 80, // Fixed height for consistency
  },
  orderInfo: {
    flex: 1,
    justifyContent: "center",
  },
  orderName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  orderItemName: {
    fontSize: 14,
    color: "#6B7280",
  },
  orderButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    transform: [{ scale: 1 }],
  },
  completeButton: {
    backgroundColor: "#10B981",
  },
  cancelButton: {
    backgroundColor: "#EF4444",
  },
  viewDetailsButton: {
    backgroundColor: "#3B82F6",
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
});