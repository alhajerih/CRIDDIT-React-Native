import axios from "axios";
import instance from "./index";

const getPosts = async () => {
  const response = await instance.get("/posts");
  // console.log("From the API side ", response.data);
  return response.data;
};

const addPost = async (newPost) => {
  const response = await instance.post("/posts", newPost);
  return response.data;
};

const getPostById = async (id) => {
  const response = await instance.get(`/posts/${id}`);
  return response.data;
};

const addComment = async (postId, username, comment) => {
  console.log("API Function - Received Data:", postId, username, comment); // Debug log
  const response = await instance.post(
    `/posts/${postId}/comments`,
    username,
    comment
  );
  return response.data;
};

const deletePost = async (id) => {
  const response = await instance.delete(`/posts/${id}`);
  return response.data;
};

const deleteComment = async (id) => {
  const response = await instance.delete(`/posts/comments/${id}`);
  return response.data;
};
export {
  getPosts,
  addPost,
  getPostById,
  addComment,
  deletePost,
  deleteComment,
};
