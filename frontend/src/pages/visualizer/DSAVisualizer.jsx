import React, { useState } from 'react';
import Navbar from '../../components/Navbar.jsx';
import { useNavigate } from 'react-router-dom';

function DSAVisualizer() {

    const navigate = useNavigate();

    const openPage = (link) => {
        navigate(link);
    }

    return (
        <>
            <div className='w-full px-5 min-h-screen flex flex-col justify-start items-center pb-10'>

                <Navbar/>

                <h1 className={`text-center w-full mt-5 text-3xl font-bold duration-200 ease-in-out font-Titillium`}>Visualize Concepts</h1>
                <p className={` duration-200 ease-in-out text-sm mt-2 text-center w-full`}>A visual representation of some of the famous data structures and algorithms</p>

                <hr className='w-full h-[1px] my-5 bg-zinc-600' />

                {/* Algorithms section */}
                <h1 className={`text-start lg:text-center w-full text-2xl font-bold duration-200 ease-in-out font-Titillium`}>Algorithms</h1>

                <div className={`w-full rounded-md h-auto py-4 px-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-3 sm:gap-8`}>
                    <div className={`w-full bg-gray-200 cursor-pointer hover:shadow-md hover:-translate-y-4 rounded-md h-44  px-5 py-3 duration-200 ease-in-out flex flex-col justify-evenly items-center gap-3`} onClick={() => openPage('/visualizer/searching')}>
                        <h3 className={`text-center w-full text-xl sm:text-2xl font-semibold duration-200 ease-in-out font-Titillium`}>Searching Algorithms</h3>
                        <p className={`w-full text-center  opacity-55 duration-200 ease-in-out text-sm`}>(Binary Search, Linear Search)</p>
                    </div>
                    <div className={`w-full bg-gray-200 cursor-pointer hover:shadow-md hover:-translate-y-4 rounded-md h-44  px-5 py-3 duration-200 ease-in-out flex flex-col justify-evenly items-center gap-3`} onClick={() => openPage('/visualizer/sorting')}>
                        <h3 className={`text-center w-full  text-xl sm:text-2xl font-semibold duration-200 ease-in-out font-Titillium`}>Sorting Algorithms</h3>
                        <p className={`w-full text-center  opacity-55 duration-200 ease-in-out text-sm`}>(Bubble Sort, Insertion Sort, Selection Sort)</p>
                    </div>
                </div>

                {/* data structures section */}
                <h1 className={`text-start lg:text-center w-full text-2xl font-bold duration-200 ease-in-out font-Titillium`}>Data Structures</h1>


                <div className={`w-full rounded-md h-auto py-4 px-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-3 sm:gap-8`}>
                    <div className={`w-full bg-gray-200  cursor-pointer hover:shadow-md hover:-translate-y-4 rounded-md h-44  px-5 py-3 duration-200 ease-in-out flex flex-col justify-evenly items-center gap-3`} onClick={() => openPage('/visualizer/stack')}>
                        <h3 className={`text-center w-full  text-xl sm:text-2xl font-semibold duration-200 ease-in-out font-Titillium`}>Stack</h3>
                        <p className={`w-full text-center  opacity-55 duration-200 ease-in-out text-sm`}>Stack operations with array</p>
                    </div>
                    <div className={`w-full bg-gray-200  cursor-pointer hover:shadow-md hover:-translate-y-4 rounded-md h-44  px-5 py-3 duration-200 ease-in-out flex flex-col justify-evenly items-center gap-3`} onClick={() => openPage('/visualizer/linked-list')}>
                        <h3 className={`text-center w-full  text-xl sm:text-2xl font-semibold duration-200 ease-in-out font-Titillium`}>Linked List</h3>
                        <p className={`w-full text-center  opacity-55 duration-200 ease-in-out text-sm`}>LinkedList operations with practical implementations</p>
                    </div>
                    <div className={`w-full bg-gray-200  cursor-pointer hover:shadow-md hover:-translate-y-4 rounded-md h-44  px-5 py-3 duration-200 ease-in-out flex flex-col justify-evenly items-center gap-3`} onClick={() => openPage('/visualizer/queue')}>
                        <h3 className={`text-center w-full  text-xl sm:text-2xl font-semibold duration-200 ease-in-out font-Titillium`}>Queue</h3>
                        <p className={`w-full text-center  opacity-55 duration-200 ease-in-out text-sm`}>Queue operations with practical implementations</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DSAVisualizer;