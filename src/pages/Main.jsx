import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";
import { useSelector } from "react-redux";
import { RenderIfLoggedIn } from "../redux/modules/renderUtils";
import { checkUserAuthorization } from "../redux/modules/authUtils";
import { useAuthenticationEffect } from "../redux/utils/useAuthenticationEffect";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

export default function Main() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.user);
  useAuthenticationEffect();

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery("posts", async () => {
    const response = await axios.get("http://localhost:3001/posts");
    return response.data;
  });

  const handleCreateClick = () => {
    if (isLoggedIn) {
      navigate("/create");
    } else {
      alert("로그인이 필요한 기능입니다.");
      navigate("/login");
    }
  };

  const handleEditClick = (postId) => {
    const selectedPost = data.find((post) => post.id === postId);
    if (isLoggedIn) {
      const postAuthor = selectedPost.author;

      if (checkUserAuthorization(isLoggedIn, user, postAuthor, navigate)) {
        navigate(`/edit/${postId}`);
      }
    }
  };

  const deleteMutation = useMutation(
    async (postId) => {
      await axios.delete(`http://localhost:3001/posts/${postId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
      },
    }
  );

  const handleDelete = (postId) => {
    const selectedPost = data.find((post) => post.id === postId);

    if (isLoggedIn) {
      const postAuthor = selectedPost.author;

      if (checkUserAuthorization(isLoggedIn, user, postAuthor, navigate)) {
        const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
        if (confirmDelete) {
          deleteMutation.mutate(postId);
          alert("삭제되었습니다.");
        }
      }
    }
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
          <RenderIfLoggedIn isLoggedIn={isLoggedIn}>
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
          </RenderIfLoggedIn>
        </div>

        {isLoading ? (
          <div>로딩중입니다</div>
        ) : isError ? (
          <div>{error.message}</div>
        ) : (
          data.map((post) => (
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
                <h2>{post?.title}</h2>
                <p
                  style={{
                    width: "300px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {post?.content}
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
                  {post?.author || (user && user.uid)}
                  <br />
                  <br />
                  {isLoggedIn && user.email === post.author && (
                    <>
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
                        onClick={() => handleDelete(post.id)}
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
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </Container>
    </>
  );
}
