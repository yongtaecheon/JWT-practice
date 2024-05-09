import axios from "axios";
import { useAppDispatch } from "./useFlux";
import { setLoggedOut, setLoginText } from "../redux/reducers/UsersReducer";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const logOut = () => {
    axios.delete('/auth/logout')
      .then((response) => {
        dispatch(setLoginText('성공적으로 로그아웃 되었습니다.'));
        console.log(`Server response: ${response.data}`)
        dispatch(setLoggedOut());
      });
  }
  return logOut;
}