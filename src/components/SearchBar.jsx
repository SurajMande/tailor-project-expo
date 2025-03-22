import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBarWithModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [location, setLocation] = useState('');
  const [service, setService] = useState('');
  const navigation = useNavigation();

  const handleApply = () => {
    setModalVisible(false);
    navigation.navigate('SearchResults', { searchText, location, service });
  };

  return (
    <View>
      {/* Search Bar */}
      <TouchableOpacity style={styles.searchBar} onPress={() => setModalVisible(true)}>
        <Text style={styles.placeholderText}>Search for tailors...</Text>
        <Icon name="search" size={20} color="#6A5ACD" />
      </TouchableOpacity>

      {/* Bottom Modal */}
      <Modal
        isVisible={modalVisible}
        style={styles.modalContainer}
        onBackdropPress={() => setModalVisible(false)}
        backdropOpacity={0.3}
        swipeDirection="down"
        onSwipeComplete={() => setModalVisible(false)}
      >
        <View style={styles.modalContent}>
          {/* Close Button */}
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Icon name="close" size={24} color="#333" />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Search Tailors</Text>

          {/* Search Input */}
          <TextInput
            style={styles.input}
            placeholder="Enter tailor name..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#7D7D7D"
          />

          {/* Location Selector */}
          <RNPickerSelect
            onValueChange={(value) => setLocation(value)}
            items={[
              { label: 'Delhi', value: 'delhi' },
              { label: 'Mumbai', value: 'mumbai' },
              { label: 'Indore', value: 'indore' },
              { label: 'Nashik', value: 'nashik' },
            ]}
            placeholder={{ label: 'Select location...', value: null }}
            style={pickerSelectStyles}
          />

          {/* Service Selector */}
          <RNPickerSelect
            onValueChange={(value) => setService(value)}
            items={[
              { label: "Men's Wear", value: 'mens' },
              { label: "Women's Wear", value: 'womens' },
              { label: 'Both', value: 'both' },
            ]}
            placeholder={{ label: 'Select service...', value: null }}
            style={pickerSelectStyles}
          />

          {/* Apply Button */}
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    width: '95%',
    alignSelf: 'center',
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    backgroundColor: '#F9FAFB',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  placeholderText: {
    color: '#7D7D7D',
    fontSize: 15,
    paddingHorizontal: 5
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 45,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  applyButton: {
    backgroundColor: '#6A5ACD',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = {
  inputIOS: {
    width: '100%',
    height: 50,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    backgroundColor: '#F9FAFB',
  },
  inputAndroid: {
    width: '100%',
    height: 50,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    backgroundColor: '#F9FAFB',
  },
};

export default SearchBarWithModal;
