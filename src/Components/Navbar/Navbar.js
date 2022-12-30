import { Navbar } from 'flowbite-react';

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';


const Header = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err));
    }

    return (
        <div>

            <Navbar
                className='
             text-gray-500'
                fluid={true}
                rounded={true}
            >
                <Navbar.Brand>

                    <span className="self-center whitespace-nowrap text-xl font-semibold ">
                        Task <span className='text-blue-600'>ME</span>
                    </span>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <div>
                        <Link className='mr-3' to='/'>
                            Home
                        </Link>
                        <Link className='mr-3' to='addtask'>
                            Add Task
                        </Link>
                        <Link className='mr-3' to='completedtask'>
                            Completed Task
                        </Link>

                        {
                            user?.uid ?
                                <>

                                    <button onClick={handleLogOut} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Sign Out</button>
                                </>
                                :
                                <>
                                    <Link className='mr-3' to='login'>
                                        Login
                                    </Link>
                                    <Link className='mr-3' to='signup'>
                                        Signup
                                    </Link>
                                </>
                        }
                    </div>
                </Navbar.Collapse>
            </Navbar>

        </div>
    );
};

export default Header;