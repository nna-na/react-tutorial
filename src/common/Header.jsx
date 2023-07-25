import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function Header() {
  const navigate = useNavigate();

  const handleMainClick = () => {
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
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
        <h5 onClick={handleLoginClick} style={{ cursor: "pointer" }}>
          로그인
        </h5>
        <h5 onClick={handleSignupClick} style={{ cursor: "pointer" }}>
          회원가입
        </h5>
      </div>
    </header>
  );
}
