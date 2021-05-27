import React,{useState,useEffect} from 'react'
import Navbar from './components/userComponents/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  const [userLoggedIn , setUserLoggedIn] = useState(false)

  const userAuth = ()=>{
    setUserLoggedIn(!userLoggedIn)
  }

  useEffect(()=>{
    if(localStorage.getItem('token')){
      userAuth()
    }
  },[])

  return (
    <div className="container">
      <Navbar userLoggedIn={userLoggedIn} userAuth={userAuth}/>
    </div>
  )
}

export default App
