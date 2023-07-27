import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "..";

export default function Main() {
  // 1. Redux 스토어의 상태(posts 배열)를 가져온다.
  const posts = useSelector((state) => state.posts);

  // 2. Redux 스토어의 액션을 디스패치하는 함수를 가져온다.
  const dispatch = useDispatch();

  // 3. React Router의 navigate 함수를 가져온다.
  const navigate = useNavigate();

  // 4. 해당 게시물의 수정 페이지로 이동
  const handleEditClick = (postId) => {
    navigate(`/edit/${postId}`);
  };

  // 5. 새로운 게시물 추가 페이지로 이동
  const handleCreateClick = () => {
    navigate(`/create`);
  };

  return (
    <>
      <Header />
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            padding: "12px",
          }}
        >
          <button
            onClick={handleCreateClick}
            style={{
              border: "none",
              padding: "8px",
              borderRadius: "6px",
              backgroundColor: "skyblue",
              color: "white",
              cursor: "pointer",
            }}
          >
            추가
          </button>
        </div>

        {/* 6. map 함수를 사용하여 게시물 목록(posts 배열)을 순회하여 게시물 카드를 생성 */}
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              backgroundColor: "#EEEEEE",
              height: "100px",
              borderRadius: "24px",
              marginBottom: "12px",
              display: "flex",
              padding: "12px 16px 12px 16px",
            }}
          >
            <div
              onClick={() => {
                navigate(`/detail/${post.id}`);
              }}
              style={{
                flex: 4,
                borderRight: "1px solid lightgrey",
                cursor: "pointer",
              }}
            >
              <h2>{post.title}</h2>
              <p
                style={{
                  width: "300px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {post.content}
              </p>
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
                justifyContent: "space-around",
                gap: "12px",
              }}
            >
              <div>
                <button
                  onClick={() => handleEditClick(post.id)}
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
                  onClick={() => {
                    dispatch(deletePost(post.id));
                    alert("삭제되었습니다.");
                  }}
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
            </div>
          </div>
        ))}
      </Container>
    </>
  );
}
