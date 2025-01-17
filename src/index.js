import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

// modules/posts.js에서 추출한 posts 리듀서를 가져온다.
import posts from "./redux/modules/posts";

import userReducer from "./redux/modules/user";

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
