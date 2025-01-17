import { createSlice } from "@reduxjs/toolkit";

// 1. createSlice를 사용하여 posts 상태와 관련된 리듀서와 액션 생성자를 생성한다.
let posts = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    deletePost: (state, action) => {
      const postId = action.payload;
      // action.payload로 전달된 postId와 일치하지 않는 게시물만 남기고 새로운 상태를 반환한다.
      return state.filter((post) => post.id !== postId);
    },

    updatePost: (state, action) => {
      const updatedPost = action.payload;
      // action.payload로 전달된 수정된 게시물로 기존 게시물을 교체하여 새로운 상태를 반환한다.
      return state.map((post) => (post.id === updatedPost.id ? updatedPost : post));
    },
    addPost: (state, action) => {
      const newPost = action.payload;
      // action.payload로 전달된 새로운 게시물을 기존 게시물 배열에 추가하여 새로운 상태를 반환한다.
      return [...state, newPost];
    },
  },
});

// 생성된 리듀서로부터 액션 생성자들을 추출한다.
export const { deletePost, updatePost, addPost } = posts.actions;
export default posts.reducer;
