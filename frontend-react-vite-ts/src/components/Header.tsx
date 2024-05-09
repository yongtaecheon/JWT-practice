import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/useFlux";

export default function Header() {
  const isLoggedIn = useAppSelector(state => state.users.isLoggedIn);
  return (
    <header>
      <h1>JWT Auth</h1>
      <nav>
        <ul>
          <Link to='/'><li>게시판</li></Link>
          <Link to='/login'><li>{isLoggedIn ? '내 정보' : '로그인'}</li></Link>
        </ul>
      </nav>
    </header>
  )
}
