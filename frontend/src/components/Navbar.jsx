import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import { CiMenuFries } from "react-icons/ci";

function Navbar() {

    const [visible, setVisible] = useState(false);

    return (
        <>
            <h1 className="w-full text-center py-5 text-lg tracking-wider">QUANTICA</h1>

            <div className={`w-full md:hidden z-30 ${visible ? "top-0" : "-translate-y-full"} border-b-4 border-blue-500 duration-300 ease-in-out h-auto py-3 px-4 absolute flex flex-col justify-start items-start gap-3 backdrop-blur-3xl bg-white/10 pb-10 rounded-b-lg`}>
                <Link to='/dashboard' className="w-full py-3 border-b-[1px] border-black cursor-pointer group flex justify-start items-center gap-2 duration-200 ease-in-out">Dashboard <span className="group-hover:opacity-100 opacity-0 duration-200 ease-in-out "><IoIosArrowForward /></span></Link>
                <Link to='/roadmaps' className="w-full py-3 border-b-[1px] border-black cursor-pointer group flex justify-start items-center gap-2 duration-200 ease-in-out">Roadmaps <span className="group-hover:opacity-100 opacity-0 duration-200 ease-in-out "><IoIosArrowForward /></span></Link>
                <Link to='/visualizer' className="w-full py-3 border-b-[1px] border-black cursor-pointer group flex justify-start items-center gap-2 duration-200 ease-in-out">DSA Visualizer <span className="group-hover:opacity-100 opacity-0 duration-200 ease-in-out "><IoIosArrowForward /></span></Link>
                <Link to='/playground' className="w-full py-3 border-b-[1px] border-black cursor-pointer group flex justify-start items-center gap-2 duration-200 ease-in-out">Web Playground <span className="group-hover:opacity-100 opacity-0 duration-200 ease-in-out "><IoIosArrowForward /></span></Link>
                <Link to='/ai-studio' className="w-full py-3 border-b-[1px] border-black cursor-pointer group flex justify-start items-center gap-2 duration-200 ease-in-out">AI Studio <span className="group-hover:opacity-100 opacity-0 duration-200 ease-in-out "><IoIosArrowForward /></span></Link>
                <Link to='/quiz' className="w-full py-3 border-b-[1px] border-black cursor-pointer group flex justify-start items-center gap-2 duration-200 ease-in-out">Quiz <span className="group-hover:opacity-100 opacity-0 duration-200 ease-in-out "><IoIosArrowForward /></span></Link>
                <Link to='/settings' className="w-full py-3 cursor-pointer group flex justify-start items-center gap-2 duration-200 ease-in-out">Settings <span className="group-hover:opacity-100 opacity-0 duration-200 ease-in-out "><IoIosArrowForward /></span></Link>
                <p onClick={() => setVisible(!visible)} className="w-full rounded-full py-2 bg-transparent text-black border-[1px] border-black text-center cursor-pointer">Close X</p>
            </div>

            <span className="w-auto z-20 md:hidden p-3 text-black cursor-pointer rounded-full font-bold text-xl absolute top-5 right-5" onClick={() => setVisible(!visible)} ><CiMenuFries /></span>

            <div className="hidden py-2 px-3 justify-center items-start md:flex w-full rounded-md lg:rounded-lg border-b-2 border-blue-500 gap-5">
                <Link to='/dashboard' className="text-black text-sm px-3 py-2 rounded-md hover:bg-gray-100 duration-150 ease-in-out cursor-pointer">Dashboard</Link>
                <Link to='/roadmaps' className="text-black text-sm px-3 py-2 rounded-md hover:bg-gray-100 duration-150 ease-in-out cursor-pointer">Roadmaps</Link>
                <Link to='/visualizer' className="text-black text-sm px-3 py-2 rounded-md hover:bg-gray-100 duration-150 ease-in-out cursor-pointer">DSA Visualizer</Link>
                <Link to='/playground' className="text-black text-sm px-3 py-2 rounded-md hover:bg-gray-100 duration-150 ease-in-out cursor-pointer">Web Playground</Link>
                <Link to='/ai-studio' className="text-black text-sm px-3 py-2 rounded-md hover:bg-gray-100 duration-150 ease-in-out cursor-pointer">AI Studio</Link>
                <Link to='/quiz' className="text-black text-sm px-3 py-2 rounded-md hover:bg-gray-100 duration-150 ease-in-out cursor-pointer">Quiz</Link>
                <Link to='/settings' className="text-black text-sm px-3 py-2 rounded-md hover:bg-gray-100 duration-150 ease-in-out cursor-pointer">Settings</Link>
            </div>
        </>
    )
}

export default Navbar
