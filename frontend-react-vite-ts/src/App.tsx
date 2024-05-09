import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Auth from './components/Auth'
import Board from './components/Board'
import SignUp from './components/SignUp'
import { useAccessToken } from './hooks/useAccessToken'
import CreateBoard from './components/Board/CreateBoard'

function App() {
  useAccessToken();
  return (
  <>
    <Header />
      <main>
        <Routes>
          <Route path='/' element={<Board />} />
          <Route path='/login' element={<Auth />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/createBoard' element={<CreateBoard/>} />
        </Routes>
      </main>
    <Footer />
  </>
  )
}

export default App
