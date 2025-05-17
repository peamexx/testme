import './index.css';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider, useNavigate } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import App from './App.tsx';
import Join from './components/join/Join.tsx';
import Login from './components/login/Login.tsx';
import MessageList from './components/list/MessageList.tsx';

const ProtectedLoginLayout = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      navigate('/');
    }
  });

  return <Outlet />;
}

const ProtectedLayout = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate('/login');
    }
  });

  return <Outlet />;
}

let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/list",
    element: <ProtectedLayout />,
    children: [
      { path: '', element: <MessageList /> }
    ]
  },
  {
    path: "/join",
    element: <Join />,
  },
  {
    path: "/login",
    element: <ProtectedLoginLayout />,
    children: [
      { path: '', element: <Login /> }
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
