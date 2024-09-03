import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const MyEarnings = () => {
  return (
    <SafeAreaView>
      <Text>MyEarnings</Text>
      <TouchableOpacity onPress={() => router.push("/(root)/list-product")}>
        <Text>List a product</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MyEarnings;
