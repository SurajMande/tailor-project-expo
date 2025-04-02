import { saveUserData, getUserData, removeUserData } from "./storageService";

/**
 * User login - Fetch token and store user data
 * @param {string} email
 * @param {string} password
 */
export const login = async (formData) => {
  try {
    const response = await fetch("http://146.235.231.5:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    const { success, message, jwtToken, name, id, accountType, error } = result;

    if (success) {
      await saveUserData(jwtToken, id, accountType);

      return { success: true, id, accountType, message };
    } else {
      return { success: false, message: error || message };
    }
  } catch (err) {
    return { success: false, message: "Network or server error: " + err.message };
  }
};

/**
 * Fetch protected data using stored token
 */
export const fetchProtectedData = async () => {
  const userData = await getUserData();
  if (!userData) return;

  try {
    const response = await fetch("https://your-api.com/protected", {
      method: "GET",
      headers: { Authorization: `Bearer ${userData.token}` },
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching protected data:", error);
  }
};

/**
 * Logout user - Clear stored data
 */
export const logoutUser = async () => {
  await removeUserData();
};

/**
 * Check if user is logged in
 * @returns {Promise<boolean>}
 */
export const isUserLoggedIn = async () => {
  const userData = await getUserData();
  return userData?.token ? true : false;
};
