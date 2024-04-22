import { useEffect, useState } from 'react'
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setLoggedIn, setLoggedOut } from '../redux/reducers/UsersReducer';

axios.defaults.withCredentials = true;

export default function Login() {
  const userInfo = useAppSelector(state => state.users.userInfo);
  const isLoggedIn = useAppSelector(state => state.users.isLoggedIn);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginText, setLoginText] = useState<string>('');
  const URL = 'http://localhost:3000';
  useEffect(() => {
    authorizeAccessToken();
    console.log('call authorizeAccessToken()');
  }, []);

  const dispatchSetLoggedIn = (username:string) => {
    dispatch(setLoggedIn({ email: email, username: username}));
  }

  const logIn = () => {
    axios({
      url: `${URL}/auth/login`,
      method: 'POST',
      data: {
        email: email,
        password: password
      },
    }).then((response) => {
      if (response.status === 201) { //created
        console.log(`login type: ${response.data.loginType}`);
        setLoginText('');
        authorizeAccessToken();
      }
    })
      .catch((e) => {
        if (e.response.status === 404) //not found
          setLoginText('This User does not exsit. :(');
        else if (e.response.status === 403) //forbidden
          setLoginText('Wrong Password. Try Again.');
        else if (e.response.status === 500) //internal server error
          setLoginText('Server Error. Try Again Later.');
    })
  };
  const authorizeAccessToken = () => {
    axios({
      url: `${URL}/auth/access`,
      method: 'GET',
    }).then((response) => {
      dispatchSetLoggedIn(response.data.username);
      setLoginText('Login tried through Access Token');
      console.log(`login type: ${response.data.loginType}`);
    })
    .catch(() => {
      setLoginText('Login tried through Refresh Token.');
      refreshAccessToken();
    })
  };
  const refreshAccessToken = () => {
    axios({
      url: `${URL}/auth/refresh`,
      method: 'PATCH',
    }).then((response) => {
      dispatchSetLoggedIn(response.data.username);
      console.log(`login type: ${response.data.loginType}`);
    })
    .catch(() => {
      setLoginText('Your Login Expired. Please Login again');
      dispatch(setLoggedOut());
    })
  }
  const logOut = () => {
    axios({
      url: `${URL}/auth/logout`,
      method: 'DELETE',
    }).then(() => {
      setLoginText('You logged out Successfully.');
      setTimeout(() => {
        setLoginText('');
      }, 3000);
      dispatch(setLoggedOut());
    })
  }
  return (
    <div className="card">
      {!isLoggedIn &&
        <>
        <div className='email'>
          <p>E-mail</p>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your ID'></input>
        </div>
        <div className='password'>
          <p>Password</p>
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your Password'></input>
        </div>
        <button onClick={logIn}>Login</button>
        </>
      }
      {isLoggedIn &&
        <div>
          <h2>Hello! {userInfo.username}</h2>
          <button onClick={logOut}>Logout</button>
        </div>
      }
      {loginText &&
        <p><strong>{loginText}</strong></p>
      }
    </div>
  )
}
