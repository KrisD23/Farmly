import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import { PaymentSheetError, StripeProvider } from "@stripe/stripe-react-native";

import { useStripe } from "@stripe/stripe-react-native";
import { fetchAPI } from "@/lib/fetch";
import { useUser } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";
import { images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
const Cart = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [success, setSuccess] = useState(false);

  const { user } = useUser();
  const fullName = user?.fullName;
  const email = user?.emailAddresses[0].emailAddress!;
  const amount = 10000;

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Farmly Inc.",
      intentConfiguration: {
        mode: {
          amount: parseInt(amount) * 100,
          currencyCode: "usd",
        },
        confirmHandler: async (paymentMethod, _, intentCreationCallback) => {
          const { paymentIntent, customer } = await fetchAPI(
            "/(api)/(stripe)/create",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: fullName || email.split("@")[0],
                email: email,
                amount: amount,
                paymentMethodId: paymentMethod.id,
              }),
            }
          );

          if (paymentIntent.client_secret) {
            const { result } = await fetchAPI("/(api)/(stripe)/pay", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                payment_intent_id: paymentIntent.id,
                payment_method_id: paymentMethod.id,
                customer_id: customer,
              }),
            });
            if (result.client_secret) {
              // what to do after payment
              console.log("PAyment done");
              intentCreationCallback({ clientSecret: result.client_secret });
            }
          }
        },
      },
      returnURL: "myapp://payment-sheet-return",
    });
    if (error) {
      console.log(error);
    }
  };

  const openPaymentSheet = async () => {
    await initializePaymentSheet();
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code : ${error.code}`, error.message);
    } else {
      setSuccess(true);
    }
  };

  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
      merchantIdentifier="merchant.farmly.com" // required for Apple Pay
      urlScheme="myapp" // required for 3D Secure and bank redirects
    >
      <SafeAreaView>
        <TouchableOpacity onPress={openPaymentSheet}>
          <Text>Checkout</Text>
        </TouchableOpacity>

        <ReactNativeModal
          isVisible={success}
          onBackdropPress={() => setSuccess(false)}
        >
          <View className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
            <Image source={images.check} className="w-28 h-28 mt-5" />
            <Text className="text-2xl text-center font-JakartaBold mt-5">
              Payment Successful
            </Text>
            <Text className="text-md text-general-200 font-JakartaRegular text-center mt-3">
              Thank you for shopping with us
            </Text>
            <CustomButton
              title="Back Home"
              onPress={() => {
                setSuccess(false);
                router.push("/(root)/(tabs)/home");
              }}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
      </SafeAreaView>
    </StripeProvider>
  );
};

export default Cart;
