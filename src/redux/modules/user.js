// 액션 타입 정의
const SET_USER = "user/SET_USER";
const SET_LOGGED_IN = "user/SET_LOGGED_IN";
const SET_USER_IDENTIFIER = "user/SET_USER_IDENTIFIER";

// 액션 생성자 함수
export const setUser = (user) => ({
  type: SET_USER,
  payload: {
    uid: user.email,
    displayName: user.displayName,
  },
});

// 로그인 상태를 설정하는 액션 생성자 함수
export const setLoggedIn = (isLoggedIn) => ({
  type: SET_LOGGED_IN,
  payload: isLoggedIn,
});

// 사용자의 이메일 또는 uid를 저장하는 액션 생성자 함수
export const setUserIdentifier = (userIdentifier) => ({
  type: SET_USER_IDENTIFIER,
  payload: userIdentifier,
});

// 초기 상태 정의
const initialState = {
  user: null,
  isLoggedIn: false,
};

// 리듀서 함수
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    // 로그인 상태를 변경하는 리듀서
    case SET_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    // 사용자의 이메일 또는 uid를 저장하는 리듀서
    case SET_USER_IDENTIFIER:
      return {
        ...state,
        userIdentifier: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
