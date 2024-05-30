import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../hooks/useFlux';
import { modifyPost } from '../../api/modifyPost';

export default function ModifyBoard() {
  const params = useParams();
  const boards = useAppSelector(state => state.boards);
  const current = boards.filter((b) => b.id === Number(params.id))[0];
  const [title, setTitle] = useState<string>(current.title);
  const [content, setContent] = useState<string>(current.content);
  const navigate = useNavigate();

  const handleModifyPost = () => {
    modifyPost(current.id, title, content, current.username)
    navigate('/');
    setTimeout(() => {
      alert('글을 성공적으로 수정 했습니다.');
    }, 1);
  }
  return (
    <div>
      <h2>게시글 수정하기</h2>
      <div className='card'>
        <input placeholder='제목' value={title} onChange={(e)=>setTitle(e.target.value)}></input>
        <textarea placeholder='내용' value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
        <button onClick={handleModifyPost}>수정하기</button>
      </div>
    </div>
  )
}
