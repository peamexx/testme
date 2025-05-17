import './App.css'
import { useEffect } from 'react';
import { useNavigate } from "react-router";

import { userStore } from './store/UserStore';

function App() {
  const navigate = useNavigate();
  const user = userStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/list')
    }
  }, [user])

  return (<></>)
}

export default App
