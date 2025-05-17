import './index.css';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router";

import App from './App.tsx';
import Join from './components/join/Join.tsx';
import Login from './components/login/Login.tsx';
import MessageList from './components/list/MessageList.tsx';

let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/list",
    element: <MessageList />,
  },
  {
    path: "/join",
    element: <Join />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
