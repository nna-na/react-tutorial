import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../redux/modules/posts";

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

  const handleDelete = (postId) => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete) {
      dispatch(deletePost(postId));
      navigate("/");
      alert("삭제되었습니다.");
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
              </div>
            </div>
          </div>
        ))}
      </Container>
    </>
  );
}
