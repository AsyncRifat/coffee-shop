import { createBrowserRouter } from 'react-router';
import HomeLayout from '../layout/HomeLayout';
import Home from '../components/Home';
import AddCoffee from '../components/AddCoffee';
import UpdateCoffee from '../components/UpdateCoffee';
import Loading from '../components/loader/Loading';
import CoffeeDetails from '../components/CoffeeDetails';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Users from '../components/Users';
import PrivateRoute from '../provider/PrivateRoute';
import axios from 'axios';
import MyAddCoffees from '../components/MyAddCoffees';
import MyOrders from '../components/MyOrders';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomeLayout,
    children: [
      {
        index: true,
        HydrateFallback: Loading,
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/coffees`),
        Component: Home,
      },
      {
        path: 'addCoffee',
        element: (
          <PrivateRoute>
            <AddCoffee />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-orders',
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: 'coffee/:id',
        HydrateFallback: Loading,
        loader: ({ params }) =>
          axios(`${import.meta.env.VITE_API_URL}/coffee/${params.id}`),
        element: (
          <PrivateRoute>
            <CoffeeDetails />
          </PrivateRoute>
        ),
      },
      {
        path: 'updateCoffee/:id',
        // HydrateFallback: Loading,
        // loader: ({ params }) =>
        //   fetch(`http://localhost:3000/coffees/${params.id}`),
        element: (
          <PrivateRoute>
            <UpdateCoffee />
          </PrivateRoute>
        ),
      },
      {
        path: 'users',
        // HydrateFallback: Loading,
        // loader: () => fetch('http://localhost:3000/users'),
        element: (
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-added-coffee/:email',
        HydrateFallback: Loading,
        loader: ({ params }) =>
          axios(`${import.meta.env.VITE_API_URL}/my-coffees/${params.email}`),
        element: (
          <PrivateRoute>
            <MyAddCoffees />
          </PrivateRoute>
        ),
      },

      // users controlled
      {
        path: 'sign-in',
        Component: SignIn,
      },
      {
        path: 'sign-up',
        Component: SignUp,
      },
    ],
  },
]);
