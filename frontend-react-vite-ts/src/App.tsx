import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Login from './components/Login'
import Board from './components/Board'
import SignUp from './components/SignUp'

function App() {
  return (
  <>
    <Header />
      <main>
        <Routes>
          <Route path='/' element={<Board />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </main>
    <Footer />
  </>
  )
}

export default App
