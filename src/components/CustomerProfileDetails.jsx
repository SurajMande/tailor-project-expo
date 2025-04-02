import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ProfileDetails from "./ProfileDetails";

const CustomerProfileDetails = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    fullName: "John Doe",
    email: "john.doe@email.com",
    phoneNumber: "9876543210",
  });

  const fields = [
    { icon: "person", field: "fullName", label: "Full Name" },
    { icon: "email", field: "email", label: "Email" },
    { icon: "phone", field: "phoneNumber", label: "Phone Number" },
  ];

  return (
    <ProfileDetails
      navigation={navigation}
      userData={userData}
      setUserData={setUserData}
      profileType="Customer"
      fields={fields}
    />
  );
};

export default CustomerProfileDetails;
