import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";
import { nanoid } from "nanoid";

export default function Create({ posts, setPosts }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddClick = () => {
    // 새로운 게시물 객체 생성
    const newPost = {
      id: nanoid(),
      title: title,
      content: content,
      author: "",
    };

    // 기존 게시물 배열에 새로운 게시물 추가
    setPosts([...posts, newPost]);

    // 추가 후 메인 페이지로 이동
    navigate("/");
  };

  return (
    <>
      <Header />
      <Container>
        <form
          style={{
            height: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            handleAddClick(); // 폼 제출 시 handleAddClick 함수 호출
          }}
        >
          <div>
            <input
              placeholder="제목"
              style={{
                width: "100%",
                height: "60px",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid lightgrey",
                padding: "8px",
                boxSizing: "border-box",
              }}
              value={title}
              onChange={(e) => setTitle(e.target.value)} // 입력한 제목 업데이트
            />
          </div>
          <div
            style={{
              height: "400px",
            }}
          >
            <textarea
              placeholder="내용"
              style={{
                resize: "none",
                height: "100%",
                width: "100%",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid lightgrey",
                padding: "12px",
                boxSizing: "border-box",
              }}
              value={content}
              onChange={(e) => setContent(e.target.value)} // 입력한 내용 업데이트
            />
          </div>
          <button
            style={{
              width: "100%",
              height: "40px",
              border: "none",
              color: "white",
              borderRadius: "12px",
              backgroundColor: "skyblue",
              cursor: "pointer",
            }}
            type="submit" // 버튼 클릭 시 폼 제출
          >
            추가하기
          </button>
        </form>
      </Container>
    </>
  );
}
