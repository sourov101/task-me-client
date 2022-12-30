import React from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';

const CompletedDetails = () => {
    const tasks = useLoaderData();
    console.log(tasks.task);
    const navigate = useNavigate();
    const { task, image } = tasks;

    const handelCompletedTaskDelete = id => {
        fetch(`https://task-me-server.vercel.app/completed/${id}`, {
            method: 'DELETE',

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    toast.success('Delete confirmed')
                    navigate('/completedtask')
                }
            })
    }


    return (
        <div>

            <div className="mx-auto mt-20 max-w-lg bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">


                <img className="mx-auto mt-4 rounded-t-lg" src={image} alt="" />


                <div className="p-5">

                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{task}</h5>

                    <div className='flex '>

                        <button onClick={() => handelCompletedTaskDelete(tasks._id)} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>

                        <Link to='/'><button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Not Completed</button></Link>
                        <Link to={`/comment/${tasks._id}`}>
                            <button type="button" className="inline-block px-6 py-2 border-2 border-gray-800 text-gray-800 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Add A Comment</button>
                        </Link>
                    </div>

                </div>
            </div>



        </div >
    );
};

export default CompletedDetails;