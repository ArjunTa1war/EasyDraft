import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import suprsend from "@suprsend/web-sdk";

export default function Navbar(props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  let navigate = useNavigate();
    const handlelogout = ()=>{
      localStorage.removeItem('token');
      props.showAlert("Succesfully Logged Out","success");
      suprsend.reset();
      navigate("/login");
    }

  return (
    <nav className="bg-white dark:bg-gray-900 fixed top-0 left-0 w-full z-20 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <img
            src="https://www.svgrepo.com/show/255810/doc.svg"
            className="h-8 mr-3"
            alt="EasyDraft"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            EasyDraft
          </span>
          <h5 className='text-white mx-3'>(doodledocs)</h5>
        </Link>
        <div className="flex md:order-2">


  {!localStorage.getItem('token') && (
      <Link to="/signup">
        <button
          type="button"
          className="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register
        </button>
      </Link>
    )}

{!localStorage.getItem('token') && (
  <Link to="/login">
    <button
      type="button"
      className="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Sign In
    </button>
  </Link>
)}

{localStorage.getItem('token') && (
  <Link to="/userpreference">
    <button
      type="button"
      className="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Settings
    </button>
  </Link>
)}

{localStorage.getItem('token') && (
  <Link to="/login">
    <button
      onClick={handlelogout}
      type="button"
      className="mx-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
    >
      Sign Out
    </button>
  </Link>
)}
          <button
            onClick={toggleDropdown}
            type="button"
            className="md:hidden text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <span className="sr-only">Toggle menu</span>
            <svg
              className={`w-5 h-5 ${isDropdownOpen ? 'transform rotate-180' : ''}`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
         
        </div>
        <div
          className={`${
            isDropdownOpen ? 'block' : 'hidden'
          } md:flex md:w-auto md:order-1 md:items-center md:space-x-8 w-full`}
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
              <Link
                to="/"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover-bg-gray-700 dark:hover:text-white md:dark:hover-bg-transparent dark:border-gray-700"
                aria-current="page"
               >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/showalldocs"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover-bg-gray-700 dark:hover:text-white md:dark:hover-bg-transparent dark:border-gray-700"
              >
                All Docs
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

