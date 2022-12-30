import React from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';

const TaskDetails = () => {
    const tasks = useLoaderData();
    console.log(tasks);
    const navigate = useNavigate();
    const { task, image } = tasks;

    const handelDelete = id => {
        fetch(`https://task-me-server.vercel.app/my-task/${id}`, {
            method: 'DELETE',

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    toast.success('Delete confirmed')
                    navigate('/')
                }
            })
    }

    const handleCompletedTask = (id) => {
        console.log(id);
        const toDos = { task, image: tasks.image };
        fetch('https://task-me-server.vercel.app/completed', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(toDos)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true) {

                    toast.success('Task added successfully');
                    navigate('/completedtask')
                }
                console.log(data);
            })
    }

    return (

        <div className=''>
            <div className="mx-auto mt-20 max-w-lg bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">

                <img className="mx-auto mt-4 rounded-t-lg" src={image} alt="" />

                <div className="p-5">

                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{task}</h5>

                    <div className='flex '>
                        <Link to={`/update/${tasks._id}`}>
                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                        </Link>




                        <button onClick={() => handelDelete(tasks._id)} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                        <button onClick={() => handleCompletedTask(tasks._id)} type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Completed</button>
                    </div>

                </div>
            </div>


        </div>



    );
};

export default TaskDetails;