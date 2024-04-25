import { useAppSelector } from "../hooks/useAppDisSel"
// import { useLogin } from "../hooks/useLogin";

export default function Board() {
  const isLoggedIn = useAppSelector(state => state.users.isLoggedIn);
  // useLogin('','').authorizeAccessToken();
  return (
    <div>
      <h2>Board</h2>
      {!isLoggedIn && <p>로그인을 진행 해 주세요.</p>}
    </div>
  )
}
