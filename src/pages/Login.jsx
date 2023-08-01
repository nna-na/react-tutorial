import React, { useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, setLoggedIn } from "../redux/modules/user";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  const signIn = async (event) => {
    event.preventDefault();

    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      alert("환영합니다!", userCredential.user);

      // 로그인 상태 변경
      setIsLoggedIn(true);

      // 로그인 상태를 Redux 스토어에 저장
      dispatch(setUser(userCredential.user)); // user 정보를 setUser 액션을 이용해 Redux 스토어에 저장
      dispatch(setLoggedIn(true)); // isLoggedIn 상태를 true로 변경

      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("이메일 혹은 비밀번호가 일치하지 않습니다.", errorCode, errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "600px",
            alignItems: "center",
          }}
        >
          <form>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <input
                placeholder="이메일"
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid lightgrey",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
                name="email"
                value={email}
                onChange={onChange}
              />
            </div>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <input
                placeholder="비밀번호"
                type="password"
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid lightgrey",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
                name="password"
                value={password}
                onChange={onChange}
              />
            </div>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <button
                style={{
                  width: "100%",
                  border: "none",
                  padding: "12px",
                  borderRadius: "6px",
                  backgroundColor: "#78C1F3",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={signIn}
                disabled={isLoading} // 로딩 상태에 따라 버튼 비활성화
              >
                {isLoading ? "로그인 중..." : "로그인하기"}
              </button>
            </div>
            <div
              style={{
                width: "360px",
              }}
            >
              <Link to="/signup">
                <button
                  style={{
                    width: "100%",
                    border: "none",
                    padding: "12px",
                    borderRadius: "6px",
                    backgroundColor: "#FF6969",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  회원가입하러 가기
                </button>
              </Link>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}
