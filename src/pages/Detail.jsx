import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";
import { useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { checkUserAuthorization } from "../redux/modules/authUtils";
import { RenderIfLoggedIn } from "../redux/modules/renderUtils";

export default function Detail() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.user);

  const { id } = useParams();

  const queryClient = useQueryClient();

  // 해당 id의 게시물을 가져오는 React Query 쿼리
  const { data: post } = useQuery(["post", id], async () => {
    const response = await axios.get(`http://localhost:3001/posts/${id}`);
    return response.data;
  });

  // 게시물 삭제를 위한 Mutation
  const deleteMutation = useMutation(
    async () => {
      await axios.delete(`http://localhost:3001/posts/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
        alert("삭제되었습니다.");
        navigate("/");
      },
    }
  );

  const handleDelete = () => {
    if (isLoggedIn && checkUserAuthorization(isLoggedIn, user, post?.author, navigate)) {
      const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
      if (confirmDelete) {
        deleteMutation.mutate();
      }
    }
  };

  if (!post) {
    return <div>존재하지 않는 게시물입니다.</div>;
  }

  const isUserAuthor = user?.email === post?.author;

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
            {isUserAuthor && (
              <>
                <button
                  onClick={() => navigate(`/edit/${post.id}`)}
                  style={{
                    border: "none",
                    padding: "8px",
                    borderRadius: "6px",
                    backgroundColor: "orange",
                    color: "white",
                    cursor: "pointer",
                    marginRight: "6px",
                    display: isUserAuthor ? "block" : "none",
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
                    display: isUserAuthor ? "block" : "none",
                  }}
                >
                  삭제
                </button>
              </>
            )}
          </RenderIfLoggedIn>
        </div>
      </Container>
    </>
  );
}
