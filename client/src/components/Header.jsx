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
  const userInfo = <div>{user && <h2>{user?.email}</h2>}</div>;

  const link = (
    <>
      <NavLink to="/" className="p-2">
        Home
      </NavLink>
      {user ? (
        ''
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
      {user && (
        <>
          <NavLink to="/addCoffee" className="p-2">
            Add Coffee
          </NavLink>
          <NavLink to="/users" className="p-2">
            Users
          </NavLink>
          <NavLink to="/users2" className="p-2">
            Users2(tanStack)
          </NavLink>
          <NavLink to="/" className="p-2">
            My Added coffee's
          </NavLink>
          <NavLink to="/" className="p-2">
            My Orders
          </NavLink>

          <div className="w-8 h-8 rounded-full border mx-3">
            {user?.photoURL && <img src={user?.photoURL} alt="avatar" />}
          </div>

          <Link
            className="px-3 py-1.5 rounded-md bg-yellow-400"
            onClick={handleUserSignOut}
          >
            Log Out
          </Link>
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
