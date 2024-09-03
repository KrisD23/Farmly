import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const MyAccount = () => {
  return (
    <SafeAreaView className="px-3">
      <Text>Hello Ankit</Text>

      <TouchableOpacity
        onPress={() => {
          console.log("hello");
        }}
      >
        <Text>My Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.navigate("/(root)/my-earnings");
        }}
      >
        <Text>My Earnings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log("hello");
        }}
      >
        <Text>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          console.log("hello");
        }}
      >
        <Text>Chats</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MyAccount;
