import axios from "axios";
import { useEffect, useState } from "react";

export default function SignUp() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isPasswordSame, setIsPasswordSame] = useState<number>(-1);
  const [isEmailExist, setIsEmailExist] = useState<number>(-1);

  useEffect(() => {
    if (!password && !passwordConfirm)
      setIsPasswordSame(-1);
    else if (password === passwordConfirm)
      setIsPasswordSame(1);
    else
      setIsPasswordSame(0);
  }, [password, passwordConfirm]);

  const checkEmail = () => {
    if (!email)
      return;
    axios.post('/auth/signup/check', { email: email })
      .then((response) => {
        console.log(response.data);
        console.log(typeof response.data);
        if (response.data === 'exist')
          setIsEmailExist(1);
        else if (response.data === 'notExist')
          setIsEmailExist(0);
    })
  }

  const signUp = () => {
    if (!username || !email || !password)
      return;
    if (!isEmailExist || isPasswordSame === 1) {
      axios.put('/auth/signup', { username: username, email: email, password: password })
        .then((response) => {
          console.log(`New user email:${response.data.email}, username:${response.data.username} Created`);
          window.open('/login')
        });
    }
  }

  return (
    <div className="card">
      <h1>회원가입</h1>
      <div className="name">
        <p>이름</p>
        <input placeholder='이름 입력' value={username} onChange={(e) => setUsername(e.target.value)}></input>
      </div>
      <div className="email">
        <p>이메일</p>
        <input placeholder='이메일 입력' value={email} onChange={(e) => setEmail(e.target.value)}></input>
      </div>
      <button onClick={checkEmail}>이메일 중복확인</button>
      {isEmailExist === 0 &&
        < p style={{ color: 'limegreen' }}><strong>사용 가능한 이메일 입니다.</strong></p>}
      {isEmailExist === 1 &&
        <p style={{ color: 'lightcoral' }}><strong>해당 이메일이 이미 존재합니다.</strong></p>}
      <div className="password">
        <p>비밀번호</p>
        <input type='password' placeholder='비밀번호 입력' value={password} onChange={(e) => setPassword(e.target.value)}></input>
      </div>
      <div className="password">
        <p>비밀번호 확인</p>
        <input type='password' placeholder='비밀번호 재입력' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}></input>
      </div>
      {isPasswordSame === 1 &&
        < p style={{ color: 'limegreen' }}><strong>비밀번호가 일치합니다.</strong></p>}
      {isPasswordSame === 0 &&
        <p style={{ color: 'lightcoral' }}><strong>비밀번호가 다릅니다.</strong></p>}
      <button onClick={signUp}>회원가입</button>
    </div>
  )
}
