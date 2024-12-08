import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ModalContext from "./src/context/ModalContext";
import HomeNavigation from "./src/navigation/HomeNav/HomeNavigation";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const queryClient = new QueryClient();
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <ModalContext.Provider value={{ modalVisible, setModalVisible }}>
          <HomeNavigation />
        </ModalContext.Provider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
