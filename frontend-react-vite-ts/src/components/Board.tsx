import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/useFlux"
// import { useLogin } from "../hooks/useLogin";

export default function Board() {
  const isLoggedIn = useAppSelector(state => state.users.isLoggedIn);
  return (
    <div>
      <h2>Board</h2>
      {!isLoggedIn && <p>로그인을 진행 해 주세요.</p>}
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회수</th>
              <th>좋아요</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>안녕하세요 반갑습니다</td>
              <td>데모</td>
              <td>2024/01/01</td>
              <td>조회수</td>
              <td>1</td>
            </tr>
          </tbody>
          <tfoot>
          </tfoot>
        </table>
        <Link to='/createBoard'><button>글쓰기</button></Link>
      </div>
    </div>
  )
}
