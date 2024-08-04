import { useState } from 'react'

import { createBrowserRouter, RouterProvider,Navigate } from "react-router-dom";
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Transactions from './Pages/Transactions';
import Accounts from './Pages/Accounts';
import Overview from './Pages/Overview';
import Income from './Pages/Income';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Signup />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/transactions",
      element: <Transactions />
    },
    {
      path: "/accounts",
      element: <Accounts />
    },
    {
      path: "/overview",
      element: <Overview />
    },
    {
      path: "/income",
      element: <Income />
    }
    //{
    //   path: "*",
    //   element: <Income />
    // },
    


  ])

  return (
    <>

      <RouterProvider router={router} />

    </>
  )
}

export default App
