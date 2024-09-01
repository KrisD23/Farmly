import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { images } from "@/constants";

const ProductCard = ({ item }: any) => {
  return (
    <View className="flex flex-col">
      <Image
        source={images.onboarding1}
        className="h-[150px] w-[150px] rounded-2xl"
      />

      <Text className="text-md font-JakartaBold text-center">
        {item.productName}
      </Text>
      <Text className="text-[10px] font-JakartaBold text-center">
        Rs. {item.price}/kg
      </Text>
      <Text className="text-[10px] font-JakartaBold text-center">
        {item.farmer}
      </Text>
    </View>
  );
};

export default ProductCard;
