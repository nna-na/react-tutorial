// 조건부 렌더링과 관련된 유틸리티 함수

export const RenderIfLoggedIn = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : null;
};
