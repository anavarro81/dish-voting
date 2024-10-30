import React from 'react'
import VotingPage from './components/Pages/VotingPage'
import VotingResultsPage from './components/Pages/VotingResultsPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Pages/Home'
import SelectChefPage from './components/Pages/SelectChefPage'
import NewChefPage from './components/Pages/NewChefPage'

const App = () => {

  const router = createBrowserRouter([
    
    {path: "/",
      element: <Home/>
    },

    {
      path: "/select-chef",
      element: <SelectChefPage/>
    },

    {
      path: "/voting-page",
      element: <VotingPage/>
    },

    {
      path: "/voting-results",
      element: <VotingResultsPage/>
    },
    {
      path: "/new-chef",
      element: <NewChefPage/>
    }


  ])

  return (
    <RouterProvider router={router}/>
    
  )
}

export default App