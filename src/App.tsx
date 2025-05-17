import './App.css'
import { useEffect } from 'react';
import { useNavigate } from "react-router";

import { userStore } from './store/UserStore';

function App() {
  const navigate = useNavigate();
  const user = userStore((state) => state.user);

  useEffect(() => {
    console.log(user);
    if (!user) {
      navigate("/login");
    }
  }, [user])

  return (<></>)
}

export default App
