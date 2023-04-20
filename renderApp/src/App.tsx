import React from 'react';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { Root, loader as RootLoader } from './Root';
import { ErrorPage } from './ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: RootLoader,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <div className="App">
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </div>
  );
}

export default App;
