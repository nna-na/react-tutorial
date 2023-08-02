import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { auth } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import { setLoggedIn } from "../redux/modules/user"; // 필요한 액션 임포트
import { useAuthenticationEffect } from "../redux/modules/useAuthenticationEffect";

export default function Header() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch(); // useDispatch 훅을 사용하여 디스패치 함수 가져오기

  useAuthenticationEffect();

  const handleMainClick = () => {
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleLogoutClick = async () => {
    try {
      // 사용자 로그아웃 처리
      await auth.signOut();
      dispatch(setLoggedIn(false)); // isLoggedIn 함수 대신에 액션을 디스패치하여 상태 업데이트
      alert("로그아웃 되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header
      style={{
        height: "100px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px 0 24px",
      }}
    >
      <h1
        onClick={handleMainClick}
        style={{
          color: "gray",
          cursor: "pointer",
        }}
      >
        <FaHome />
      </h1>
      <div
        style={{
          display: "flex",
          gap: "12px",
        }}
      >
        {!isLoggedIn ? ( // 로그인 상태에 따라 다른 내용을 보여줌
          <>
            <h5 onClick={handleLoginClick} style={{ cursor: "pointer" }}>
              로그인
            </h5>
            <h5 onClick={handleSignupClick} style={{ cursor: "pointer" }}>
              회원가입
            </h5>
          </>
        ) : (
          <>
            {user.uid ? <h5>환영합니다, {user.uid} 님</h5> : <h5>환영합니다, 사용자님</h5>}
            <h4 onClick={handleLogoutClick} style={{ cursor: "pointer" }}>
              로그아웃
            </h4>
          </>
        )}
      </div>
    </header>
  );
}
