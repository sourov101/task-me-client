
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import ErrorPage from './Components/404Page/404page';
import AddTask from './Components/AddTask/AddTask';
import CompletedDetails from './Components/CompletedDetails/CompletedDetails';
import CompletedTask from './Components/CompletedTask/CompletedTask';
import Main from './Components/Layouts/Main/Main';
import Login from './Components/Login/Login';
import MyTask from './Components/MyTask/MyTask';
import PrivateRoute from './Components/Routes/PrivateRoute';
import Signup from './Components/Signup/Signup';
import TaskDetails from './Components/TaskDetails/TaskDetails';
import UpdateForm from './Components/UpdateForm/UpdateForm';
import AddComment from './Components/AddComment/AddComment';
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./Components/Theme/Theme";
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

function App() {
  const [theme, setTheme] = useState("light");

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <MyTask></MyTask>

        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/signup',
          element: <Signup></Signup>
        },
        {
          path: '/addtask',
          element: <AddTask></AddTask>,

        },
        {
          path: '/completedtask',
          element: <CompletedTask></CompletedTask>
        },
        {
          path: '/my-task/:id',
          element: <PrivateRoute><TaskDetails></TaskDetails></PrivateRoute>,
          loader: ({ params }) => fetch(`https://task-me-server.vercel.app/my-task/${params.id}`)
        },
        {
          path: '/completed/:id',
          element: <PrivateRoute><CompletedDetails></CompletedDetails></PrivateRoute>,
          loader: ({ params }) => fetch(`https://task-me-server.vercel.app/completed/${params.id}`)
        },
        {
          path: '/update/:id',
          element: <UpdateForm></UpdateForm>,
          loader: ({ params }) => fetch(`https://task-me-server.vercel.app/my-task/${params.id}`)
        },
        {
          path: '/comment/:id',
          element: <AddComment></AddComment>,
          loader: ({ params }) => fetch(`https://task-me-server.vercel.app/completed/${params.id}`)
        },

        {
          path: '*',
          element: <ErrorPage></ErrorPage>
        },


      ]
    }
  ])

  return (

    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <StyledApp className="">

        <RouterProvider router={router}></RouterProvider>
        <Toaster></Toaster>
        <div className=' mb-11  text-center mt-3'><button onClick={() => themeToggler()} type="button" className=" invisible sm:visible text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">Change Theme</button></div>

      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
