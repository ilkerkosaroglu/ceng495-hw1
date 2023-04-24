import React, { useEffect } from 'react';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { ErrorPage, ErrorProductPage } from './ErrorPage';
import { ProductsComponent, loader as productsLoader } from './pages/productsPage';
import { Root, loader as rootLoader } from './Root';
import { CategoriesComponent, loader as categoriesLoader } from './Categories';
import { ProductDetailedComponent, loader as productInfoLoader } from './pages/productDetailed';
import { LoginPage, loader as loginLoader, action as loginAction } from './pages/login/loginPage';
import { DashboardComponent, loader as dashboardLoader } from './pages/login/dashboard';
import { action as userAction } from './pages/login/adminDashboard';
import { ProductCreationComponent, loader as newProductLoader } from './pages/login/productCreation';
import { action as reviewAddAction } from './pages/reviewAddComponent';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    errorElement: <ErrorPage />,
    children: [
      { path: "/user", action: userAction},
      { path: "/login", element: <LoginPage />, loader: loginLoader, action: loginAction, errorElement: <ErrorPage /> },
      { path: "/dashboard", element: <DashboardComponent/>, loader: dashboardLoader },
      { path: "/newProduct", element: <ProductCreationComponent/>, loader: newProductLoader },
      { path: "/review/:productId/edit", action: reviewAddAction },
      { path: "/", 
        element: <CategoriesComponent />, 
        loader: categoriesLoader, 
        errorElement: <ErrorPage />,
        children: [
          {
            path: ":category",
            element: <ProductsComponent/>,
            loader: productsLoader,
            errorElement: <ErrorProductPage />,
            children: [
              {
                path: ":productId",
                element: <ProductDetailedComponent/>,
                loader: productInfoLoader,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  useEffect(()=>{
     document.title = 'ProductSepeti';
  }, []);
  return (
    <div className="App">
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </div>
  );
}

export default App;
