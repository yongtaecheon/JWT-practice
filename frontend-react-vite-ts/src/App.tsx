import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Auth from './components/Auth'
import Board from './components/Board'
import SignUp from './components/SignUp'
import { useAccessToken } from './hooks/useAccessToken'
import CreateBoard from './components/Board/CreateBoard'
import ContentBoard from './components/Board/ContentBoard'
import ModifyBoard from './components/Board/ModifyBoard'

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
          <Route path='/board/create' element={<CreateBoard />} />
          <Route path='/board/modify/:id' element={<ModifyBoard/>}/>
          <Route path='/board/:id' element={<ContentBoard />} />
        </Routes>
      </main>
    <Footer />
  </>
  )
}

export default App
