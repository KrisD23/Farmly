import { View, Text, Touchable, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";

import { SafeAreaView } from "react-native-safe-area-context";

const Cart = () => {
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => console.log("hello")}>
        <Text>Checkout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Cart;
