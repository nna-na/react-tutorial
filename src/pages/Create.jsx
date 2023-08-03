import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { validateInputAndAlert } from "../redux/utils/validationUtils";

export default function Create() {
  const queryClient = useQueryClient(); // QueryClient 인스턴스 생성
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.user);

  // useMutation을 통해 새로운 데이터 추가 기능을 설정
  const addData = useMutation(
    async (newData) => {
      // axios를 사용하여 POST 요청을 보냄
      await axios.post("http://localhost:3001/posts", newData);
    },
    {
      onSuccess: () => {
        // 데이터 추가 성공 시, "posts" 쿼리를 다시 불러오기 위해 invalidateQueries 호출
        queryClient.invalidateQueries("posts");
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;

    if (validateInputAndAlert(title, content)) {
      return; // 유효성 검사 실패 시 중단
    }

    let author;

    if (isLoggedIn && user) {
      author = user.email || user.uid;
    } else {
      author = "익명";
    }

    const newData = {
      title: title,
      content: content,
      author: author,
    };

    // addData.mutate를 사용하여 새로운 데이터 추가 요청 보내기
    try {
      addData.mutate(newData);
      // 추가 후 메인 페이지로 이동
      navigate("/");
    } catch (error) {
      console.error("Error adding data:", error);
    }
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
          onSubmit={handleSubmit}
        >
          <div>
            <input
              name="title"
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
