import React, { Fragment } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { validateInputAndAlert } from "../redux/utils/validationUtils";

export default function Edit() {
  const navigate = useNavigate();

  // 동적 변수로 지정한(URL) id를 가져올 수 있다.
  const { id } = useParams();

  const queryClient = useQueryClient();

  // 해당 id의 게시물을 가져오는 React Query 쿼리
  const { data: post } = useQuery(["post", id], async () => {
    const response = await axios.get(`http://localhost:3001/posts/${id}`);
    return response.data;
  });

  // 게시물 수정을 위한 Mutation
  const updateMutation = useMutation(
    async (updatedPost) => {
      await axios.put(`http://localhost:3001/posts/${id}`, updatedPost);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
        window.alert("수정되었습니다.");
        navigate("/");
      },
    }
  );

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const content = e.target.content.value;

    if (validateInputAndAlert(title, content)) {
      return; // 유효성 검사 실패 시 중단
    }

    const updatedPost = { ...post, title, content };

    updateMutation.mutate(updatedPost);
  };

  if (!post) {
    return (
      <Fragment>
        <Header />
        <Container>
          <p>해당 게시물이 존재하지 않습니다.</p>
        </Container>
      </Fragment>
    );
  }

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
              name="title"
              defaultValue={post.title}
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
            />
          </div>
          <div
            style={{
              height: "400px",
            }}
          >
            <textarea
              name="content"
              defaultValue={post.content}
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
