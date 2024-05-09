import axios from "axios";
import { useCallback, useState } from "react";
import { useAppDispatch } from "./useFlux";
import { setAccessAuthorized, setLoginText } from "../redux/reducers/UsersReducer";

axios.defaults.withCredentials = true;

export const useLogin = () => {
  console.log('useLogin called');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();

  const logIn = useCallback(() => { //초기 로그인
    console.log('useLogin - logIn function called');
    axios.post('/auth/login', { email, password })
      .then((response) => {
        if (response.status === 201) {
          console.log(`login type: ${response.data.loginType}`);
          dispatch(setAccessAuthorized());
          dispatch(setLoginText(''));
        }
      })
      .catch((e) => {
        if (e.response.status === 404)
          dispatch(setLoginText('해당 사용자가 존재하지 않습니다.'));
        else if (e.response.status === 403)
          dispatch(setLoginText('비밀번호가 틀렸습니다.'));
        else if (e.response.status === 500)
          dispatch(setLoginText('서버에서 오류가 발생했습니다.'));
      });
  }, [email, password, dispatch]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    logIn,
  }
}