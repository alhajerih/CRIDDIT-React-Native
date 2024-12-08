import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f9e3be",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Welcome to the Posts
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: "#4ade80",
          padding: 10,
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate("Posts")}
      >
        <Text style={{ fontWeight: "bold" }}>View Posts</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
