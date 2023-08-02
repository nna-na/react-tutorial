import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";
import { setLoggedIn, setUser } from "../../redux/modules/user";

export function useAuthenticationEffect() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      dispatch(setLoggedIn(!!user));
      if (user) {
        dispatch(setUser(user));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
}
