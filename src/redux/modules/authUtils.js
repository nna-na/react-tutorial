// 인증과 관련된 유틸리티 함수
export const checkIfLoggedIn = (isLoggedIn, navigate) => {
  if (!isLoggedIn) {
    alert("로그인이 필요한 기능입니다.");
    navigate("/login");
    return false;
  }
  return true;
};

export const checkUserAuthorization = (isLoggedIn, user, author, navigate) => {
  if (!checkIfLoggedIn(isLoggedIn, navigate)) {
    return false;
  }

  const userIdentifier = user?.email || user?.uid;

  if (author !== userIdentifier) {
    alert("권한이 없습니다.");
    return false;
  }

  return true;
};
