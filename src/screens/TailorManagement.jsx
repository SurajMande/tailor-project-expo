import React from 'react';
import Management from '../components/Management';

const tailorMenuSections = [
  {
    title: 'Manage',
    data: [
      { id: '1', title: 'Profile Data', icon: 'account-outline', color: '#6C63FF' },
      { id: '2', title: 'Appointments', icon: 'calendar-outline', color: '#FF6B6B' },
      { id: '3', title: 'Customer Orders', icon: 'clipboard-text-outline', color: '#40C4FF' },
      { id: '4', title: 'Offline Orders', icon: 'shopping-outline', color: '#4CAF50' },
      { id: '5', title: 'Business Card', icon: 'card-account-details-outline', color: '#FF9800' },
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

const TailorManagement = () => {
  return (
    <Management 
      user={{ name: 'Tailor Manager', email: 'manager@email.com' }} 
      menuSections={tailorMenuSections} 
    />
  );
};

export default TailorManagement;
