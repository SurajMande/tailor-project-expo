import * as SecureStore from 'expo-secure-store';

/**
 * Save user data securely
 * @param {string} token - JWT token
 * @param {string} id - User ID
 * @param {string} accountType - Account type (e.g., Tailor, Customer)
 */
export const saveUserData = async (token, id, accountType) => {
  try {
    const userData = { token, id, accountType };
    await SecureStore.setItemAsync('userData', JSON.stringify(userData));
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

/**
 * Retrieve user data securely
 * @returns {Promise<object|null>} - User data object or null if not found
 */
export const getUserData = async () => {
  try {
    const data = await SecureStore.getItemAsync('userData');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
};

/**
 * Remove user data securely (Logout)
 */
export const removeUserData = async () => {
  try {
    await SecureStore.deleteItemAsync('userData');
  } catch (error) {
    console.error('Error removing user data:', error);
  }
};
