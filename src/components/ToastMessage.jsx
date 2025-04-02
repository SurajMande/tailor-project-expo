import { Text, View } from 'react-native'
import React from 'react'

const ToastMessage = ({ text1, text2, backgroundColor }) => {
    return (
      <View
        style={{
          backgroundColor,
          paddingVertical: 14,
          paddingHorizontal: 20,
          borderRadius: 10,
          alignSelf: "center",
          width: "80%",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: 200, // Moves toast to the middle of the screen
          zIndex: 9999,
        }}
      >
        <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
          {text1}
        </Text>
        {text2 ? (
          <Text style={{ color: "white", fontSize: 12, textAlign: "center" }}>
            {text2}
          </Text>
        ) : null}
      </View>
    );
  };
  
  export default ToastMessage;