import { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import { cloudRoadmap } from '../data/roadmaps/cloud.js';
import { dataRoadmap } from '../data/roadmaps/data.js';
import { developmentRoadmap } from '../data/roadmaps/development.js';
import { toast, Toaster } from 'sonner';
import { IoMdSearch } from "react-icons/io";
import { MdOutlineArrowOutward } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function Roadmaps() {

    const [allRoadmaps, setAllRoadmaps] = useState([...cloudRoadmap, ...dataRoadmap, ...developmentRoadmap]);
    const [filteredRoadmap, setFilteredRoadmap] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('development');
    const [found, setFound] = useState([]);
    const [isFound, setIsFound] = useState(false);
    const [notFound, setNotFound] = useState(null);
    const navigate = useNavigate();

    const search = () => {
        if (!searchTerm) {
            toast.error("Please enter a keyword");
            return;
        }

        const safe = searchTerm.toLowerCase();

        const searchFound = allRoadmaps.filter((roadmap) => {
            return roadmap.title.toLowerCase().includes(safe);
        });

        if (searchFound.length === 1) {
            //console.log(searchFound);
            setFound(searchFound);
            setIsFound(true);
            setNotFound(false);
        }
        else {
            setFound([]);
            setIsFound(false);
            setNotFound(true);
        }
    }

    const openPage = (link) => {
        const safeTitle = encodeURIComponent(link.title);
        navigate(`/roadmaps/${safeTitle}`, { state: link });
    }

    return (
        <>
            <div className='w-full min-h-screen flex flex-col justify-start items-center px-5 pb-10'>
                <Navbar />
                <Toaster richColors position='top-center' />

                <h1 className={`text-center w-full mt-3 text-3xl font-bold duration-200 ease-in-out font-Titillium`}>Roadmaps</h1>

                <div className='w-full lg:w-[70%] h-auto gap-3 lg:gap-0 mt-5 flex flex-col lg:flex-row justify-center items-center'>
                    <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" className='w-full rounded-full lg:rounded-l-full lg:rounded-r-none outline-none bg-gray-200 pr-10 py-2 px-3' placeholder='Enter keyword : frontend, devops' />
                    <span onClick={search} className='w-full lg:w-[5%] cursor-pointer hover:opacity-70 ease-in-out duration-200 bg-blue-500 text-white h-full flex justify-center rounded-full lg:rounded-l-none gap-2 lg:rounded-r-full items-center py-3'> <span className='lg:hidden'>Search</span> <IoMdSearch /></span>
                </div>

                <div className='w-full sm:w-auto overflow-x-auto mt-5 h-auto rounded-full border-[1px] border-blue-400  py-2 px-3 flex justify-center items-start gap-3'>
                    <p onClick={() => { setCategory('development'); setSearchTerm(''); setIsFound(false); setNotFound(false); }} className={`w-auto ${category === 'development' ? "bg-blue-400 text-white" : "bg-white text-black"} text-[12px] lg:text-sm px-3 py-2 rounded-full cursor-pointer hover:bg-gray-100 duration-150 ease-in-out`}>Development</p>
                    <p onClick={() => { setCategory('data'); setSearchTerm(''); setIsFound(false); setNotFound(false); }} className={`w-auto ${category === 'data' ? "bg-blue-400 text-white" : "bg-white text-black"} text-[12px] lg:text-sm px-3 py-2 rounded-full cursor-pointer hover:bg-gray-100 duration-150 ease-in-out`}>Data & AI </p>
                    <p onClick={() => { setCategory('cloud'); setSearchTerm(''); setIsFound(false); setNotFound(false); }} className={`w-auto ${category === 'cloud' ? "bg-blue-400 text-white" : "bg-white text-black"} text-[12px] lg:text-sm px-3 py-2 rounded-full cursor-pointer hover:bg-gray-100 duration-150 ease-in-out`}>Cloud</p>
                </div>

                {category === 'development' && !isFound && <div className={`w-full py-3 ${isFound ? "hidden" : "block"} px-4 mt-4 rounded-md h-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-5`}>
                    {developmentRoadmap.map((roadmap, index) => {
                        return <div key={index} className='w-full cursor-pointer hover:shadow-2xl duration-150 ease-in-out rounded-md py-3 px-3 bg-gray-200 flex flex-col justify-center items-center'>
                            <h1 className='capitalize font-bold text-center text-sm md:text-lg'>{roadmap.title}</h1>
                            <p className='w-full text-center text-[12px]'>Category - {roadmap.category}</p>
                            <p onClick={() => openPage(roadmap)} className='w-full text-center text-[12px] flex justify-center items-center gap-2 bg-blue-500 text-white rounded-full cursor-pointer hover:opacity-70 duration-200 ease-in-out py-2 mt-2'>Check <MdOutlineArrowOutward /></p>
                        </div>
                    })}
                </div>}

                {category === 'data' && !isFound && <div className={`w-full py-3 ${isFound ? "hidden" : "block"} px-4 mt-4 rounded-md h-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-5`}>
                    {dataRoadmap.map((roadmap, index) => {
                        return <div key={index} className='w-full cursor-pointer hover:shadow-2xl duration-150 ease-in-out rounded-md py-3 px-3 bg-gray-200 flex flex-col justify-center items-center'>
                            <h1 className='capitalize font-bold text-center text-sm md:text-lg'>{roadmap.title}</h1>
                            <p className='w-full text-center text-[12px]'>Category - {roadmap.category}</p>
                            <p onClick={() => openPage(roadmap)} className='w-full text-center text-[12px] flex justify-center items-center gap-2 bg-blue-500 text-white rounded-full cursor-pointer hover:opacity-70 duration-200 ease-in-out py-2 mt-2'>Check <MdOutlineArrowOutward /></p>
                        </div>
                    })}
                </div>}

                {category === 'cloud' && !isFound && <div className={`w-full py-3 ${isFound ? "hidden" : "block"} px-4 mt-4 rounded-md h-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-5`}>
                    {cloudRoadmap.map((roadmap, index) => {
                        return <div key={index} className='w-full cursor-pointer hover:shadow-2xl duration-150 ease-in-out rounded-md py-3 px-3 bg-gray-200 flex flex-col justify-center items-center'>
                            <h1 className='capitalize font-bold text-center text-sm md:text-lg'>{roadmap.title}</h1>
                            <p className='w-full text-center text-[12px]'>Category - {roadmap.category}</p>
                            <p onClick={() => openPage(roadmap)} className='w-full text-center text-[12px] flex justify-center items-center gap-2 bg-blue-500 text-white rounded-full cursor-pointer hover:opacity-70 duration-200 ease-in-out py-2 mt-2'>Check <MdOutlineArrowOutward /></p>
                        </div>
                    })}
                </div>}

                {isFound && found.length > 0 && (
                    <div className='w-full py-3 px-4 mt-4 rounded-md h-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-5'>
                        {found.map((roadmap, index) => (
                            <div key={index} className='w-full cursor-pointer hover:shadow-2xl duration-150 ease-in-out rounded-md py-3 px-3 bg-gray-200 flex flex-col justify-center items-center'>
                                <h1 className='capitalize font-bold text-center text-sm md:text-lg'>{roadmap.title}</h1>
                                <p className='w-full text-center text-[12px]'>Category - {roadmap.category}</p>
                                <p onClick={() => openPage(roadmap)} className='w-full text-center text-[12px] flex justify-center items-center gap-2 bg-blue-500 text-white rounded-full cursor-pointer hover:opacity-70 duration-200 ease-in-out py-2 mt-2'>
                                    Check <MdOutlineArrowOutward />
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {notFound && (
                    <div className="text-center text-red-500 mt-5">
                        <p>No roadmap found for <span className='font-semibold'>"{searchTerm}"</span></p>
                    </div>
                )}
            </div>
        </>
    )
}

export default Roadmaps
