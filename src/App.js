import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useState } from "react";

export default function App() {
  // useState를 사용하여 posts 배열과 setPosts 함수를 정의한다.
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "첫 번째 게시물",
      content: "첫 번째 게시물 내용입니다.",
    },
    {
      id: 2,
      title: "두 번째 게시물",
      content: "두 번째 게시물 내용입니다.",
    },
    {
      id: 3,
      title: "세 번째 게시물",
      content: "세 번째 게시물 내용입니다.",
    },
  ]);

  return (
    // 페이지 이동에 사용되는 Route 태그를 위해선 Routes로 먼저 감싸야 한다.
    <Routes>
      {/* path="/"이기 때문에 '<주소>/'인 주소로 접속할 경우 Main 컴포넌트가 화면에 보여지게 된다.  */}
      <Route path="/" element={<Main posts={posts} setPosts={setPosts} />} />
      <Route path="/detail/:id" element={<Detail posts={posts} setPosts={setPosts} />} />
      <Route path="/create" element={<Create posts={posts} setPosts={setPosts} />} />
      <Route path="/edit/:id" element={<Edit posts={posts} setPosts={setPosts} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
