import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const AddTask = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const YOUR_CLIENT_API_KEY = 'e53b6a00885f6b502b1b67957cac6748';

    const { register, handleSubmit } = useForm();

    const handleTask = (taskData) => {
        console.log(taskData.image[0]);

        const image = taskData.image[0];
        const formData = new FormData();
        formData.append('image', image);

        const url = `https://api.imgbb.com/1/upload?key=${YOUR_CLIENT_API_KEY}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                console.log(imgData)

                if (imgData.success) {
                    const tasks = {

                        task: taskData.task,
                        image: imgData.data.url

                    }

                    fetch('https://task-me-server.vercel.app/my-task', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(tasks)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged === true) {

                                toast.success('Task added successfully');
                                navigate('/')
                            }
                            console.log(data);
                        })
                }
            }
            )
    }

    return (
        <div className='mx-auto'>
            <section className="">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Add Your Task
                            </h1>
                            <form onSubmit={handleSubmit(handleTask)} className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                    <input type="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name" defaultValue={user?.displayName} readOnly {...register("name", {
                                        required: "Name is Required"
                                    })} />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={user?.email} readOnly {...register('email', {
                                        required: "email is Required",

                                    }

                                    )} />
                                </div>
                                <div>
                                    <label htmlFor="task" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Task</label>
                                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register('task', {
                                        required: "task is Required",

                                    }

                                    )} />
                                </div>
                                <div>


                                    <label htmlFor="photo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload photo</label>

                                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" {...register("image", {

                                    })} />


                                </div>


                                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AddTask;