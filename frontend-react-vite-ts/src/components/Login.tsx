import { useEffect, useState } from 'react';
// import { useLogin } from '../hooks/useLogin';
import { Link } from 'react-router-dom';
import profile from '../assets/pepe.png';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDisSel';
import { setLoggedIn, setLoggedOut } from '../redux/reducers/UsersReducer';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const { userInfo, isLoggedIn, loginText, logIn, logOut } = useLogin(email, password);
  const userInfo = useAppSelector(state => state.users.userInfo);
  const isLoggedIn = useAppSelector(state => state.users.isLoggedIn);
  const dispatch = useAppDispatch();

  const [loginText, setLoginText] = useState<string>('');

  useEffect(() => {
    // if(Date.now() / 1000 - Number(localStorage.getItem('accessExp')) > 60)
    authorizeAccessToken();
  }, []);

  const dispatchSetLoggedIn = (email: string, username: string) => { //로그인 상태 redux dispatch
    dispatch(setLoggedIn({ email: email, username: username }));
  }

  const authorizeAccessToken = () => { //access token 유효성 검증
    axios.get('/auth/access')
      .then((response) => {
        if (response.status === 200) {
          dispatchSetLoggedIn(response.data.email, response.data.username); //유저 로그인 상태로 변경
          setLoginText('액세스 토큰으로 자동 로그인 성공'); 
          console.log(`login type: ${response.data.loginType}`);
          // localStorage.setItem('accessExp', response.data.exp.toString());
        }
      })
      .catch(() => {
        refreshAccessToken();
      });
  };

  const refreshAccessToken = () => { // refresh token으로 access토큰 재발급
    axios.patch('/auth/refresh')
      .then((response) => {
        if (response.status === 200) {
          console.log(`login type: ${response.data.loginType}`);
          // localStorage.setItem('refreshExp', response.data.exp.toString());
          authorizeAccessToken();
        }
      })
      .catch(() => {
        setLoginText('');
        dispatch(setLoggedOut());
      });
  }

  const logIn = () => { //초기 로그인
    axios.post('/auth/login', { email, password })
    .then((response) => {
      if (response.status === 201) {
        console.log(`login type: ${response.data.loginType}`);
        authorizeAccessToken(); //access token 검증
        setLoginText('');
      }
    })
    .catch((e) => {
      if (e.response.status === 404)
        setLoginText('해당 사용자가 존재하지 않습니다.');
      else if (e.response.status === 403)
        setLoginText('비밀번호가 틀렸습니다.');
      else if (e.response.status === 500)
        setLoginText('서버에서 오류가 발생했습니다.');
    });
  };

  const logOut = () => { // 로그아웃
    axios.delete('/auth/logout')
      .then((response) => {
        setLoginText('성공적으로 로그아웃 되었습니다.');
        console.log(`Server response: ${response.data}`)
        dispatch(setLoggedOut());
        // localStorage.clear();
      });
  }
  if (loginText) {
    setTimeout(() => {
      setLoginText('');
    }, 3000);
  }
  return (
    <>
    <div className="card">
      {!isLoggedIn &&
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
      }
      {isLoggedIn &&
        <div>
            <h1>{userInfo.username}</h1>
            <img style={{width:'300px', display:'block', marginBottom:'20px'}} src={profile}></img>
          <button onClick={logOut}>Logout</button>
        </div>
      }
    </div>
      {loginText &&
        <p style={{color:'lightcoral'}} ><strong>{loginText}</strong></p>}
    </>
  );
}
