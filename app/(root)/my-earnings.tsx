import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const MyEarnings = () => {
  return (
    <SafeAreaView>
      <Text>MyEarnings</Text>
      <TouchableOpacity onPress={() => console.log("hello")}>
        <Text>List a product</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MyEarnings;
