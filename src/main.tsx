import './index.css';
import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider, useNavigate } from "react-router";

import App from './App.tsx';
import Join from './components/join/Join.tsx';
import Login from './components/login/Login.tsx';
import MessageList from './components/list/MessageList.tsx';
import { userStore } from './store/UserStore.tsx';

const ProtectedLoginLayout = () => {
  const navigate = useNavigate();
  const user = userStore((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return user ? null : <Outlet />;
}

const ProtectedLayout = () => {
  const navigate = useNavigate();
  const user = userStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return user ? <Outlet /> : null;
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
