import React from 'react';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { Root, loader as rootLoader } from './Root';
import { ErrorPage, ErrorProductPage } from './ErrorPage';
import { ProductsComponent, loader as productsLoader } from './pages/productsPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ":category",
        element: <ProductsComponent/>,
        loader: productsLoader,
        errorElement: <ErrorProductPage />,
      },
    ],
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
