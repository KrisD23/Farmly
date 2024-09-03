import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="find-product" options={{ headerShown: false }} />
      <Stack.Screen name="my-earnings" options={{ headerShown: false }} />
    </Stack>
  );
}
