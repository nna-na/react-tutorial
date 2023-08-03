import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";
import { setLoggedIn, setUser } from "../modules/user";

export function useAuthenticationEffect() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      dispatch(setLoggedIn(!!user));

      if (user) {
        // Firebase User 객체에서 필요한 정보 추출
        const userInfo = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
        };

        dispatch(setUser(userInfo));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
}
