import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePost, getPosts } from "../api/posts/postsApi";
import { useNavigation } from "@react-navigation/native";
import AddPost from "../../components/AddPost";

const Posts = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ["PostsList"],
    queryFn: getPosts,
  });

  const mutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["PostsList"]);
      Alert.alert("Success", "Post has been deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting post:", error);
      Alert.alert("Error", "Could not delete the post. Please try again.");
    },
  });

  const handleDeletePost = (id) => {
    mutation.mutate(id);
  };

  // Display loading state
  if (isFetching) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Handle case when no data is available
  if (isSuccess && (!data || data.length === 0)) {
    return (
      <View style={styles.centered}>
        <Text>No posts available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("PostsDetailes", { id: item.id })
            }
          >
            <View style={styles.postItem}>
              <Text style={styles.postId}>ID: {item.id}</Text>
              <Text style={styles.postTitle}>Title: {item.title}</Text>
              <Text style={styles.postDescription}>
                Description: {item.description}
              </Text>
              <Button
                title="delete Post"
                onPress={() => handleDeletePost(item.id)}
              />
            </View>
          </TouchableOpacity>
        )}
      />
      <AddPost />
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  postItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  postId: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
    marginTop: 4,
  },
  postDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
