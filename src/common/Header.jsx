import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { auth } from "../firebase";
import { useSelector } from "react-redux";

export default function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    // 인증 상태 변경 감지를 위해 Firebase의 onAuthStateChanged를 사용
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user); // 사용자가 로그인한 경우 isLoggedIn을 true로 설정, 로그아웃한 경우 false로 설정
    });

    // 컴포넌트 언마운트 시 인증 상태 변경 감지 정리
    return () => unsubscribe();
  }, []);

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
      setIsLoggedIn(false); // 로그아웃 상태로 설정
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
