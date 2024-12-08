import { View, Text, Modal, TextInput, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import ModalContext from "../src/context/ModalContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "../src/api/posts/postsApi";

const AddComment = ({ postId }) => {
  const { modalVisible, setModalVisible } = useContext(ModalContext);
  const [commentInfo, setCommentInfo] = useState({ username: "", comment: "" });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ postId, username, comment }) => {
      console.log("Mutation Function - Received Data:", {
        postId,
        username,
        comment,
      }); // Debug log
      return addComment(postId, { username, comment }); // Call API with proper arguments
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["PostDetail", postId]); // Refresh post details
      setModalVisible(false); // Close modal
      setCommentInfo({ username: "", comment: "" }); // Reset form
    },
    onError: (error) => {
      console.error("Error adding comment:", error);
    },
  });

  const handleAddComment = () => {
    if (!commentInfo.username || !commentInfo.comment) {
      alert("Please fill out all fields.");
      return;
    }

    const { username, comment } = commentInfo;
    console.log("Sending Comment Data:", { postId, username, comment }); // Debug log
    mutation.mutate({ postId, username, comment }); // Pass data directly
  };

  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            gap: 10,
            width: "90%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ fontWeight: "bold" }}>Close</Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}
          >
            Add Comment
          </Text>
          <TextInput
            placeholder="Username"
            style={{ padding: 10, borderWidth: 1, borderRadius: 10 }}
            value={commentInfo.username}
            onChangeText={(value) =>
              setCommentInfo((prev) => ({ ...prev, username: value }))
            }
          />
          <TextInput
            placeholder="Comment"
            style={{ padding: 10, borderWidth: 1, borderRadius: 10 }}
            value={commentInfo.comment}
            onChangeText={(value) =>
              setCommentInfo((prev) => ({ ...prev, comment: value }))
            }
          />
          <TouchableOpacity
            style={{
              padding: 10,
              borderRadius: 10,
              backgroundColor: "#4ade80",
              alignItems: "center",
            }}
            onPress={handleAddComment}
          >
            <Text style={{ fontWeight: "bold" }}>
              {mutation.isLoading ? "Adding..." : "Add Comment"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddComment;
