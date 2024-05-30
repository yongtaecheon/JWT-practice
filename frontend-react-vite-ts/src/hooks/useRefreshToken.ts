import axios from "axios";
import { useAppDispatch, useAppSelector } from "./useFlux";
import { setAccessAuthorized, setLoggedOut, setLoginText } from "../redux/reducers/UsersReducer";
import { useEffect } from "react";

axios.defaults.withCredentials = true;

export const useRefreshToken = () => {
  console.log('useRefreshToken called');
  const isAccessAuthorized = useAppSelector(state => state.users.isAccessAuthorized);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isAccessAuthorized)
      refreshAccessToken();
  }, [isAccessAuthorized])
  
  const refreshAccessToken = () => {
    axios.patch('/auth/refresh')
      .then((response) => {
        if (response.status === 200) {
          console.log(`login type: ${response.data.loginType}`);
          dispatch(setAccessAuthorized());
        }
      })
      .catch(() => {
        dispatch(setLoginText(''));
        dispatch(setLoggedOut());
        alert('로그인이 만료되어 로그아웃 되었습니다. 다시 로그인을 진행해주세요.');
      });
  }
}