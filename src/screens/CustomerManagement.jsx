import React from 'react';
import Management from '../components/Management';
import { useNavigation } from '@react-navigation/native';

const customerMenuSections = [
  {
    title: 'Manage',
    data: [
      { id: '1', title: 'Profile Data', icon: 'account-outline', color: '#6C63FF', path: 'Profile' },
      { id: '2', title: 'Your Orders', icon: 'clipboard-text-outline', color: '#40C4FF', path: 'Orders' },
      { id: '3', title: 'Appointments', icon: 'calendar-outline', color: '#FF6B6B', path: 'Appointments' },
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

const CustomerManagement = () => {
  const navigation = useNavigation();
  return (
    <Management 
      user={{ name: 'Customer', email: 'customer@email.com' }} 
      menuSections={customerMenuSections} 
      navigation={navigation}  // Pass navigation prop
    />
  );
};

export default CustomerManagement;
