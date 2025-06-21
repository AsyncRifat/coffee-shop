import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthContext';

const Header = () => {
  const { user, signOutUser } = useContext(AuthContext);
  // console.log(user);
  const navigate = useNavigate();

  const handleUserSignOut = () => {
    signOutUser()
      .then(() => {
        navigate('/sign-in');
      })
      .catch(error => {
        console.log(error);
      });
  };
  // const userInfo = <div>{user && <h2>{user?.email}</h2>}</div>;

  const link = (
    <>
      <NavLink to="/" className="p-2">
        Home
      </NavLink>
      {user ? (
        <>
          <NavLink to="/addCoffee" className="p-2">
            Add Coffee
          </NavLink>
          <NavLink to={`/my-added-coffee/${user?.email}`} className="p-2">
            My Added coffee's
          </NavLink>
          <NavLink to="/my-orders" className="p-2">
            My Orders
          </NavLink>

          <div className="rounded-full border-3 border-gray-400 mx-3 ">
            {user?.photoURL && (
              <img
                className="w-6 h-6 rounded-full object-cover "
                src={user?.photoURL}
                alt="avatar"
              />
            )}
          </div>

          <Link
            className="px-3 py-1.5 rounded-md bg-yellow-400"
            onClick={handleUserSignOut}
          >
            Log Out
          </Link>
        </>
      ) : (
        <>
          <NavLink to="/sign-in" className="p-2 md:ml-1">
            Sign In
          </NavLink>
          <NavLink to="/sign-up" className="p-2">
            Sign Up
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {' '}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{' '}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {link}
            </ul>
          </div>
          <Link className="btn btn-ghost text-xl" to="/">
            Coffee Store
          </Link>

          <div>
            <label className="toggle text-base-content">
              <input
                type="checkbox"
                value="sunset"
                className="theme-controller"
              />

              <svg
                aria-label="sun"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2"></path>
                  <path d="M12 20v2"></path>
                  <path d="m4.93 4.93 1.41 1.41"></path>
                  <path d="m17.66 17.66 1.41 1.41"></path>
                  <path d="M2 12h2"></path>
                  <path d="M20 12h2"></path>
                  <path d="m6.34 17.66-1.41 1.41"></path>
                  <path d="m19.07 4.93-1.41 1.41"></path>
                </g>
              </svg>

              <svg
                aria-label="moon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </g>
              </svg>
            </label>
          </div>
        </div>
        {/* <div className="navbar-center md:hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <span className=" font-bold">Email:</span> {userInfo}
          </ul>
        </div> */}
        <div className="navbar-end  hidden lg:flex menu menu-horizontal px-1">
          {link}
        </div>
      </div>
    </>
  );
};

export default Header;
