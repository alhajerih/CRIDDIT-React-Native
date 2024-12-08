import { View, Text, Modal, TextInput, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import ModalContext from "../src/context/ModalContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPost } from "../src/api/posts/postsApi";

const AddPost = () => {
  const { modalVisible, setModalVisible } = useContext(ModalContext);
  const [postInfo, setPostInfo] = useState({ title: "", description: "" });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newPost) => addPost(newPost),
    onSuccess: () => {
      // Invalidate and refetch posts after adding a new one
      queryClient.invalidateQueries(["PostsList"]);
      setModalVisible(false);
      setPostInfo({ title: "", description: "" });
    },
    onError: (error) => {
      console.error("Error adding post:", error);
    },
  });

  const handleAddPost = () => {
    if (!postInfo.title || !postInfo.description) {
      alert("Please fill out all fields.");
      return;
    }
    mutation.mutate(postInfo);
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
            Add Post
          </Text>
          <TextInput
            placeholder="Post title"
            style={{ padding: 10, borderWidth: 1, borderRadius: 10 }}
            value={postInfo.title}
            onChangeText={(value) =>
              setPostInfo((prev) => ({ ...prev, title: value }))
            }
          />
          <TextInput
            placeholder="Post description"
            style={{ padding: 10, borderWidth: 1, borderRadius: 10 }}
            value={postInfo.description}
            onChangeText={(value) =>
              setPostInfo((prev) => ({ ...prev, description: value }))
            }
          />
          <TouchableOpacity
            style={{
              padding: 10,
              borderRadius: 10,
              backgroundColor: "#4ade80",
              alignItems: "center",
            }}
            onPress={handleAddPost}
          >
            <Text style={{ fontWeight: "bold" }}>
              {mutation.isLoading ? "Adding..." : "Add Post"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddPost;
