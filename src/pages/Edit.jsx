import React, { Fragment } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Edit({ posts, setPosts }) {
  const navigate = useNavigate();

  // 동적 변수로 지정한(URL) id를 가져올 수 있다.
  const { id } = useParams();

  // id에 해당하는 게시물을 찾아옴
  const postId = parseInt(id);
  const post = posts.find((post) => post.id === postId);

  // state를 사용하여 기본값 설정
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handleEditSubmit = (e) => {
    e.preventDefault();

    // post 객체의 모든 속성, title, content를 객체에 추가
    const updatedPost = { ...post, title, content };

    // posts 배열을 순회하면서 새로운 배열 생성
    // 현재 순회 중인 'p' 객체의 'id'가 수정할 게시물 post.id와 일치하면 수정된 게시물로 교체
    // 일치하지 않는 경우 'p' 객체 그대로 유지
    const updatedPosts = posts.map((p) => (p.id === post.id ? updatedPost : p));

    // 기존의 posts 배열이 수정된 게시물 목록으로 업데이트
    setPosts(updatedPosts);

    // 수정 후 자동으로 메인페이지로 이동
    navigate("/");
  };

  return (
    <Fragment>
      <Header />
      <Container>
        <form
          style={{
            height: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
          onSubmit={handleEditSubmit}
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
              // input 값이 변경되면 state 업데이트
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              // textarea 값이 변경되면 state 업데이트
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button
            style={{
              width: "100%",
              height: "40px",
              border: "none",
              color: "white",
              borderRadius: "12px",
              backgroundColor: "orange",
              cursor: "pointer",
            }}
          >
            수정하기
          </button>
        </form>
      </Container>
    </Fragment>
  );
}
