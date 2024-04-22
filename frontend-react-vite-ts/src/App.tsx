// import { useState } from 'react';
import './App.css'
import Login from './components/Login'

function App() {
  // const [isLogin, setIsLogin] = useState<boolean>(false);
  // const [user, setUser] = useState<object>({});
    return (
    <main>
      <h1>JWT<br/>Authentication</h1>
      <Login></Login>
      <p className="copyright">
        made by&nbsp;
        <a style={{color:'black'}} href="https://github.com/yongtaecheon">©yongtaecheon</a>
      </p>
    </main>
  )
}

export default App
