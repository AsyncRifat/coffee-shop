import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthContext';
import axios from 'axios';

const SignIn = () => {
  const { signInUser, googleSignUp } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignIn = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then(result => {
        console.log(result.user);
        const signInInfo = {
          email,
          lastSignInTime: result.user?.metadata?.lastSignInTime,
        };

        // using axios
        axios.patch('http://localhost:3000/users', signInInfo).then(data => {
          console.log(data.data);
        });

        // update last sign in to the database (using fetch)
        // fetch('http://localhost:3000/users', {
        //   method: 'PATCH',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(signInInfo),
        // })
        //   .then(res => res.json())
        //   .then(data => {
        //     console.log('after update patch', data);
        //   });

        e.target.reset();
        navigate('/users');
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  // google signIn
  const handleGoogleSignUp = () => {
    googleSignUp()
      .then(result => {
        console.log(result.user);
        navigate('/');
      })
      .catch(error => {
        console.log(error?.message || 'Something went wrong');
      });
  };
  return (
    <>
      <div className="mx-auto max-w-md p-4 rounded-md shadow sm:p-8 bg-gray-50 text-gray-800 raleway mt-5 md:mt-20">
        <h2 className="mb-3 text-3xl font-semibold text-center">
          Login to your account
        </h2>
        <p className="text-sm text-center dark:text-gray-600">
          Don't have account?{' '}
          <Link
            to="/sign-up"
            className="focus:underline hover:underline text-blue-600"
          >
            Sign up here
          </Link>
        </p>

        <div className=" w-full my-4">
          <hr className=" text-gray-300" />
        </div>

        <div className="my-6 space-y-4">
          <button
            onClick={handleGoogleSignUp}
            type="button"
            className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600"
          >
            <FcGoogle size={28} />
            <p>Login with Google</p>
          </button>
        </div>

        <div className="flex items-center w-full my-4">
          <hr className="w-full text-gray-600" />
          <p className="px-3 text-gray-600">OR</p>
          <hr className="w-full text-gray-600" />
        </div>

        <form onSubmit={handleSignIn} className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Your eMail"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <Link className="text-xs hover:underline text-gray-600">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                name="password"
                placeholder="******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-8 py-2 font-semibold rounded-md bg-[#D2B48C] text-[#331A15] rancho text-2xl cursor-pointer"
          >
            Sign in
          </button>
        </form>
      </div>
    </>
  );
};

export default SignIn;
