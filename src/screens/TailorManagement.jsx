import React from 'react';
import Management from '../components/Management';
import { useNavigation } from '@react-navigation/native';

const tailorMenuSections = [
  {
    title: 'Manage',
    data: [
      { id: '1', title: 'Profile Data', icon: 'account-outline', color: '#6C63FF', path: 'TailorProfileDetails'},
      { id: '2', title: 'Appointments', icon: 'calendar-outline', color: '#FF6B6B', path: 'Appointments' },
      { id: '3', title: 'Customer Orders', icon: 'clipboard-text-outline', color: '#40C4FF', path: 'CustomerOrders' },
      { id: '4', title: 'Offline Orders', icon: 'shopping-outline', color: '#4CAF50', path: 'TailorProfileDetails' },
      { id: '5', title: 'Business Card', icon: 'card-account-details-outline', color: '#FF9800', path: 'BusinessCard' },
    ],
  },
  {
    title: 'More',
    data: [
      { id: '6', title: 'Settings', icon: 'cog-outline', color: '#8E44AD', path: 'Settings' },
      { id: '7', title: 'Help & Support', icon: 'help-circle-outline', color: '#3498DB', path: 'HelpSupport' },
      { id: '8', title: 'Log Out', icon: 'logout', color: '#E74C3C', isLogout: true, path: 'Logout' },
    ],
  },
];

const TailorManagement = () => {

  const navigation = useNavigation();

  return (
    <Management 
      user={{ name: 'Tailor', email: 'manager@email.com' }} 
      menuSections={tailorMenuSections} 
      navigation={navigation}  // Pass navigation prop
    />
  );
};

export default TailorManagement;
