import { Alert, Button, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteComment, getPostById } from "../api/posts/postsApi";
import AddComment from "../../components/addComment";

const PostDetailes = () => {
  const route = useRoute();
  const { id } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const queryClient = useQueryClient();

  const { data, isFetching, isError } = useQuery({
    queryKey: ["PostDetail", id],
    queryFn: () => getPostById(id),
  });

  const mutation = useMutation({
    mutationFn: (id) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["PostDetail", id]);
      Alert.alert("Success", "Comment has been deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting comment:", error);
      Alert.alert("Error", "Could not delete the comment. Please try again.");
    },
  });

  const handleDeleteComment = (id) => {
    mutation.mutate(id);
  };

  if (isFetching) {
    return (
      <View style={styles.centered}>
        <Text>Loading post details...</Text>
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={styles.centered}>
        <Text>Error fetching post details.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AddComment
        postId={id}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <Text style={styles.title}>Post Details</Text>
      <View style={styles.postContainer}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{data.id}</Text>
        <Text style={styles.label}>Title:</Text>
        <Text style={styles.value}>{data.title}</Text>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>{data.description}</Text>

        <Text style={styles.label}>Comments:</Text>
        {data.comments && data.comments.length > 0 ? (
          <FlatList
            data={data.comments}
            keyExtractor={(item) => item.id.toString()} // Ensure id is a string
            renderItem={({ item }) => (
              <View style={styles.commentItem}>
                <Text style={styles.commentId}>ID: {item.id}</Text>
                <Text style={styles.commentUsername}>
                  Username: {item.username}
                </Text>
                <Text style={styles.commentText}>Comment: {item.comment}</Text>
                <Button
                  title="delete comment"
                  onPress={() => handleDeleteComment(item.id)}
                />
              </View>
            )}
          />
        ) : (
          <Text style={styles.value}>No comments available.</Text>
        )}
      </View>
    </View>
  );
};

export default PostDetailes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  postContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
    color: "#555",
  },
  value: {
    fontSize: 16,
    marginBottom: 12,
    color: "#333",
  },
  commentItem: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  commentId: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#555",
  },
  commentUsername: {
    fontSize: 14,
    color: "#333",
  },
  commentText: {
    fontSize: 14,
    color: "#666",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
