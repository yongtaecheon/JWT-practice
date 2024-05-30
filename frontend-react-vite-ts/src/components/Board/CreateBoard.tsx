import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useFlux';
import { createPost } from '../../api/createPost';


export default function CreateBoard() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const username = useAppSelector(state => state.users.userInfo.username);
  const navigate = useNavigate();

  const handleCreatePost = () => {
    if(createPost(title, content, username))
      navigate('/');
  }
  return (
    <div>
      <h2>게시글 작성하기</h2>
      <div className='card'>
        <input placeholder='제목' value={title} onChange={(e)=>setTitle(e.target.value)}></input>
        <textarea placeholder='내용' value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
        <button onClick={handleCreatePost}>글쓰기</button>
      </div>
    </div>
  )
}
