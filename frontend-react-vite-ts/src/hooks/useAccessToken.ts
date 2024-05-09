import axios from "axios";
import { useAppDispatch, useAppSelector } from "./useFlux";
import { setAccessExpired, setLoggedIn, setLoginText } from "../redux/reducers/UsersReducer";
import { useEffect } from "react";
import { useRefreshToken } from "./useRefreshToken";

axios.defaults.withCredentials = true;

export const useAccessToken = () => {
  console.log('useAccessToken called');
  const isAccessAuthorized = useAppSelector(state => state.users.isAccessAuthorized);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if(isAccessAuthorized)
      authorizeAccessToken();
  }, [isAccessAuthorized]);
  const authorizeAccessToken = () => {
    axios.get('/auth/access')
      .then((response) => {
        if (response.status === 200) {
          dispatch(setLoginText('액세스 토큰으로 자동 로그인 성공'));
          dispatch(setLoggedIn({ username: response.data.username, email: response.data.email })); //유저 로그인 상태로 변경
          console.log(`login type: ${response.data.loginType}`);
        }
      })
      .catch(() => {
        dispatch(setAccessExpired());
      });
  }
  useRefreshToken();
  return authorizeAccessToken;
}