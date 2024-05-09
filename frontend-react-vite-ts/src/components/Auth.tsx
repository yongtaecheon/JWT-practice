import { useAppSelector } from "../hooks/useFlux";
import Login from "./Auth/Login";
import LoginText from "./Auth/LoginText";
import Logout from "./Auth/Logout";
import UserInfo from "./Auth/UserInfo";

export default function Auth() {
  const isLoggedIn = useAppSelector(state => state.users.isLoggedIn);
  return (
    <>
      <div className="card">
        {!isLoggedIn &&<Login/>}
        {isLoggedIn &&<><UserInfo /><Logout/></>}
      </div>
      <LoginText/>
    </>
  );
}
