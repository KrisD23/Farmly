import { images } from "@/constants";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const { user } = useUser();
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    // Handle search logic here, passing searchText to the function
    console.log("Search text:", searchText);
  };

  const handleChange = (text: string) => {
    setSearchText(text);
  };

  return (
    <SafeAreaView>
      {/* Header */}
      <View className="flex flex-row items-center  my-2 px-2 space-x-2">
        <Image source={images.appLogo} className="w-7 h-7" />
        <Text className="text-md capitalize font-JakartaExtraBold">
          Welcome{" "}
          {user?.firstName ||
            user?.emailAddresses[0].emailAddress.split(`@`)[0]}
        </Text>
      </View>

      {/* sub header */}

      <View className=" py-1 px-3 w-full h-[350px] ">
        <TextInput
          placeholder="Search"
          className="bg-white h-12 rounded-full px-3"
          value={searchText}
          onChangeText={handleChange}
          onSubmitEditing={handleSearch} // Trigger search on Enter press
        />
      </View>
    </SafeAreaView>
  );
}
