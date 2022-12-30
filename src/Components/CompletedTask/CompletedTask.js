import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';

const CompletedTask = () => {
    const url = 'https://task-me-server.vercel.app/completed';

    const { data: tasks = [] } = useQuery({
        queryKey: ['completed'],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            return data;
        }
    })

    return (
        <div>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="border-b">
                                    <tr>
                                        <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
                                            #
                                        </th>
                                        <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
                                            Task
                                        </th>
                                        <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
                                            Details
                                        </th>
                                        <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
                                            Comment
                                        </th>


                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tasks.map((toDo, i) =>
                                            <tr key={toDo._id} className="border-b">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">{i + 1}</td>
                                                <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                                                    {toDo.task}
                                                </td>

                                                <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">

                                                    <Link to={`/completed/${toDo._id}`}><button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Details</button></Link>
                                                </td>
                                                <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                                                    {toDo?.comments?.comment}
                                                </td>
                                            </tr>


                                        )
                                    }


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompletedTask;