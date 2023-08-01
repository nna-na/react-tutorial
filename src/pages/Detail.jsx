import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../redux/modules/posts";
import { RenderIfLoggedIn } from "../redux/modules/renderUtils";
import { checkUserAuthorization } from "../redux/modules/authUtils";

export default function Detail() {
  const posts = useSelector((state) => state.posts);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  // 게시물을 아이디로 조회합니다.
  const post = posts.find((post) => post.id === id);

  // 게시물이 존재하지 않는 경우 처리
  if (!post) {
    return <div>존재하지 않는 게시물입니다.</div>;
  }

  // 해당 게시물의 수정 페이지로 이동 (수정 버튼 클릭 시 호출)
  const handleEditClick = () => {
    if (isLoggedIn) {
      if (checkUserAuthorization(user, post.author, navigate)) {
        navigate(`/edit/${post.id}`);
      }
    }
  };

  // 해당 게시물 삭제 (삭제 버튼 클릭 시 호출)
  const handleDelete = () => {
    if (isLoggedIn) {
      if (checkUserAuthorization(user, post.author, navigate)) {
        const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
        if (confirmDelete) {
          dispatch(deletePost(post.id));
          navigate("/");
          alert("삭제되었습니다.");
        }
      }
    }
  };

  return (
    <>
      <Header />
      <Container>
        <h1
          style={{
            border: "1px solid lightgray",
            borderRadius: "12px",
            padding: "12px",
          }}
        >
          {post.title}
        </h1>
        <div
          style={{
            height: "400px",
            border: "1px solid lightgray",
            borderRadius: "12px",
            padding: "12px",
          }}
        >
          {post.content}
        </div>
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <RenderIfLoggedIn isLoggedIn={isLoggedIn}>
            <button
              onClick={handleEditClick}
              style={{
                border: "none",
                padding: "8px",
                borderRadius: "6px",
                backgroundColor: "orange",
                color: "white",
                cursor: "pointer",
                marginRight: "6px",
              }}
            >
              수정
            </button>
          </RenderIfLoggedIn>
          <RenderIfLoggedIn isLoggedIn={isLoggedIn}>
            <button
              onClick={handleDelete}
              style={{
                border: "none",
                padding: "8px",
                borderRadius: "6px",
                backgroundColor: "red",
                color: "white",
                cursor: "pointer",
              }}
            >
              삭제
            </button>
          </RenderIfLoggedIn>
        </div>
      </Container>
    </>
  );
}
