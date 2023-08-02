import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../redux/modules/posts";
import { RenderIfLoggedIn } from "../redux/modules/renderUtils";
import { checkUserAuthorization } from "../redux/modules/authUtils";
import { useAuthenticationEffect } from "../redux/modules/useAuthenticationEffect";

export default function Main() {
  // Redux 스토어의 상태(posts 배열)를 가져온다.
  const posts = useSelector((state) => state.posts);

  // Redux 스토어의 사용자 로그인 상태 및 사용자 정보를 가져온다.
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.user);

  // Redux 스토어의 액션을 디스패치하는 함수를 가져온다.
  const dispatch = useDispatch();

  // React Router의 navigate 함수를 가져온다.
  const navigate = useNavigate();

  useAuthenticationEffect();

  // 새로운 게시물 추가 페이지로 이동
  const handleCreateClick = () => {
    if (isLoggedIn) {
      // 로그인 상태일 경우 추가 버튼 동작
      navigate("/create");
    } else {
      // 로그인 상태가 아닐 경우 알림 창 표시
      alert("로그인이 필요한 기능입니다.");
      // 로그인 페이지로 이동하도록 코드 추가
      navigate("/login");
    }
  };

  // 4. 해당 게시물의 수정 페이지로 이동 (수정 버튼 클릭 시 호출)
  const handleEditClick = (postId) => {
    const selectedPost = posts.find((post) => post.id === postId);

    if (isLoggedIn) {
      const postAuthor = selectedPost.author;

      if (checkUserAuthorization(isLoggedIn, user, postAuthor, navigate)) {
        navigate(`/edit/${postId}`);
      }
    }
  };

  // 해당 게시물 삭제 (삭제 버튼 클릭 시 호출)
  const handleDelete = (postId) => {
    const selectedPost = posts.find((post) => post.id === postId);

    if (isLoggedIn) {
      const postAuthor = selectedPost.author;

      if (checkUserAuthorization(isLoggedIn, user, postAuthor, navigate)) {
        const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
        if (confirmDelete) {
          dispatch(deletePost(postId));
          navigate("/");
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

        {/* 6. map 함수를 사용하여 게시물 목록(posts 배열)을 순회하여 게시물 카드를 생성 */}
        {/* posts 배열이 존재하지 않는 경우 map 함수가 동작하지 않도록 옵셔널 체이닝이 적용 */}
        {posts?.map((post) => (
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
              {/* post 객체가 존재하지 않거나 프로퍼티가 없는 경우, 
              에러 대신 undefined를 반환하여 안전하게 렌더링 */}
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
                {post?.author || user.uid}
                <br />
                <br />
                <RenderIfLoggedIn isLoggedIn={isLoggedIn}>
                  {/* 수정/삭제 버튼은 저자와 로그인 사용자가 일치할 때만 표시 */}
                  {user.uid === post.author && (
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
                </RenderIfLoggedIn>
              </div>
            </div>
          </div>
        ))}
      </Container>
    </>
  );
}
