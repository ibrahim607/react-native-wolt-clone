import { Nunito_400Regular, Nunito_700Bold, Nunito_900Black } from "@expo-google-fonts/nunito";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient();

/**
 * Root layout component that loads Nunito fonts and provides gesture handling and React Query context for routed content.
 *
 * @returns The root React element: a GestureHandlerRootView containing a QueryClientProvider with a Slot, or `null` while fonts are loading.
 */
export default function RootLayout() {
  let fontsLoaded = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_900Black,
  })

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Slot />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}