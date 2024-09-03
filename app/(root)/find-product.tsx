import { View, Text } from "react-native";
import React from "react";
import { useSearchStore } from "@/store";
import { SafeAreaView } from "react-native-safe-area-context";

const FindProduct = () => {
  const userSearch = useSearchStore((state) => state.search);
  return (
    <SafeAreaView>
      <Text>U searched for {userSearch}</Text>
    </SafeAreaView>
  );
};

export default FindProduct;
