import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <h1>JWT Auth</h1>
      <nav>
        <ul>
          <Link to='/'><li>게시판</li></Link>
          <Link to='/login'><li>로그인</li></Link>
        </ul>
      </nav>
    </header>
  )
}
