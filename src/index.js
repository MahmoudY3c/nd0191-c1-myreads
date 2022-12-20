import React from 'react';
import ReactDOM from 'react-dom';
/*import './index.css';*/
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from './App';
import Search from'./search'

const router = createBrowserRouter([{
   path: "/",
   element: <App key="App" />,
 },
 {
   path: "/search",
   element: <Search key="Search" />,
 }]);

ReactDOM.render(
   <RouterProvider router={router} />,
  document.getElementById('root')
);
