import { useLogin } from '../../hooks/useLogin'
import { Link } from 'react-router-dom';

export default function Login() {
  const { email, setEmail, password, setPassword, logIn } = useLogin();
  return (
    <>
      <h1>로그인</h1>
      <div className='email'>
        <p>이메일</p>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='아이디 입력'></input>
      </div>
      <div className='password'>
        <p>비밀번호</p>
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='비밀번호 입력'></input>
      </div>
      <div className='buttons'>
        <button onClick={logIn}>로그인</button>
        <Link to='/signup'>
          <button>회원가입</button>
        </Link>
      </div>
    </>
  )
}
