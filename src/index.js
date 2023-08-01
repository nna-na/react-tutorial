import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// modules/posts.js에서 추출한 posts 리듀서를 가져온다.
import posts from "./redux/modules/posts";

import userReducer from "./redux/modules/user";

// 2. Redux의 configureStore 함수를 사용하여 스토어를 생성한다.
const store = configureStore({
  reducer: {
    posts: posts, // 위에서 생성한 posts 리듀서를 스토어에 등록한다.
    user: userReducer,
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
