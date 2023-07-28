import React, { Fragment } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../redux/modules/posts";

export default function Edit() {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 동적 변수로 지정한(URL) id를 가져올 수 있다.
  const { id } = useParams();

  // id에 해당하는 게시물을 찾아온다.
  const post = posts.find((post) => post.id === id);

  const handleEditSubmit = (e) => {
    e.preventDefault();

    // state를 사용하여 기본값 설정
    const title = e.target.title.value;
    const content = e.target.content.value;

    // post 객체의 모든 속성, title, content를 객체에 추가
    const updatedPost = { ...post, title, content };

    // updatePost 액션을 디스패치하여 리덕스 스토어의 상태를 업데이트한다.
    dispatch(updatePost(updatedPost));

    // 수정 완료 알림창
    window.alert("수정되었습니다.");

    // 수정 후 자동으로 메인페이지로 이동
    navigate("/");
  };

  // post가 존재하지 않는 경우, 메시지를 화면에 표시하도록 처리
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
              defaultValue={post.title} // 기존 데이터의 title 설정
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
              defaultValue={post.content} // 기존 데이터의 content 설정
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
