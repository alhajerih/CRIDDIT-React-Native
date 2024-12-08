import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ModalContext from "../../context/ModalContext";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Home from "../../screens/Home";
import Posts from "../../screens/Posts";
import PostDetailes from "../../screens/PostDetailes";

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  const { setModalVisible } = useContext(ModalContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#f9e3b" },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Posts"
        component={Posts}
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => setModalVisible(true)}
              >
                <FontAwesome6 name="add" size={24} color="black" />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name="PostsDetailes"
        component={PostDetailes}
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => setModalVisible(true)}
              >
                <FontAwesome6 name="add" size={24} color="black" />
              </TouchableOpacity>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;

const styles = StyleSheet.create({});
