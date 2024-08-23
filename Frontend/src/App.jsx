import {Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { Signup } from './Pages/Signup'
import { Login } from './Pages/Login'
import Home from './Pages/Home'
import { useAuthContext } from './context/AuthContext'

function App() {
 const {authUser} = useAuthContext()
  return (
    <>

      <Routes>
        <Route path='/signup' element={authUser ? <Navigate to="/"/>:<Signup/>}></Route>
        <Route path='/login' element={authUser ? <Navigate to="/"/>:<Login/>}></Route>
        <Route path='/' element={authUser ? <Home/> : <Navigate to = "/signup"/>}></Route>
      </Routes>
    </>
  )
}

export default App
