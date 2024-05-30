import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useFlux"
import { useEffect } from "react";
import axios from "axios";
import { setBoards } from "../redux/reducers/BoardsReducer";

axios.defaults.withCredentials = true;

export default function Board() {
  const isLoggedIn = useAppSelector(state => state.users.isLoggedIn);
  const boards = useAppSelector(state => state.boards);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('/boards/get')
      .then((response) => {
        dispatch(setBoards(response.data));
      })
      .catch((error) => {
        console.log(error.data);
      }
    )
  }, []);
  const navigateCreateBoard = () => {
    if (!isLoggedIn) {
      console.log('not logged in');
      alert('로그인을 진행해 주세요');
      return;
    }
    navigate('/board/create');
  }
  const renderBoards = () => {
    const res = boards.map((b) => {
      return (
        <tr>
          <td>{b.id}</td>
          <Link to={`/board/${b.id}`}><td>{b.title}</td></Link>
          <td>{b.username}</td>
          <td>{b.createdAt}</td>
          <td>0</td>
          <td>0</td>
        </tr>
      )
    })
    return res;
  }
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
            {renderBoards()}
          </tbody>
          <tfoot>
          </tfoot>
        </table>
        <button onClick ={navigateCreateBoard}>글쓰기</button>
      </div>
    </div>
  )
}
