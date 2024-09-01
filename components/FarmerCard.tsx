import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { images } from "@/constants";

const FarmerCard = ({ item }: any) => {
  return (
    <View className="flex flex-col">
      <Image
        source={images.farmer}
        className="h-[150px] w-[150px] rounded-2xl"
      />

      <Text className="text-md font-JakartaBold text-center">
        {item.farmer}
      </Text>
    </View>
  );
};

export default FarmerCard;

const styles = StyleSheet.create({
  productCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  productImage: {
    borderRadius: 10,

    width: 180,
    height: 180,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
  },
  farmerName: {
    fontSize: 14,
    color: "gray",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
