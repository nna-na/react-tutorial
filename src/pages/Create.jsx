import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../redux/modules/posts";

export default function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.user);

  const handleAddClick = (title, content, author) => {
    // 새로운 게시물 객체 생성
    const newPost = {
      id: nanoid(),
      title: title,
      content: content,
      author: author,
    };

    // addPost 액션을 dispatch하여 새로운 게시물을 추가
    dispatch(addPost(newPost));

    // 추가 후 메인 페이지로 이동
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 이벤트 객체(e)의 target 속성을 통해 입력 폼의 title(input)과 content(textarea) 요소에 접근하여
    // 사용자가 입력한 값을 가져오는 부분
    const title = e.target.title.value;
    const content = e.target.content.value;
    let author;

    if (isLoggedIn && user) {
      // 사용자가 로그인한 경우, 사용자의 이메일 주소 또는 ID를 author에 저장
      author = user.email || user.uid;
    } else {
      // 사용자가 로그인하지 않은 경우, "익명"으로 설정
      author = "익명";
    }

    handleAddClick(title, content, author); // 폼 제출 시 handleAddClick 함수 호출
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
