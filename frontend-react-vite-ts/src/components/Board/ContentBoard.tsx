import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../hooks/useFlux';
import { deletePost } from '../../api/deletePost';

export default function ContentBoard() {
  const params = useParams();
  const boards = useAppSelector(state => state.boards);
  const username = useAppSelector(state => state.users.userInfo.username);
  const current = boards.filter((b) => b.id === Number(params.id))[0];
  const navigate = useNavigate();
  const handleDeletePost = () => {
    const result = window.confirm('정말로 이 글을 삭제하시겠습니까?');
    if (result) {
      deletePost(current.id);
      navigate('/');
      setTimeout(() => {
        alert('글을 성공적으로 삭제 했습니다.');
      }, 1);
    }
  }

  return (
    <div className='card'>
      <h2>{current.title}</h2>
      <p>{current.content}</p>
      {current.username === username &&
        <>
          <button onClick={()=>{navigate(`/board/modify/${current.id}`)}}>수정하기</button>
          <button onClick={handleDeletePost}>삭제</button>
        </>
      }
    </div>
  )
}
