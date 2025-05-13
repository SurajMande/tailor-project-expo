import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

const AddOrderModal = ({
  modalVisible,
  setModalVisible,
  newOrder,
  setNewOrder,
  otherItem,
  setOtherItem,
  handleAddOrder,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const formatDate = (date) => date.toISOString().split("T")[0];

  const measurementFields = [
    { key: "customer", placeholder: "Enter customer name", keyboard: "default" },
    { key: "height", placeholder: "Enter height", keyboard: "numeric" },
    { key: "length", placeholder: "Enter length", keyboard: "numeric" },
    { key: "shoulder", placeholder: "Enter shoulder", keyboard: "numeric" },
    { key: "waist", placeholder: "Enter waist", keyboard: "numeric" },
  ];

  return (
    <Modal visible={modalVisible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Ionicons name="close" size={24} color="#1F2937" />
          </TouchableOpacity>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.modalScrollContent}
          >
            <Text style={styles.modalTitle}>Add New Order</Text>

            {/* Item Picker */}
            <View style={styles.inputContainer}>
              <View style={[styles.pickerContainer, focusedInput === "item" && styles.inputFocused]}>
                <Picker
                  selectedValue={newOrder.item}
                  onValueChange={(value) => setNewOrder({ ...newOrder, item: value })}
                  style={styles.picker}
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

            {/* Custom Item Input */}
            {newOrder.item === "Other" && (
              <View style={styles.inputContainer}>
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
            {measurementFields.map((field) => (
              <View key={field.key} style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, focusedInput === field.key && styles.inputFocused]}
                  placeholder={field.placeholder}
                  placeholderTextColor="#9CA3AF"
                  keyboardType={field.keyboard}
                  value={newOrder[field.key]}
                  onChangeText={(text) =>
                    setNewOrder({ ...newOrder, [field.key]: text })
                  }
                  onFocus={() => setFocusedInput(field.key)}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
            ))}

            {/* Delivery Date Picker */}
            <View style={styles.inputContainer}>
              <TouchableOpacity
                style={[styles.datePickerButton, focusedInput === "date" && styles.inputFocused]}
                activeOpacity={0.7}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.datePickerText}>
                  {newOrder.deliveryDate !== new Date()
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

            {/* Action Buttons */}
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
                onPress={() => {
                  setModalVisible(false);
                  setShowDatePicker(false);
                }}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AddOrderModal;

const styles = StyleSheet.create({
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
    maxHeight: "90%",
  },
  modalScrollContent: {
    paddingBottom: 60,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 24,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#F9FAFB",
    padding: 16,
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
    height: 52,
    justifyContent: "center",
  },
  picker: {
    height: 52,
    width: "100%",
    color: "#1F2937",
    marginTop: -4,
  },
  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    padding: 16,
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
    marginTop: 24,
  },
  orderButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 8,
  },
  addButton: {
    backgroundColor: "#4F46E5",
  },
  cancelButton: {
    backgroundColor: "#EF4444",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
});