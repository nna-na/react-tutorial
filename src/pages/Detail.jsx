import React from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Detail({ posts, handleDeleteClick }) {
  const navigate = useNavigate();

  const { id } = useParams();

  const post = posts.find((post) => post.id === id);

  const handleEditClick = () => {
    navigate(`/edit/${post.id}`);
  };

  // 상위 컴포넌트에서 전달된 handleDeleteClick 함수 호출
  const handleDelete = () => {
    handleDeleteClick(post.id);
    // 삭제 후, 메인 페이지로 이동하도록 처리
    navigate("/");
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
          <button
            onClick={() => {
              navigate(handleEditClick);
            }}
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
        </div>
      </Container>
    </>
  );
}
