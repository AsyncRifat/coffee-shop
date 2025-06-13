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
import Users2 from '../components/Users2';
import PrivateRoute from '../provider/PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomeLayout,
    children: [
      {
        index: true,
        HydrateFallback: Loading,
        loader: () => fetch('http://localhost:3000/coffees'),
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
        path: 'coffee/:id',
        HydrateFallback: Loading,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/coffees/${params.id}`),
        element: (
          <PrivateRoute>
            <CoffeeDetails />
          </PrivateRoute>
        ),
      },
      {
        path: 'updateCoffee/:id',
        HydrateFallback: Loading,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/coffees/${params.id}`),
        element: (
          <PrivateRoute>
            <UpdateCoffee />
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
      {
        path: 'users',
        HydrateFallback: Loading,
        loader: () => fetch('http://localhost:3000/users'),
        element: (
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        ),
      },
      {
        path: 'users2',
        element: (
          <PrivateRoute>
            <Users2 />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
