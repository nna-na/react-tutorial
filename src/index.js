import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { configureStore, createSlice, nanoid } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// 1. createSlice를 사용하여 posts 상태와 관련된 리듀서와 액션 생성자를 생성한다.
let posts = createSlice({
  name: "posts",
  initialState: [
    {
      id: nanoid(),
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      content: "Pellentesque a purus sapien. Sed est sapien, dignissim eu bibendum at, dictum eget tellus. Vestibulum orci dolor, mollis in iaculis sed, iaculis quis tellus. Ut ultrices felis vel orci finibus mollis.",
      author: "작성자1",
    },
    {
      id: nanoid(),
      title: "Nullam iaculis rutrum mauris, nec fringilla turpis dapibus ac.",
      content: "Pellentesque sit amet tortor et lectus viverra hendrerit ut quis nunc. Nullam a pharetra sapien. Cras eget risus nunc. Ut tincidunt massa at tortor mattis congue.",
      author: "작성자2",
    },
    {
      id: nanoid(),
      title: "Nam facilisis dui nec nulla porta, sit amet pretium leo lacinia.",
      content: "Praesent nec facilisis quam. Aenean ac eros mi. Aliquam at odio eget nibh auctor mattis. Praesent ac justo feugiat, blandit justo quis, lobortis purus.",
      author: "작성자3",
    },
  ],
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

// 2. Redux의 configureStore 함수를 사용하여 스토어를 생성한다.
const store = configureStore({
  reducer: {
    posts: posts.reducer, // 위에서 생성한 posts 리듀서를 스토어에 등록한다.
  },
});

// 3. ReactDOM.createRoot를 사용하여 루트 컴포넌트를 렌더링한다.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* 4. Redux의 스토어를 전역으로 제공하기 위해 Provider로 App을 감싸준다. */}
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
