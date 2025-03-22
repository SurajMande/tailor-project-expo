import React from 'react';
import Management from '../components/Management';

const customerMenuSections = [
  {
    title: 'Manage',
    data: [
      { id: '1', title: 'Profile Data', icon: 'account-outline', color: '#6C63FF' },
      { id: '2', title: 'Your Orders', icon: 'clipboard-text-outline', color: '#40C4FF' },
      { id: '3', title: 'Appointments', icon: 'calendar-outline', color: '#FF6B6B' },
    ],
  },
  {
    title: 'More',
    data: [
      { id: '6', title: 'Settings', icon: 'cog-outline', color: '#8E44AD' },
      { id: '7', title: 'Help & Support', icon: 'help-circle-outline', color: '#3498DB' },
      { id: '8', title: 'Log Out', icon: 'logout', color: '#E74C3C', isLogout: true },
    ],
  },
];

const CustomerManagement = () => {
  return (
    <Management 
      user={{ name: 'Customer', email: 'customer@email.com' }} 
      menuSections={customerMenuSections} 
    />
  );
};

export default CustomerManagement;
