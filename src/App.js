import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useState } from "react";
import { nanoid } from "nanoid";

export default function App() {
  // useState를 사용하여 posts 배열과 setPosts 함수를 정의한다.
  const [posts, setPosts] = useState([
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
  ]);

  const handleDeleteClick = (postId) => {
    // 주어진 postId에 해당하는 게시물을 posts 배열에서 필터링하여 제외
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    window.alert("삭제되었습니다.");
  };

  return (
    // 페이지 이동에 사용되는 Route 태그를 위해선 Routes로 먼저 감싸야 한다.
    <Routes>
      {/* path="/"이기 때문에 '<주소>/'인 주소로 접속할 경우 Main 컴포넌트가 화면에 보여지게 된다.  */}
      <Route path="/" element={<Main posts={posts} setPosts={setPosts} handleDeleteClick={handleDeleteClick} />} />
      <Route path="/detail/:id" element={<Detail posts={posts} setPosts={setPosts} handleDeleteClick={handleDeleteClick} />} />
      <Route path="/create" element={<Create posts={posts} setPosts={setPosts} />} />
      <Route path="/edit/:id" element={<Edit posts={posts} setPosts={setPosts} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
