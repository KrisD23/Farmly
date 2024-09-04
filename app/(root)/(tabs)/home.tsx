import FarmerCard from "@/components/FarmerCard";
import ProductCard from "@/components/ProductCard";
import * as Location from "expo-location";
import { icons, images } from "@/constants";
import { useLocationStore, useSearchStore } from "@/store";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

const mockData = [
  {
    imageSource: "",
    productName: "Wheat",
    price: "100",
    farmer: "Farmer A",
  },
  {
    imageSource: "",
    productName: "Musturd",
    price: "200",
    farmer: "Farmer B",
  },
  {
    imageSource: "",
    productName: "Product 3",
    price: "300",
    farmer: "Farmer C",
  },
  {
    imageSource: "",
    productName: "Product 4",
    price: "300",
    farmer: "Farmer D",
  },
  // Add more products as needed
];

const Images = {
  cover0: images.cover,
  cover1: images.cover2,
  cover2: images.cover3,
};

export default function Page() {
  // Handling the search bar logic
  const { user } = useUser();
  const [searchText, setSearchText] = useState("");
  const addess = useLocationStore();

  const [hasPermissions, setHasPermissions] = useState(false);
  const { setUserLocation } = useLocationStore();

  const [imageIndex, setImageIndex] = useState(0);
  const currentImage = Images[`cover${imageIndex}`];
  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % 3); // Assuming you have 3 images
    }, 2500); // Change image every 1000 milliseconds (1 second)

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermissions(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
        address: `${address[0].name}, ${address[0].region}`,
      });
    })();
  }, []);

  const handleSearch = () => {
    // Handle search logic here, passing searchText to the function
    console.log("Search text:", searchText);
    useSearchStore.getState().setSearch(searchText);
    setSearchText("");
    router.push("/(root)/find-product");
    console.log(addess);
  };

  const handleChange = (text: string) => {
    setSearchText(text);
  };

  return (
    <View>
      {/* Search bar header */}
      <View className="bg-general-400 h-24">
        <View className="px-4 w-full py-9">
          {/* Search icon */}
          <TextInput
            placeholder="Search"
            className="bg-white h-10 rounded-full px-3"
            value={searchText}
            onChangeText={handleChange}
            onSubmitEditing={handleSearch}
          />
        </View>
      </View>

      <ScrollView className="px-3">
        {/* Deliver to */}
        <View className="flex flex-row items-center  my-2 px-2 space-x-2">
          <Image
            source={icons.point}
            className="w-4 h-4"
            resizeMode="contain"
          />
          <Text className="text-xs capitalize font-JakartaExtraBold">
            Deliver to{" "}
            {user?.firstName ||
              user?.emailAddresses[0].emailAddress.split(`@`)[0]}{" "}
            {addess?.userAddress}
          </Text>
        </View>

        {/* Cover image */}
        <View className="w-full h-[180px] ">
          <Image
            // source={images.cover2}
            source={currentImage}
            className="w-full h-full rounded-2xl"
            resizeMode="cover"
          />
        </View>

        {/* Products Near You */}
        <View className="mt-3">
          <Text className="text-lg mb-1  font-JakartaExtraBold">
            Products Near You :
          </Text>
          <View className="w-full">
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={mockData}
              renderItem={({ item }) => (
                <View className="mr-3">
                  <ProductCard item={item} />
                </View>
              )}
            />
          </View>
        </View>

        {/* Featured Farmers */}
        <View className="mt-3">
          <Text className="text-lg mb-1  font-JakartaExtraBold">
            Featured Farmers:
          </Text>
          <View className="w-full">
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={mockData}
              renderItem={({ item }) => (
                <View className="mr-3">
                  <FarmerCard item={item} />
                </View>
              )}
            />
          </View>
        </View>

        {/* Articles */}
        <View className="mt-10 h-[130px]">
          <Text className="text-xl mb-1  font-JakartaBold"> </Text>
        </View>
      </ScrollView>
    </View>
  );
}
