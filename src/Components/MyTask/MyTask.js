import { useQuery } from '@tanstack/react-query';

import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import TaskCard from './TaskCard';

const MyTask = () => {
    const { register, handleSubmit, reset } = useForm();

    const { data: tasks = [], refetch } = useQuery({
        queryKey: ['my-task'],
        queryFn: () => fetch('https://task-me-server.vercel.app/my-task')
            .then(res => res.json())
    })


    const handleTask = (taskData) => {
        console.log(taskData);
        fetch('https://task-me-server.vercel.app/my-task', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(taskData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true) {

                    toast.success('Task added successfully');
                    reset();
                    refetch();
                }
                console.log(data);
            })
    }
    return (
        <div>
            <form className='w-1/2 mx-auto flex justify-center mt-10' onSubmit={handleSubmit(handleTask)}>

                <div className=''>

                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your daily task" {...register("task", {
                        required: "text is Required"
                    })} />
                </div>

                <button type="submit" className="w-18 ml-1 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>


            <div className='grid my-8 gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 '>
                {
                    tasks.map(toDo =>

                        <TaskCard key={toDo._id} toDo={toDo}></TaskCard>

                    )}


            </div>
        </div>
    );
};

export default MyTask;